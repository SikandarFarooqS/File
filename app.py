from flask import Flask, request, jsonify
import torch
from transformers import GPT2Tokenizer, GPT2ForSequenceClassification
import PyPDF2
import io
import requests
from bs4 import BeautifulSoup
from newspaper import Article
import re
from urllib.parse import urlparse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model = GPT2ForSequenceClassification.from_pretrained('saved_model')
tokenizer = GPT2Tokenizer.from_pretrained('saved_model')
model.config.pad_token_id = tokenizer.pad_token_id

# Function to validate URL
def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

# Function to scrape news article from URL
def scrape_article_from_url(url):
    try:
        # Method 1: Using newspaper3k (more reliable for news articles)
        article = Article(url)
        article.download()
        article.parse()
        
        if article.text and len(article.text.strip()) > 100:
            return {
                'text': article.text.strip(),
                'title': article.title,
                'method': 'newspaper3k'
            }
        
        # Method 2: Fallback to BeautifulSoup + requests
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Try to find article content using common selectors
        content_selectors = [
            'article',
            '.article-content',
            '.post-content',
            '.entry-content',
            '.content',
            '.story-body',
            '.article-body',
            '[class*="article"]',
            '[class*="content"]'
        ]
        
        article_text = ""
        title = ""
        
        # Get title
        title_tag = soup.find('title')
        if title_tag:
            title = title_tag.get_text().strip()
        
        # Try to extract article content
        for selector in content_selectors:
            content = soup.select_one(selector)
            if content:
                # Get text and clean it
                text = content.get_text(separator=' ', strip=True)
                if len(text) > 100:  # Minimum length check
                    article_text = text
                    break
        
        # If no specific content found, try getting text from paragraphs
        if not article_text:
            paragraphs = soup.find_all('p')
            article_text = ' '.join([p.get_text().strip() for p in paragraphs if len(p.get_text().strip()) > 20])
        
        if not article_text or len(article_text.strip()) < 100:
            raise Exception("Could not extract sufficient article content from the webpage")
        
        return {
            'text': article_text.strip(),
            'title': title,
            'method': 'beautifulsoup'
        }
        
    except Exception as e:
        raise Exception(f"Error scraping article from URL: {str(e)}")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

# Function to make prediction
def predict_news(news_text):
    inputs = tokenizer(news_text, truncation=True, padding="max_length", max_length=512, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        prediction = torch.argmax(logits, dim=1).item()
    return "Real" if prediction == 1 else "Fake"

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Fake News Detection API is running"})

@app.route('/predict', methods=['POST'])
def predict():
    """Predict if news is fake or real from text, PDF, or URL (all via multipart/form-data)"""
    try:
        article_title = ""
        source_type = ""
        news_text = ""
        
        # Check for PDF file upload
        if 'pdf_file' in request.files and request.files['pdf_file'].filename != '':
            pdf_file = request.files['pdf_file']
            
            if not pdf_file.filename.lower().endswith('.pdf'):
                return jsonify({"error": "Only PDF files are allowed"}), 400
            
            # Extract text from PDF
            pdf_content = io.BytesIO(pdf_file.read())
            news_text = extract_text_from_pdf(pdf_content)
            source_type = "PDF"
            
            if not news_text.strip():
                return jsonify({"error": "No text could be extracted from the PDF"}), 400
        
        # Check for URL input
        elif 'url' in request.form and request.form['url'].strip():
            url = request.form['url'].strip()
            
            if not is_valid_url(url):
                return jsonify({"error": "Invalid URL format"}), 400
            
            # Scrape article from URL
            article_data = scrape_article_from_url(url)
            news_text = article_data['text']
            article_title = article_data['title']
            source_type = f"URL ({article_data['method']})"
        
        # Check for direct text input
        elif 'news_text' in request.form and request.form['news_text'].strip():
            news_text = request.form['news_text'].strip()
            source_type = "Text"
        
        # No valid input found
        else:
            return jsonify({
                "error": "No valid input provided. Please provide either 'pdf_file', 'url', or 'news_text'"
            }), 400
        
        if not news_text.strip():
            return jsonify({"error": "No text content available for prediction"}), 400
        
        # Make prediction
        prediction = predict_news(news_text)
        
        # Return result with enhanced information
        text_preview = news_text[:200] + "..." if len(news_text) > 200 else news_text
        
        response_data = {
            "prediction": prediction,
            "confidence": "high",
            "message": f"This news is likely {prediction}.",
            "text_preview": text_preview,
            "text_length": len(news_text),
            "source_type": source_type
        }
        
        # Add title if available
        if article_title:
            response_data["article_title"] = article_title
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/', methods=['GET'])
def home():
    """Home endpoint with API information"""
    return jsonify({
        "message": "Fake News Detection API",
        "endpoints": {
            "GET /": "API information",
            "GET /health": "Health check",
            "POST /predict": "Predict if news is fake or real from text, PDF, or URL (multipart/form-data)"
        },
        "usage": {
            "single_endpoint": "/predict",
            "method": "POST",
            "content_type": "multipart/form-data",
            "input_options": {
                "text_input": "news_text: 'Your news article text here'",
                "url_input": "url: 'https://example.com/news-article'",
                "pdf_input": "pdf_file: <your_pdf_file>"
            },
            "note": "Send only one input type per request"
        },
        "examples": {
            "curl_text": "curl -X POST http://localhost:5000/predict -F 'news_text=Your article text here'",
            "curl_url": "curl -X POST http://localhost:5000/predict -F 'url=https://example.com/article'",
            "curl_pdf": "curl -X POST http://localhost:5000/predict -F 'pdf_file=@article.pdf'"
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)