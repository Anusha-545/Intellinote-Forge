// File: ChatWithAI.jsx
// Location: src/components/ChatWithAI.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Send, 
  Upload, 
  FileText, 
  Loader2, 
  X, 
  Bot, 
  User,
  Paperclip,
  AlertCircle,
  Sparkles,
  MessageSquare,
  BookOpen,
  Shield,
  Zap,
  LogIn,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatWithAI = () => {
  // State management
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to IntelliNote Forge AI! I can help you analyze PDFs and answer questions. Upload a document or just start chatting!",
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isWelcome: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();
  
  // Refs
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // API Configuration
  const API_BASE_URL = 'https://intellinote-backend.onrender.com';
  
  // Create axios instance WITHOUT timeout
  const api = axios.create({
    baseURL: API_BASE_URL,
    // No timeout - requests won't automatically time out
  });

  // Add interceptors for better error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Removed ECONNABORTED check since we don't have timeout
      if (!error.response) {
        throw new Error('Cannot connect to backend server. Make sure the server is running on https://intellinote-backend.onrender.com');
      }
      throw error;
    }
  );

  // Check authentication and backend connection on component mount
  useEffect(() => {
    checkAuthentication();
    checkBackendConnection();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsAuthenticated(true);
        setUserEmail(userData.email || userData.username || 'User');
        
        // Set Authorization header for all requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleLogout();
      }
    } else {
      setIsAuthenticated(false);
      setUserEmail('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserEmail('');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const checkBackendConnection = async () => {
    try {
      setConnectionStatus('checking');
      const response = await api.get('/health');
      
      if (response.data?.status === 'healthy') {
        setBackendAvailable(true);
        setConnectionStatus('connected');
        
        // Add connection status message only if authenticated
        if (isAuthenticated) {
          setMessages(prev => [prev[0], {
            id: 2,
            text: "✅ Backend connected successfully. Ready to process your requests!",
            sender: 'system',
            timestamp: new Date().toISOString(),
            isStatus: true
          }]);
        }
      } else {
        setBackendAvailable(false);
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      setBackendAvailable(false);
      setConnectionStatus('error');
      
      // Add error message only if authenticated
      if (isAuthenticated) {
        setMessages(prev => [prev[0], {
          id: 2,
          text: "⚠️ Cannot connect to backend server. Please make sure the server is running on https://intellinote-backend.onrender.com",
          sender: 'system',
          timestamp: new Date().toISOString(),
          isError: true,
          isStatus: true
        }]);
      }
    }
  };

  // File handling
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    setUploadError('');
    
    if (!file) return;

    // Check file type
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Only PDF files are allowed');
      return;
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    setPdfFile(file);
    
    // Add file upload notification to chat
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: `📄 Uploaded: ${file.name}`,
      sender: 'system',
      timestamp: new Date().toISOString(),
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }]);
  };

  const removeFile = () => {
    setPdfFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Main message handling function
  const handleSendMessage = async (suggestionText = null) => {
    // Check authentication first
    if (!isAuthenticated) {
      setUploadError("Please login to use this feature");
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    const messageToSend = suggestionText || inputMessage.trim();

    // Validation
    if (!messageToSend && !pdfFile) {
      setUploadError("Please enter a message or upload a PDF file");
      return;
    }

    // Check backend connection before sending
    if (!backendAvailable) {
      setUploadError("Cannot connect to backend. Please check if the server is running.");
      return;
    }

    // Clear input if using suggestion
    if (suggestionText) {
      setInputMessage("");
    }

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: messageToSend || (pdfFile ? `Analyze: ${pdfFile.name}` : ""),
      sender: "user",
      timestamp: new Date().toISOString(),
      fileName: pdfFile?.name,
      fileSize: pdfFile ? (pdfFile.size / 1024 / 1024).toFixed(2) + ' MB' : null
    };

    setMessages(prev => [...prev, userMessage]);
    if (!suggestionText) {
      setInputMessage("");
    }

    // Add loading message
    const loadingId = messages.length + 2;
    setMessages(prev => [...prev, {
      id: loadingId,
      text: pdfFile ? "📄 Processing PDF and generating response..." : "🤔 AI is thinking...",
      sender: "ai",
      isLoading: true,
      timestamp: new Date().toISOString(),
    }]);

    setIsLoading(true);
    setUploadError("");

    try {
      let response;
      const startTime = Date.now();

      // Get token for this request
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      if (pdfFile) {
        // If PDF is uploaded, use /upload/pdf endpoint
        const formData = new FormData();
        formData.append('file', pdfFile);
        
        if (messageToSend) {
          formData.append('message', messageToSend);
        }

        // Always request summarization when PDF is uploaded
        const url = messageToSend 
          ? '/upload/pdf?summarize=true' 
          : '/upload/pdf?summarize=true';

        headers['Content-Type'] = 'multipart/form-data';
        
        response = await api.post(url, formData, { headers });

      } else {
        // If no PDF, use /ask/ai endpoint for text-only queries
        headers['Content-Type'] = 'application/json';
        
        response = await api.post('/ask/ai', {
          text: messageToSend,
          prompt_type: "analyze"
        }, { headers });
      }

      const processingTime = (Date.now() - startTime) / 1000;

      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingId));

      // Handle response
      const aiResponse = response.data;
      const aiMessage = {
        id: loadingId,
        text: aiResponse.response || aiResponse.summary || aiResponse.reply || "I've processed your request successfully.",
        sender: "ai",
        timestamp: new Date().toISOString(),
        processingTime: processingTime.toFixed(2),
        keyPoints: aiResponse.key_points,
        modelUsed: aiResponse.model_used || "Groq AI"
      };

      setMessages(prev => [...prev, aiMessage]);

      // Clear PDF file after successful processing
      if (pdfFile) {
        setPdfFile(null);
        
        // Add file processed message
        setMessages(prev => [...prev, {
          id: messages.length + 3,
          text: `✅ PDF processed successfully`,
          sender: 'system',
          timestamp: new Date().toISOString(),
          isStatus: true
        }]);
      }

    } catch (error) {
      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingId));

      let errorMessage = "An error occurred while processing your request.";
      let requiresLogin = false;
      
      if (error.message.includes('Cannot connect to backend')) {
        errorMessage = "Cannot connect to backend server. Please make sure the server is running on https://intellinote-backend.onrender.com";
        setBackendAvailable(false);
        setConnectionStatus('error');
      } 
      else if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Authentication required. Please login again.";
          requiresLogin = true;
          handleLogout();
        } else if (error.response.status === 413) {
          errorMessage = "File is too large. Maximum file size is 10MB.";
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.detail || "Invalid request. Please check your input.";
        } else if (error.response.status === 404) {
          errorMessage = "API endpoint not found. Please check backend configuration.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.message.includes('No authentication token')) {
        errorMessage = "Please login to use this feature.";
        requiresLogin = true;
      }

      // Add error message to chat
      setMessages(prev => [...prev, {
        id: loadingId,
        text: `❌ ${errorMessage}`,
        sender: "ai",
        isError: true,
        timestamp: new Date().toISOString(),
        requiresLogin: requiresLogin
      }]);

      // Show error notification
      setUploadError(errorMessage);

      // Redirect to login if authentication is required
      if (requiresLogin) {
        setTimeout(() => navigate('/login'));
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && inputMessage.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action suggestions
  const quickActions = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Summarize',
      action: 'Summarize this document'
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Ask Question',
      action: 'What is this document about?'
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Key Points',
      action: 'Extract key points from this document'
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: 'Quick Analysis',
      action: 'Provide a quick analysis'
    }
  ];

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Message component
  const MessageBubble = ({ message }) => {
    const isUser = message.sender === 'user';
    const isAI = message.sender === 'ai';
    const isSystem = message.sender === 'system';
    const isLoading = message.isLoading;
    const isError = message.isError;
    const isWelcome = message.isWelcome;
    const isStatus = message.isStatus;
    const requiresLogin = message.requiresLogin;

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-[90%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
          {/* Avatar - Only show for user and AI messages */}
          {!isSystem && !isStatus && (
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isUser 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm'
            }`}>
              {isUser ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
          )}

          {/* Message Bubble */}
          <div className={`rounded-2xl px-4 py-3 ${
            isWelcome
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 w-full max-w-2xl'
              : isStatus
                ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 w-full max-w-2xl'
                : isUser 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-sm' 
                  : isAI 
                    ? (isError 
                      ? requiresLogin
                        ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 text-yellow-800 rounded-bl-none'
                        : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-800 rounded-bl-none' 
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-900 rounded-bl-none shadow-sm')
                    : 'bg-gray-100 border border-gray-200 text-gray-700'
          }`}>
            {/* File info for user messages */}
            {message.fileName && isUser && (
              <div className="flex items-center gap-2 mb-2 p-2 bg-white/20 rounded-lg">
                <FileText className="w-4 h-4 text-blue-200" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{message.fileName}</span>
                    {message.fileSize && (
                      <span className="text-xs text-blue-200 ml-2">
                        {message.fileSize}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Message text */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span>{message.text}</span>
                </div>
              ) : (
                message.text
              )}
            </div>

            {/* Login button for auth errors */}
            {requiresLogin && (
              <div className="mt-3">
                <button
                  onClick={handleLoginRedirect}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  Go to Login Page
                </button>
              </div>
            )}

            {/* Key Points for AI responses */}
            {message.keyPoints && Array.isArray(message.keyPoints) && message.keyPoints.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-sm text-gray-700">Key Points:</span>
                </div>
                <ul className="space-y-1.5">
                  {message.keyPoints.slice(0, 5).map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Processing Info */}
            {message.processingTime && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⚡ Processed in {message.processingTime}s</span>
                  {message.modelUsed && (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {message.modelUsed}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Timestamp */}
            {!isStatus && (
              <div className={`text-xs mt-2 ${isUser ? 'text-blue-200 text-right' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please login to access the AI chat features
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLoginRedirect}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Go to Login Page
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create one now
                </button>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Features you'll get access to:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                AI-powered PDF analysis and summarization
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Document upload and processing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Interactive chat with Groq AI
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Secure document storage
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                IntelliNote Forge AI
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                  connectionStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <p className="text-sm text-gray-600">
                  {connectionStatus === 'connected' ? 'Backend connected' :
                   connectionStatus === 'checking' ? 'Checking connection...' : 
                   'Backend not connected'}
                </p>
                <span className="text-xs text-gray-500 ml-2">•</span>
                <span className="text-sm text-gray-600">Logged in as: {userEmail}</span>
              </div>
            </div>
          </div>
          
          {/* File Info & Status */}
          <div className="flex items-center gap-3">
            {pdfFile && (
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-blue-900 truncate max-w-[200px]">
                    {pdfFile.name}
                  </p>
                  <p className="text-xs text-blue-700">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200 disabled:opacity-50"
                  disabled={isLoading}
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button
                onClick={checkBackendConnection}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
                  connectionStatus === 'connected' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : connectionStatus === 'checking'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
                title="Check backend connection"
              >
                {connectionStatus === 'connected' ? '✅ Connected' :
                 connectionStatus === 'checking' ? '🔄 Checking' : '❌ Retry Connection'}
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition duration-200"
                title="Logout"
              >
                <LogIn className="w-4 h-4 rotate-180" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag & Drop Overlay */}
          {isDragging && (
            <div className="fixed inset-0 bg-blue-500/5 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white p-10 rounded-2xl shadow-2xl border-2 border-dashed border-blue-400 max-w-md text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Drop PDF to Upload</h3>
                <p className="text-gray-600 mb-4">Maximum file size: 10MB</p>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p>✨ Your document will be analyzed instantly</p>
                </div>
              </div>
            </div>
          )}

          {/* Connection Warning */}
          {!backendAvailable && connectionStatus === 'error' && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-800 mb-1">Backend Connection Required</h3>
                    <p className="text-red-700 text-sm">
                      Cannot connect to backend server. Please make sure your FastAPI server is running on https://intellinote-backend.onrender.com
                    </p>
                    <div className="mt-3 text-xs text-red-600 bg-red-50 p-3 rounded-lg">
                      <p className="font-semibold">To fix this:</p>
                      <ol className="list-decimal pl-4 mt-1 space-y-1">
                        <li>Navigate to your backend folder: <code>cd intellinote-backend</code></li>
                        <li>Start the server: <code>python main.py</code> or <code>uvicorn main:app --reload</code></li>
                        <li>Wait for "Uvicorn running on http://127.0.0.1:8000" message</li>
                        <li>Click "Retry Connection" button above</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions - Only show when backend is available */}
          {backendAvailable && messages.length <= 2 && (
            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Get Started with AI Analysis</h2>
                    <p className="text-gray-600">Upload a PDF or try these quick actions:</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(action.action)}
                      disabled={isLoading || !backendAvailable}
                      className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition duration-300">
                          {action.icon}
                        </div>
                        <span className="font-semibold text-gray-900">{action.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{action.action}</p>
                    </button>
                  ))}
                </div>

                {/* Or drag & drop section */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 mb-2">
                    <div className="h-px w-16 bg-gray-300"></div>
                    <span className="text-sm">or</span>
                    <div className="h-px w-16 bg-gray-300"></div>
                  </div>
                  <div 
                    onClick={triggerFileInput}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border-2 border-dashed border-blue-300 transition duration-300 group disabled:opacity-50"
                    disabled={isLoading || !backendAvailable}
                  >
                    <Upload className="w-5 h-5 text-blue-600 group-hover:scale-110 transition duration-300" />
                    <span className="font-medium text-blue-700">Click to upload PDF</span>
                    <span className="text-sm text-blue-600">(max 10MB)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm p-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            {/* Upload Error */}
            {uploadError && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">{uploadError}</p>
                  {uploadError.includes('Cannot connect to backend') && (
                    <button
                      onClick={checkBackendConnection}
                      className="text-xs text-red-600 underline mt-1 hover:text-red-800"
                    >
                      Click here to retry connection
                    </button>
                  )}
                </div>
                <button onClick={() => setUploadError('')} className="text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Form */}
            <div className="flex items-end gap-3">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,application/pdf"
                className="hidden"
                disabled={isLoading || !backendAvailable}
              />

              {/* Upload Button */}
              <button
                onClick={triggerFileInput}
                disabled={isLoading || !backendAvailable}
                className={`flex-shrink-0 p-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  pdfFile 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700'
                }`}
                title={pdfFile ? "PDF Ready" : backendAvailable ? "Upload PDF (max 10MB)" : "Backend not connected"}
              >
                {pdfFile ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <Paperclip className="w-5 h-5" />
                )}
              </button>

              {/* Message Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    !backendAvailable 
                      ? "Backend not connected. Please start the server first."
                      : pdfFile 
                      ? `Ask about "${pdfFile.name}" or press Enter to summarize...` 
                      : "Type your message here or upload a PDF..."
                  }
                  disabled={isLoading || !backendAvailable}
                  className="w-full p-4 pr-24 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 bg-white shadow-sm resize-none disabled:opacity-50 transition duration-300"
                  rows="1"
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  {/* Character Count - Only show when typing */}
                  {inputMessage.length > 0 && (
                    <span className={`text-xs ${
                      inputMessage.length > 1000 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {inputMessage.length}/1000
                    </span>
                  )}
                  
                  {/* Send Button */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !backendAvailable || (!inputMessage.trim() && !pdfFile)}
                    className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    title={backendAvailable ? "Send message" : "Backend not connected"}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions & Status */}
            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <span>⚡ Press Enter to send</span>
                <span>⇧ Shift+Enter for new line</span>
                <span>📄 Max 10MB PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  backendAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></div>
                <span>{backendAvailable ? 'AI Ready' : 'Backend Offline'}</span>
                {pdfFile && (
                  <span className="ml-4 flex items-center gap-1 text-blue-600">
                    <FileText className="w-3 h-3" />
                    PDF Ready
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-gray-400 py-4 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm">
              🚀 Powered by Groq AI • IntelliNote Forge
            </p>
          </div>
          <div className="text-sm flex flex-wrap justify-center gap-2">
            <span className="text-blue-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure Processing
            </span>
            <span>•</span>
            <span>📊 99.8% Accuracy</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              &lt;2s Response
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
export default ChatWithAI;