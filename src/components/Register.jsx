import React, { useState } from 'react';
import { 
  UserPlus, Eye, EyeOff, Mail, Lock, User, AlertCircle, Check, 
  FileText, Shield, Loader2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';

// Configure axios
const API_BASE_URL =  'http://localhost:8000';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check username/email availability on change
    if (name === 'username' && value.length >= 3) {
      checkUsernameAvailability(value);
    }
    if (name === 'email' && /\S+@\S+\.\S+/.test(value)) {
      checkEmailAvailability(value);
    }
  };

  const checkUsernameAvailability = async (username) => {
    // In a real app, you'd call an API endpoint
    // For now, we'll simulate with local storage check
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const isAvailable = !existingUsers.some(user => user.username === username);
    setUsernameAvailable(isAvailable);
    return isAvailable;
  };

  const checkEmailAvailability = async (email) => {
    // In a real app, you'd call an API endpoint
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const isAvailable = !existingUsers.some(user => user.email === email);
    setEmailAvailable(isAvailable);
    return isAvailable;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const validateForm = async () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (usernameAvailable === false) {
      newErrors.username = 'Username is already taken';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (emailAvailable === false) {
      newErrors.email = 'Email is already registered';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await api.post('/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Account created successfully! Redirecting to login...', {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Save user to local storage (for demo purposes)
      const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      existingUsers.push({
        username: formData.username,
        email: formData.email,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('registered_users', JSON.stringify(existingUsers));
      
      // Auto-login after registration
      setTimeout(async () => {
        try {
          const loginResponse = await api.post('/login', {
            email: formData.email,
            password: formData.password
          });
          
          const { access_token, user } = loginResponse.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('user', JSON.stringify(user));
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          
          toast.success('Auto-login successful!', {
            position: "top-right",
            autoClose: 2000,
          });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          
        } catch (loginError) {
          console.error('Auto-login failed:', loginError);
          navigate('/login');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data?.detail || 'User already exists or invalid data';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.response.data?.detail || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your connection.';
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const planFeatures = [
    'Process 50 PDFs monthly',
    'Unlimited text extraction',
    'AI-powered summaries',
    '30-day document storage',
    'Email support',
    'Advanced Groq AI integration'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <ToastContainer />
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Join <span className="text-blue-600">Intellinote Forge</span>
                  </h1>
                  <p className="text-gray-600">
                    Create your account and start processing PDFs with AI in minutes
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-4 py-3 border ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 disabled:opacity-50`}
                      placeholder="Choose a username"
                    />
                    {errors.username && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.username}
                      </div>
                    )}
                    {formData.username.length >= 3 && usernameAvailable !== null && !errors.username && (
                      <div className={`flex items-center gap-2 mt-2 text-sm ${usernameAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {usernameAvailable ? (
                          <>
                            <Check className="w-4 h-4" />
                            Username is available
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            Username is taken
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 disabled:opacity-50`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </div>
                    )}
                    {formData.email && /\S+@\S+\.\S+/.test(formData.email) && emailAvailable !== null && !errors.email && (
                      <div className={`flex items-center gap-2 mt-2 text-sm ${emailAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {emailAvailable ? (
                          <>
                            <Check className="w-4 h-4" />
                            Email is available
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            Email is already registered
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 disabled:opacity-50 pr-12`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Password strength</span>
                          <span className="text-sm font-medium">
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                            style={{ width: `${passwordStrength * 25}%` }}
                          />
                        </div>
                        
                        {/* Password Requirements */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {[
                            { text: 'At least 8 characters', met: formData.password.length >= 8 },
                            { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
                            { text: 'One number', met: /[0-9]/.test(formData.password) },
                            { text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) }
                          ].map((req, index) => (
                            <div key={index} className="flex items-center gap-2">
                              {req.met ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                              )}
                              <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 disabled:opacity-50 pr-12`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <label className={`flex items-start gap-3 cursor-pointer ${errors.acceptTerms ? 'text-red-600' : 'text-gray-700'}`}>
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <div>
                        <span>I agree to the </span>
                        <Link to='/' className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </Link>
                        <span> and </span>
                        <Link to='/' className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </Link>
                        {errors.acceptTerms && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.acceptTerms}
                          </div>
                        )}
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <div>
                        <span>Yes, I'd like to receive product updates, tips, and exclusive offers via email</span>
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'} text-white`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Create Free Account
                      </span>
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50"
                        onClick={(e) => isLoading && e.preventDefault()}
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Plan Features */}
            <div className="space-y-8">
              {/* Free Plan Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                  <div className="text-4xl font-bold mb-4">$0<span className="text-xl font-normal">/month</span></div>
                  <p className="text-blue-100">Perfect for getting started with AI document processing</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-center text-blue-200 text-sm">
                  No credit card required • Upgrade anytime
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Join Intellinote Forge?</h3>
                <ul className="space-y-4">
                  {[
                    'AI-powered text extraction with 99.8% accuracy',
                    'Lightning-fast Groq AI processing (<2 seconds)',
                    'Secure and encrypted document handling',
                    'Export summaries in PDF, TXT, and JSON formats',
                    'Join 50,000+ satisfied users worldwide',
                    '24/7 customer support'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enterprise-Grade Security</h3>
                    <p className="text-gray-300 text-sm">
                      Your documents are encrypted end-to-end. We automatically delete processed files after 30 days.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>30-day auto-delete policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>GDPR & SOC 2 compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;