import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Store, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      const user = await login(email, password);
      // Role-based redirection per design specification
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'STORE_OWNER') {
        navigate('/owner');
      } else {
        navigate('/stores');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid email or password. Please try again.';
      setError(typeof message === 'string' ? message : 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F3E8]">
      <Card className="w-full max-w-[440px] bg-[#FFFDF7] border-[#DDD8C9] shadow-sm rounded-2xl">
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43] mb-3">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#6F8F72] mb-1">
            Store Rating Platform
          </span>
          <CardTitle className="text-2xl font-semibold text-[#243027]">Welcome back</CardTitle>
          <CardDescription className="text-[#6F756D] text-sm">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2.5 text-[#B6534B] text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-11"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] text-[#243027] placeholder:text-[#8A8F86] focus-visible:ring-[#315C43] rounded-xl h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] font-medium transition-colors shadow-none mt-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6F756D]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-[#315C43] hover:text-[#264B36] underline underline-offset-2"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
