

import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Zap, Globe, Users, ChevronRight, Menu, X } from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setNewsUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 const handleAnalysis =async () => {
 
    const formData = new FormData()

  if (url.trim()) {
    formData.append("url", url.trim())
  }     
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    
   try{
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Unknown error")
    }

    const result = await response.json()
      const score1 = result.prediction;
      const isAuthentic = score1 > 0.5;
      setAnalysisResult({
        score: score1,
        isAuthentic,
        confidence:result.confidence,
        factors: [
          'Source credibility analysis',
          'Content fact-checking',
          'Social media sentiment',
          'Historical accuracy patterns'
        ]
      });
      setIsAnalyzing(false);
   }catch(err){

    alert("Error during analysis: " + err.message)
   }
      
    
  };

  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze multiple authenticity factors in real-time'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive authenticity scores and detailed breakdowns within seconds'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Supports news sources from around the world in multiple languages'
    },
    {
      icon: Users,
      title: 'Community Verified',
      description: 'Backed by a network of verified journalists and fact-checkers'
    }
  ];

  const stats = [
    { number: '2.3M+', label: 'Articles Analyzed' },
    { number: '94%', label: 'Accuracy Rate' },
    { number: '150+', label: 'Countries Covered' },
    { number: '24/7', label: 'Real-time Monitoring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>

      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-fade-in">
              Verify News
              <br />
              <span className="text-purple-300">Instantly</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Combat misinformation with AI-powered news authenticity detection. 
              Get real-time credibility scores and detailed analysis for any news article.
            </p>

            {/* Demo Section */}
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="url"
                  placeholder="Paste news article URL here..."
                  value={url}
                  onChange={(e) => setNewsUrl(e.target.value)}
                  className="flex-1 px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <button
                  onClick={handleAnalysis}
                  disabled={!url.trim() || isAnalyzing}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Analysis Result */}
              {analysisResult && (
                <div className="bg-slate-700/30 rounded-xl p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {analysisResult.isAuthentic ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-green-400" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold">
                          {analysisResult.score}
                        </h3>
                        <p className="text-gray-400">Confidence: {analysisResult.confidence}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-400">{analysisResult.score}</div>
                      <div className="text-sm text-gray-400">Prediction</div>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-left">Analysis Factors:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {analysisResult.factors.map((factor, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-slate-600 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${analysisResult.isAuthentic ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-green-500 to-green-400'}`}
                          style={{ width: `${analysisResult.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI technology combined with expert human insight to deliver unparalleled accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:transform hover:scale-105 border border-purple-500/10 hover:border-purple-500/30">
                <feature.icon className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our three-step process delivers comprehensive authenticity analysis in seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Submit Article',
                description: 'Paste any news article URL or upload content directly for instant analysis'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced algorithms examine source credibility, content patterns, and factual accuracy'
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive detailed authenticity scores with explanations and supporting evidence'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Combat
            <br />
            <span className="text-purple-400">Misinformation?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust TruthLens to verify news authenticity every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-purple-500 hover:bg-purple-500/10 rounded-xl font-semibold text-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold">TruthLens</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 TruthLens. Empowering truth in the digital age.</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Landing;