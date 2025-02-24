import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { BackButton } from '../components/BackButton';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await loginWithGoogle(response.access_token);
        navigate('/dashboard');
      } catch (err) {
        setError('Google login failed');
      }
    },
    onError: () => {
      setError('Google login failed');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#4A90E2] via-[#357ABD] to-[#FF6F61] flex flex-col">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-[#333333] mb-8">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-[#FF6F61] p-4 rounded">
              <p className="text-sm text-[#FF6F61]">{error}</p>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={() => googleLogin()}
            className="w-full mb-6 bg-white text-gray-700 rounded-lg px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white rounded-lg px-6 py-3 hover:from-[#357ABD] hover:to-[#4A90E2] transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#4A90E2] hover:text-[#357ABD] font-medium transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Keywords Section */}
          <div className="mt-12 text-center">
            <div className="text-xs text-gray-500 space-y-2">
              <p>Secure Login • Privacy Protected • 2+ Months Email Validity</p>
              <p>Temporary Email Service • Disposable Email • Anonymous Inbox</p>
              <p>Spam Protection • Free Service • No Credit Card Required</p>
              <p>Instant Access • Multiple Domains • Custom Email Addresses</p>
              <p>Email Privacy • Data Protection • GDPR Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}