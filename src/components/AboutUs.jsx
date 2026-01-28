import React from 'react';
import { 
  Zap, 
  Shield, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Lightbulb, 
  Globe,
  Heart,
  Rocket,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & AI Researcher",
      bio: "Former Google AI researcher with 10+ years in NLP and document processing",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=65c9ff",
      expertise: ["AI/ML", "NLP", "Leadership"]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Platform Architect",
      bio: "Built scalable document processing systems for Fortune 500 companies",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=ffd166",
      expertise: ["Cloud Architecture", "Security", "Scalability"]
    },
    {
      name: "Dr. Elena Petrova",
      role: "Lead AI Engineer",
      bio: "PhD in Computational Linguistics, specializes in text summarization",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=ef476f",
      expertise: ["Groq AI", "Summarization", "LLMs"]
    },
    {
      name: "David Park",
      role: "Head of Product",
      bio: "Product leader from Silicon Valley with focus on user experience",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=06d6a0",
      expertise: ["UX Design", "Product Strategy", "Growth"]
    }
  ];

  const milestones = [
    { year: "2023 Q1", title: "Company Founded", description: "Started with a vision to revolutionize PDF processing" },
    { year: "2023 Q3", title: "Groq AI Partnership", description: "Integrated Groq AI for lightning-fast processing" },
    { year: "2024 Q1", title: "10K Users", description: "Reached milestone of 10,000 active users" },
    { year: "2024 Q2", title: "Enterprise Launch", description: "Launched enterprise solutions" },
    { year: "Now", title: "Expanding Globally", description: "Processing documents from 50+ countries" },
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge AI technology and Groq's revolutionary processing",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security",
      description: "Your documents are encrypted and automatically deleted after processing. Privacy first.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Centric",
      description: "Designed with user experience in mind. Simple, intuitive, and powerful.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accuracy",
      description: "Maintaining 99.8% accuracy in text extraction and summarization",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "PDFs Processed", icon: <BarChart3 className="w-6 h-6" /> },
    { number: "99.8%", label: "Accuracy Rate", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "2s", label: "Avg Processing Time", icon: <Clock className="w-6 h-6" /> },
    { number: "150+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
          <div className="container mx-auto px-4 py-20 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                Transforming Document Processing Since 2023
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Knowledge Workers</span> with AI
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Intellinote Forge was born from a simple observation: professionals spend countless hours reading through documents. We're changing that with Groq AI-powered text extraction and intelligent summarization.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4">
                    <Target className="w-5 h-5" />
                    Our Mission
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Making Information <span className="text-blue-600">Accessible</span> and <span className="text-blue-600">Actionable</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    We believe that no one should waste hours reading through lengthy documents. Our mission is to transform how professionals interact with written information by providing instant, accurate insights.
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Leveraging Groq AI's cutting-edge technology, we've created a platform that doesn't just extract text—it understands context, identifies key points, and delivers meaningful summaries that save you time and enhance productivity.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-700">Real-time Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-gray-700">Enterprise Security</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">The Problem We Solve</h3>
                        <p className="text-gray-600">
                          Professionals waste 3+ hours weekly reading documents. Our AI reduces this to minutes while improving comprehension.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Our Solution</h3>
                        <p className="text-gray-600">
                          Instant text extraction and intelligent summarization powered by Groq AI's revolutionary processing technology.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Industry Recognition</h3>
                        <p className="text-gray-600">
                          Featured in TechCrunch, awarded "Most Innovative Document AI" in 2024.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Core Values</span>
              </h2>
              <p className="text-gray-600 text-lg">
                The principles that guide every decision we make at Intellinote Forge
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4">
                <Users className="w-5 h-5" />
                Meet Our Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Minds Behind the <span className="text-blue-600">AI Revolution</span>
              </h2>
              <p className="text-gray-600 text-lg">
                A diverse team of AI researchers, engineers, and product experts passionate about transforming document processing
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                    />
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium text-center mb-3">{member.role}</p>
                    <p className="text-gray-600 text-center text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Journey</span>
              </h2>
              <p className="text-gray-600 text-lg">
                From concept to industry-leading AI document processing platform
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
                
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`relative mb-12 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white" />
                    
                    <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} md:w-1/2`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-blue-600 font-bold mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-blue-400 font-semibold mb-4">
                    <Zap className="w-5 h-5" />
                    Powered by Groq AI
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI Processing</span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    We've partnered with Groq to bring you the fastest AI document processing available. Their Language Processing Unit (LPU) technology delivers unprecedented speed and accuracy.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <span>10x faster than traditional cloud AI processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <span>Real-time text extraction and summarization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <span>Context-aware processing with high accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        2s
                      </span>
                    </div>
                    <p className="text-xl text-blue-300 mb-6">Average processing time</p>
                    <p className="text-gray-300">
                      What used to take minutes now happens in seconds, thanks to our Groq AI integration and optimized processing pipeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ready to Transform Your <span className="text-blue-600">Document Workflow?</span>
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who save hours every week with intelligent PDF processing
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                    Start Free Trial
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-300">
                    Schedule a Demo
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-6">
                  <Heart className="w-4 h-4 inline-block mr-1 text-red-500" />
                  Trusted by researchers, lawyers, students, and enterprises worldwide
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;