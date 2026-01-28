import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, you would send data to your backend
      // await axios.post('/api/contact', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email Support",
      details: "support@intellinoteforge.com",
      description: "Get help with PDF processing, AI features, or technical issues",
      action: "mailto:support@intellinoteforge.com"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      title: "Live Chat",
      details: "Available 9 AM - 6 PM EST",
      description: "Chat with our support team in real-time",
      action: "#chat"
    },
    {
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Call us for urgent assistance with your account",
      action: "tel:+15551234567"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Typical response time for email inquiries",
      action: null
    }
  ];

  const faqs = [
    {
      question: "How does the Groq AI summarization work?",
      answer: "Our system uses Groq AI's advanced language models to extract text from your PDFs and generate concise, accurate summaries while preserving key information and context."
    },
    {
      question: "Is there a file size limit for PDF uploads?",
      answer: "Yes, we support PDF files up to 50MB per upload. For larger documents, we recommend breaking them into smaller sections."
    },
    {
      question: "How secure is my uploaded data?",
      answer: "All uploaded files are processed securely using encrypted connections. Your documents are automatically deleted from our servers 24 hours after processing."
    },
    {
      question: "Do you support batch processing of multiple PDFs?",
      answer: "Yes! You can upload and process multiple PDFs simultaneously. Each document will be processed individually and you'll receive separate summaries."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Have questions about our PDF processing, AI summarization features, or need technical support?
            Our team is here to help you get the most out of Intellinote Forge.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <MapPin className="w-5 h-5" />
            <span>San Francisco, CA 94107 • Based in Silicon Valley</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {method.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-gray-600 font-medium">{method.details}</p>
                      <p className="text-gray-500 text-sm mt-1">{method.description}</p>
                      {method.action && (
                        <a 
                          href={method.action}
                          className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Contact Now →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Visit Our Office</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>123 Innovation Drive, Suite 500</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="ml-7">San Francisco, CA 94107</span>
                </p>
                <p className="text-blue-100 mt-4">
                  Schedule a meeting with our team for a personalized demo of our PDF processing capabilities.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition duration-300">
                    <span>📄</span> Documentation & API Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition duration-300">
                    <span>🎥</span> Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition duration-300">
                    <span>📋</span> Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition duration-300">
                    <span>🔧</span> Technical Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {/* Form Submission Status */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Message sent successfully!</p>
                    <p className="text-green-700 text-sm">We'll respond to your inquiry as soon as possible.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Something went wrong</p>
                    <p className="text-red-700 text-sm">Please try again or contact us via email directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Pricing</option>
                    <option value="features">Feature Request</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
                    placeholder="Tell us about your PDF processing needs, questions about Groq AI integration, or any other concerns..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    * Required fields
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-300">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                  >
                    View all FAQs
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Working Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Emergency Support Only</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Enterprise Support</h3>
                  <p className="text-gray-300 mb-4">
                    24/7 premium support available for enterprise customers with custom PDF processing needs.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Learn about Enterprise Plans
                    <span>→</span>
                  </a>
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

export default ContactUs;