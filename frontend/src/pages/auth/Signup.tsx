import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Store, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const Signup: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!address.trim()) {
      setError('Address is required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      await register(name.trim(), email.trim(), password, address.trim());
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F3E8]">
      <Card className="w-full max-w-[480px] bg-[#FFFDF7] border-[#DDD8C9] shadow-sm rounded-2xl">
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43] mb-3">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#6F8F72] mb-1">
            Store Rating Platform
          </span>
          <CardTitle className="text-2xl font-semibold text-[#243027]">Create your account</CardTitle>
          <CardDescription className="text-[#6F756D] text-sm">
            Sign up to start using the Store Rating Platform
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2.5 text-[#B6534B] text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 rounded-lg bg-[#477A58]/10 border border-[#477A58]/30 flex items-start gap-2.5 text-[#477A58] text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Account created successfully! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-[#243027] mb-1.5" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
                maxLength={50}
                className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#243027] mb-1.5" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#243027] mb-1.5" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                rows={2}
                placeholder="Enter your physical address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
                required
                maxLength={255}
                className="w-full px-3 py-2 text-sm bg-[#FFFDF7] border border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus:outline-none focus:ring-2 focus:ring-[#315C43] focus:border-[#315C43] rounded-xl transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#243027] mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] text-[#6F756D] mt-1 block">
                Must be at least 8 characters long
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#243027] mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027]"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full h-11 rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] font-medium transition-colors shadow-none mt-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6F756D]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[#315C43] hover:text-[#264B36] underline underline-offset-2"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
