import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Search, Briefcase, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-slate-900 leading-tight">
            Find Your Dream Job
            <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Start Your Career Journey
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect with top employers and discover opportunities that match your skills and ambitions.
            Your next career move starts here.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-6">
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/jobs')}
              className="px-8 py-6 text-lg border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all duration-300"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl p-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">1000+</h3>
                <p className="text-slate-600">Active Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl p-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">500+</h3>
                <p className="text-slate-600">Companies</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl p-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">95%</h3>
                <p className="text-slate-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-slate-600">Powerful features for job seekers and employers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Search className="h-6 w-6" />,
              title: 'Smart Job Search',
              description: 'Find the perfect job with advanced filters and search capabilities'
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: 'Profile Management',
              description: 'Create comprehensive profiles with resume upload and detailed information'
            },
            {
              icon: <Briefcase className="h-6 w-6" />,
              title: 'Easy Applications',
              description: 'Apply to multiple jobs with one click and track your applications'
            },
            {
              icon: <TrendingUp className="h-6 w-6" />,
              title: 'Career Dashboard',
              description: 'Monitor your job search progress and manage applications efficiently'
            },
            {
              icon: <CheckCircle className="h-6 w-6" />,
              title: 'Employer Tools',
              description: 'Post jobs, manage listings, and review applications seamlessly'
            },
            {
              icon: <ArrowRight className="h-6 w-6" />,
              title: 'Quick Match',
              description: 'Get matched with relevant opportunities based on your profile'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl p-4 w-fit mb-4">
                <div className="text-teal-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers and employers who have found success on our platform
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-teal-400" />
            <span className="text-xl font-bold">JobPortal</span>
          </div>
          <p className="text-slate-400">© 2025 JobPortal. All rights reserved.</p>
          <p className="text-slate-500 mt-2">support@amdox.in</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;