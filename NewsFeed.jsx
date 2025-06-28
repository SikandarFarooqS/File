

// export default NewsFeed;
import React, { useState, useEffect, useCallback } from "react";
import { X, MessageSquare, Send, Loader2, Shield, AlertTriangle, CheckCircle } from "lucide-react";

// FeedbackDialog Component
const FeedbackDialog = ({ article, onClose, onSubmit }) => {
  const [newFeedback, setNewFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(newFeedback.trim());
      setNewFeedback("");
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      style={{ paddingTop: '80px', paddingBottom: '40px' }}
    >
      <div className="relative w-full max-w-4xl max-h-full bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden animate-scale-in my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Article Feedback</h3>
              <p className="text-gray-400">Share your thoughts with the community</p>
            </div>
          </div>
          <button 
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
        
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {/* Article Info */}
          <div className="p-6 bg-slate-800/20 border-b border-purple-500/10">
            <h4 className="text-xl font-semibold text-white mb-2 line-clamp-2">{article.title}</h4>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{article.source?.name}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h4 className="text-xl font-semibold text-white">Community Feedback</h4>
            </div>
            
            {article.feedbacks?.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/20 rounded-xl border border-purple-500/10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h5 className="text-lg font-semibold text-white mb-2">No feedback yet</h5>
                <p className="text-gray-400">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {article.feedbacks?.map((feedback, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-purple-500/10 hover:border-purple-500/20 transition-all animate-fade-in"
                  >
                    <div className="text-gray-300 leading-relaxed">
                      {feedback}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback Form */}
          <div className="p-6 bg-slate-800/20 border-t border-purple-500/10 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h4 className="text-xl font-semibold text-white">Add Your Feedback</h4>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Share your thoughts about this article..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {newFeedback.length}/500
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-fade-in">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  onClick={handleSubmitFeedback}
                  disabled={isSubmitting || !newFeedback.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// NewsCard Component
const NewsCard = ({ article, onVerify, onFeedbackClick }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleVerify = async (e) => {
    e.stopPropagation();
    setIsVerifying(true);
    await onVerify(article);
    console.log(article.predictionLabel)
    setIsVerifying(false);
  };

  const renderPrediction = () => {
    if (isVerifying) {
      return (
        <div className="flex items-center text-purple-400">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Verifying...
        </div>
      );
    }
    
    if (article.predictionLabel === "Fake") {
      return <span className="text-red-400 font-bold">❌ FAKE: {article.predictionScore}</span>;
    } else if (article.predictionLabel === "Real") {
      return <span className="text-green-400 font-bold">✅ REAL: {article.predictionScore}</span>;
    }
    return <span className="text-gray-400 font-bold">⌛ Click Verify</span>;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg">
      <div 
        className="cursor-pointer"
        onClick={() => window.open(article.url, "_blank")}
      >
        <div className="h-48 overflow-hidden">
          <img 
            src={article.urlToImage || "https://via.placeholder.com/400x200"} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Shield className="h-5 w-5 text-purple-400" />
            <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
              {article.source?.name}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{article.description}</p>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <div className="text-sm font-medium">
              {renderPrediction()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5 flex gap-3">
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
            article.predictionLabel 
              ? "bg-blue-600/50 hover:bg-blue-600/70" 
              : "bg-purple-600 hover:bg-purple-700"
          } ${isVerifying ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {article.predictionLabel ? "Re-verify" : "Verify"}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFeedbackClick(article);
          }}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all"
        >
          <MessageSquare className="h-4 w-4" />
          {article.feedbacks?.length > 0 && <span>{article.feedbacks.length}</span>}
        </button>
      </div>
    </div>
  );
};

// NewsFeed Component
const NewsFeed = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackArticle, setFeedbackArticle] = useState(null);
  
  // Configuration for your ML API
  const ML_API_CONFIG = {
    baseUrl: 'https://your-ml-api-endpoint.com', // Replace with your actual API endpoint
    endpoints: {
      verify: '/verify-news', // Replace with your actual endpoint path
    },
    timeout: 30000, // 30 seconds timeout
  };

  // const fetchNews = async () => {
  //   try {
  //     setIsLoading(true);
  //     const apiKey = "d4ba20643af349ed86ea2491f1b23b19";
  //     // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  //     const url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&apiKey=${apiKey}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
      
  //     const initializedArticles = (data.articles || []).map(article => ({
  //       ...article,
  //       predictionLabel: null,
  //       predictionScore: null,
  //       feedbacks: [],
  //       isUsingMockData: false
  //     }));
      
  //     setArticles(initializedArticles);
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const fetchNews = useCallback(async () => {
  try {
    setIsLoading(true);
    const apiKey = "d4ba20643af349ed86ea2491f1b23b19";

    let url = "";
    if (category.startsWith("search:")) {
      const keyword = category.replace("search:", "").trim();
      url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
    } else {
      url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&apiKey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const initializedArticles = (data.articles || []).map(article => ({
      ...article,
      predictionLabel: null,
      predictionScore: null,
      feedbacks: [],
      isUsingMockData: false
    }));

    setArticles(initializedArticles);
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    setIsLoading(false);
  }
}, [category]); // depends on category



  // Function to generate mock data as fallback
  const generateMockResponse = () => {
    return {
      label: Math.random() > 0.5 ? "REAL" : "FAKE",
      score: Math.floor(Math.random() * 40) + 60,
      probability: Math.random(),
      isUsingMockData: true
    };
  };

  // Function to call your ML API
  const callMLAPI = async (article) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ML_API_CONFIG.timeout);
    const formData = new FormData()

      if (article.url.trim()) {
      formData.append("url", article.url.trim())
       } 
       
    try {    

       const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    })

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      // Adjust this based on your API response format
      return {
        label: data.prediction , // Expected: "REAL" or "FAKE"
        score:  data.confidence, // Convert to percentage
        probability: data.confidence,
        isUsingMockData: false,
        apiResponse: data // Store full response for debugging
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.warn('ML API request timed out, falling back to mock data');
      } else {
        console.error('ML API request failed:', error);
      }
      
      // Return mock data as fallback
      return generateMockResponse();
    }
  };

  const handleVerify = async (article) => {
    try {
      console.log('Starting verification for article:', article.title);
      
      // First, try to call your ML API
      const result = await callMLAPI(article);
      console.log(result)
      // Update the article with the result
      setArticles(prev => prev.map(a => 
  a.url === article.url 
    ? (() => {
        const updatedArticle = {
          ...a,
          predictionLabel: result.label,
          predictionScore: result.score,
          probability: result.probability,
          isUsingMockData: result.isUsingMockData,
          lastVerified: new Date().toISOString(),
          apiResponse: result.apiResponse
        };
        console.log("Updated Article:", updatedArticle);
        return updatedArticle;
      })()
    : a
));

      // Log whether we used real API or mock data
      if (result.isUsingMockData) {
        console.warn('Used mock data for verification due to API failure');
      } else {
        console.log('Successfully verified using ML API');
      }
      
    } catch (error) {
      console.error("Verification failed completely:", error);
      
      // Show user-friendly error message
      alert("Verification failed. Please check your internet connection and try again.");
      
      // Optionally, still provide mock data
      const mockResult = generateMockResponse();
      setArticles(prev => prev.map(a => 
        a.url === article.url 
          ? { 
              ...a, 
              predictionLabel: mockResult.label,
              predictionScore: mockResult.score,
              isUsingMockData: true,
              lastVerified: new Date().toISOString(),
              error: "API unavailable - showing demo data"
            } 
          : a
      ));
    }
  };

  const handleAddFeedback = (feedback) => {
    if (!feedbackArticle) return;
    
    setArticles(prev => prev.map(article => 
      article.url === feedbackArticle.url
        ? { 
            ...article, 
            feedbacks: [...(article.feedbacks || []), feedback] 
          }
        : article
    ));
  };

  // useEffect(() => {
  //   fetchNews();
  // }, [category]); // this MUST include 'category'
  useEffect(() => {
    console.log("Category changed:", category);
    fetchNews();
  }, [category, fetchNews]); // use fetchNews to avoid re-creating the function


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            Latest News
            <br />
            <span className="text-purple-300">Verification</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay informed with AI-powered news verification. Get real-time authenticity analysis for every story.
          </p>
          
          {/* Category Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-full border border-purple-500/20">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-purple-300 font-semibold capitalize">{category} News</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-purple-500/20">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-xl text-gray-300 font-semibold">Loading news...</p>
              <p className="text-gray-400 mt-2">Fetching the latest stories for you</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-purple-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">📰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">No Articles Found</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                No articles found for the <span className="text-purple-300 font-semibold capitalize">{category}</span> category at the moment.
              </p>
              <button 
                onClick={fetchNews}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                Refresh News
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Articles Count */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-slate-800/30 backdrop-blur-sm rounded-full border border-purple-500/10">
                <span className="text-purple-400 font-semibold">{articles.length}</span>
                <span className="text-gray-300 ml-2">articles found</span>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              {articles.map((article, idx) => (
                <div 
                  key={idx}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <NewsCard 
                    article={article} 
                    onVerify={handleVerify}
                    onFeedbackClick={setFeedbackArticle}
                  />
                  {/* Debug info - remove in production */}
                  {article.isUsingMockData && (
                    <div className="mt-2 text-xs text-yellow-400 text-center">
                     ⚠️ Demo data (API unavailable)
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More Section */}
            <div className="text-center py-12">
              <button 
                onClick={fetchNews}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 border border-purple-500/20 hover:border-purple-500/40 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
              >
                <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                Refresh News Feed
              </button>
            </div>
          </>
        )}
      </div>

      {/* Centralized Feedback Dialog */}
      {feedbackArticle && (
        <FeedbackDialog
          article={feedbackArticle}
          onClose={() => setFeedbackArticle(null)}
          onSubmit={handleAddFeedback}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewsFeed;