import React, { useState } from 'react';
import { api } from '@/api/client';
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const UpdatePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Requirements checks matching backend Zod schema
  const hasMinLength = newPassword.length >= 8 && newPassword.length <= 16;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMatching = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!oldPassword) {
      setError('Please enter your current password.');
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasSpecial) {
      setError('Please satisfy all password security requirements.');
      return;
    }
    if (!isMatching) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      await api.patch('/api/auth/update-password', {
        oldPassword,
        newPassword,
      });

      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to update password. Please check your current password.';
      setError(typeof message === 'string' ? message : 'Failed to update password. Please check your current password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[520px] mx-auto py-6">
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none">
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-semibold text-[#243027]">
            Update Password
          </CardTitle>
          <CardDescription className="text-[#6F756D] text-sm">
            Choose a strong password to keep your account secure.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-2">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2.5 text-[#B6534B] text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 rounded-xl bg-[#477A58]/10 border border-[#477A58]/30 flex items-start gap-2.5 text-[#477A58] text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-medium text-[#243027] mb-1.5" htmlFor="oldPassword">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOld ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027]"
                  tabIndex={-1}
                >
                  {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-medium text-[#243027] mb-1.5" htmlFor="newPassword">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  placeholder="8 to 16 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027]"
                  tabIndex={-1}
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-medium text-[#243027] mb-1.5" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F756D] hover:text-[#243027]"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements Checklist (Section 11) */}
            <div className="p-3.5 rounded-xl bg-[#F7F3E8] border border-[#DDD8C9]/60 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#6F756D] block mb-1">
                Password Requirements
              </span>
              <div className="flex items-center gap-2 text-xs">
                {hasMinLength ? (
                  <Check className="w-3.5 h-3.5 text-[#477A58]" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#6F756D]" />
                )}
                <span className={hasMinLength ? 'text-[#477A58] font-medium' : 'text-[#6F756D]'}>
                  Between 8 and 16 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasUppercase ? (
                  <Check className="w-3.5 h-3.5 text-[#477A58]" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#6F756D]" />
                )}
                <span className={hasUppercase ? 'text-[#477A58] font-medium' : 'text-[#6F756D]'}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasSpecial ? (
                  <Check className="w-3.5 h-3.5 text-[#477A58]" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#6F756D]" />
                )}
                <span className={hasSpecial ? 'text-[#477A58] font-medium' : 'text-[#6F756D]'}>
                  At least one special character (!@#$%^&* etc.)
                </span>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2 text-xs pt-1 border-t border-[#DDD8C9]/40">
                  {isMatching ? (
                    <Check className="w-3.5 h-3.5 text-[#477A58]" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-[#B6534B]" />
                  )}
                  <span className={isMatching ? 'text-[#477A58] font-medium' : 'text-[#B6534B]'}>
                    {isMatching ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !hasMinLength || !hasUppercase || !hasSpecial || !isMatching}
              className="w-full h-11 rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] font-medium transition-colors shadow-none mt-4 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating password...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
