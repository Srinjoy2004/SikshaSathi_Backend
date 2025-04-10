import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Lock, School } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-200 p-4 py-10">
      {/* Back button */}
      <div className="absolute top-0 left-0 right-0">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Background blur effects */}
      <div className="absolute inset-0 bg-dark-200 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-yellow-600/5 blur-3xl"></div>
      </div>

      <Card className="relative glass-morphism w-full max-w-md p-8 yellow-glow">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Join <span className="text-gradient">SikshaSathi</span>
          </h2>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10 bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium text-gray-300">I am a</label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20">
                <div className="flex items-center">
                  <School className="h-5 w-5 mr-2 text-gray-400" />
                  <SelectValue placeholder="Select your role" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-dark-300 border-gray-700">
                <SelectItem value="teacher">Teacher / Professor</SelectItem>
                <SelectItem value="admin">School Administrator</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="other">Other Educational Role</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="pl-10 bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500/20 bg-dark-300/50"
            />
            <label htmlFor="terms" className="ml-2 text-xs text-gray-400">
              I agree to the <Link to="/terms" className="text-yellow-400 hover:text-yellow-500">Terms of Service</Link> and <Link to="/privacy" className="text-yellow-400 hover:text-yellow-500">Privacy Policy</Link>
            </label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-dark-100"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </Button>

          {/* Message display */}
          {message && (
            <p className="text-sm text-center text-yellow-400 mt-2">{message}</p>
          )}
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;