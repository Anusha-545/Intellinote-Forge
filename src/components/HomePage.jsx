import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Upload, FileText, Zap, Shield, BarChart, Users } from 'lucide-react';

function HomePage() {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your PDFs with{' '}
            <span className="text-blue-600">AI Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Upload your PDFs and instantly extract text, generate summaries, and gain insights using Groq AI's lightning-fast processing.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <Upload size={20} />
              Start Uploading PDFs
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-300 flex items-center justify-center gap-2">
              <Zap size={20} />
              Try Live Demo
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Drag & Drop Your PDFs Here
              </h3>
              <p className="text-gray-500 mb-6">Or click to browse files</p>
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept=".pdf" multiple />
                <div className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                  <FileText size={20} />
                  Browse PDF Files
                </div>
              </label>
              <p className="text-gray-400 text-sm mt-4">Supports multiple PDF uploads • Max 50MB per file</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose <span className="text-blue-600">Intellinote Forge</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Groq AI Powered
              </h3>
              <p className="text-gray-600">
                Lightning-fast text extraction and summarization using cutting-edge Groq AI technology.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Summarization
              </h3>
              <p className="text-gray-600">
                Get concise, accurate summaries highlighting key points from lengthy PDF documents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your documents are processed securely and never stored on our servers after processing.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">PDFs Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.8%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">&lt;2s</div>
              <div className="text-blue-100">Avg Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;