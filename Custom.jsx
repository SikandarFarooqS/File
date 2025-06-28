"use client"

import { useState } from "react"
import "./Custom.css"
import { ChevronRight } from "lucide-react"

export default function CustomNewsDetector() {
  const [activeTab, setActiveTab] = useState("text")
  const [newsText, setNewsText] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
    }
  }

 const handleAnalyze = async () => {
  if (!canAnalyze) return

  setIsAnalyzing(true)
  setAnalysisResult(null)

  const formData = new FormData()

  if (newsText.trim()) {
    formData.append("url", newsText.trim())
  } else if (uploadedFile) {
    formData.append("pdf_file", uploadedFile)
  }

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Unknown error")
    }

    const result = await response.json()
    setAnalysisResult({
      credibility: result.prediction === "Real", 
      status: result.prediction.toLowerCase(),
      analysis: result.message,
      factors: [
        `Source: ${result.source_type}`,
        `Text Length: ${result.text_length}`,
        `Text preview: ${result.text_preview}`,
        "Language & Sentiment Evaluation",
        "AI Classification Decision",
      ],
    })
  } catch (error) {
    alert("Error during analysis: " + error.message)
  } finally {
    setIsAnalyzing(false)
  }
}


  const canAnalyze = newsText.trim().length > 0 || uploadedFile !== null

  const resetForm = () => {
    setAnalysisResult(null)
    setNewsText("")
    setUploadedFile(null)
    setActiveTab("text")
  }

  return (
    <div className="custom-news-container">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">
            Custom News
            <br />
            <span className="text-purple-300">Verification</span>
          </h1>
          <p className="subtitle">
            Upload your own news content url to get instant AI-powered authenticity analysis and credibility scoring.
          </p>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="card">
            <div className="card-content">
              {/* Tabs */}
              <div className="tabs">
                <div className="tabs-list">
                  <button
                    className={`tab-trigger ${activeTab === "text" ? "active" : ""}`}
                    onClick={() => setActiveTab("text")}
                  >
                    <span className="tab-icon">📝</span>
                    Text Input
                  </button>
                  <button
                    className={`tab-trigger ${activeTab === "upload" ? "active" : ""}`}
                    onClick={() => setActiveTab("upload")}
                  >
                    <span className="tab-icon">📄</span>
                    PDF Upload
                  </button>
                </div>

                {/* Text Input Tab */}
                {activeTab === "text" && (
                  <div className="tab-content">
                    <div className="input-section">
                      <label className="input-label">Paste your news URL:</label>
                      <textarea
                        placeholder="Enter the news article URL you want to verify..."
                        value={newsText}
                        onChange={(e) => setNewsText(e.target.value)}
                        className="textarea"
                        rows="8"
                      />
                      <div className="character-count">{newsText.length} characters</div>
                    </div>
                  </div>
                )}

                {/* Upload Tab */}
                {activeTab === "upload" && (
                  <div className="tab-content">
                    <div className="input-section">
                      <label className="input-label">Upload a PDF document:</label>
                      <div className="upload-area">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="file-input"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="upload-label">
                          {uploadedFile ? (
                            <div className="file-info">
                              <span className="file-icon">📄</span>
                              <div>
                                <div className="file-name">{uploadedFile.name}</div>
                                <div className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                              </div>
                            </div>
                          ) : (
                            <div className="upload-placeholder">
                              <span className="upload-icon">📤</span>
                              <div className="upload-text">Click to upload PDF</div>
                              <div className="upload-subtext">Drag and drop your PDF file here, or click to browse</div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <div className="analyze-section">
                <button onClick={handleAnalyze} disabled={!canAnalyze || isAnalyzing} className="analyze-btn">
                  {isAnalyzing ? (
                    <>
                      <div className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Content
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="results-card">
              <div className="card-content">
                <div className="results-header">
                  <h3 className="results-title">Analysis Results</h3>
                </div>

                <div className="results-grid">
                  {/* Credibility Score */}
                  {/* <div className="score-section">
                    <div className="score-container">
                      <div
                        className={`credibility-score ${
                          analysisResult.credibility >= 70
                            ? "high"
                            : analysisResult.credibility >= 40
                              ? "medium"
                              : "low"
                        }`}
                      >
                        {analysisResult.credibility}%
                      </div>
                      <div className="score-label">Credibility Score</div>
                    </div>
                  </div> */}

                  {/* Status */}
                  <div className="status-section">
                    <div className="status-container">
                      <div className={`status-indicator ${analysisResult.status === "real" ? "real" : "fake"}`}>
                        <span className="status-icon">{analysisResult.status === "real" ? "✅" : "❌"}</span>
                        {analysisResult.status === "real" ? "Likely Real" : "Likely Fake"}
                      </div>
                      <div className="status-label">Classification</div>
                    </div>
                  </div>
                </div>

                {/* Analysis Details */}
                <div className="analysis-details">
                  <h4 className="details-title">Detailed Analysis:</h4>
                  <p className="details-text">{analysisResult.analysis}</p>
                   <p className="details-text">{analysisResult.text_preview}</p>
                  <h4 className="details-title mt-4">Analysis Factors:</h4>
                  <ul className="factors-list">
                    {analysisResult.factors.map((factor, index) => (
                      <li key={index} className="factor-item">
                        <div className="factor-bullet"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="secondary-btn" onClick={resetForm}>
                    Analyze Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
