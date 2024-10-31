import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../store/actions/clientActions';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    const { email, password, rememberMe } = data;
  
    try {
      const response = await dispatch(login(email, password, rememberMe));
  
      if (response && response.token) {
        toast.success('Login successful!');
        history.push('/');
      } else {
        setError('Login failed. Please check your credentials and try again.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl text-[#252B42] font-bold mb-6">Login</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full p-2 border rounded bg-[#FAFAFA] outline-none focus:border-[#23A6F0] transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required'
            })}
            className="w-full p-2 border rounded bg-[#FAFAFA] outline-none focus:border-[#23A6F0] transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('rememberMe')}
            id="rememberMe"
            className="h-4 w-4 text-[#23A6F0] border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-[#252B42]"
          >
            Remember Me
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-[#23A6F0] text-white rounded hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin inline-block" />
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;