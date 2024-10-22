import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import md5 from 'md5'; // Used for generating Gravatar hash

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mock login function
  const mockLogin = (email, password) => {
    // Mocked users for testing
    const mockUsers = [
      { email: 'cetoerdem1@gmail.com', password: 'Password123-' }, // Successful login
      { email: 'user@example.com', password: 'wrongpassword' },  // Failed login
    ];

    // Check if the provided email and password match any of the mocked users
    const user = mockUsers.find(user => user.email === email && user.password === password);
    
    // Simulate a successful login response
    if (user) {
      return { success: true, user: { email: user.email }, token: 'mockToken' };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { email, password, rememberMe } = data;

    try {
      // Use the mock login function instead of the thunk for testing
      const result = mockLogin(email, password);

      if (result.success) {
        // Save user token if 'Remember Me' is checked
        if (rememberMe) {
          localStorage.setItem('token', result.token);
        }

        // Show success toast
        toast.success('Logged in successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to previous page or home
        const redirectTo = location.state?.from || '/';
        history.push(redirectTo);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Gravatar URL based on the email
  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#252B42] mb-6">Login</h1>

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
                message: 'Invalid email address',
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('rememberMe')}
            className="mr-2"
          />
          <label className="text-sm text-[#252B42] font-medium">Remember Me</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-[#23A6F0] text-white rounded hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
