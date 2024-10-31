import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';


// Created an axios instance and ı need to get rid of this
const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

const SignupForm = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      role_id: ''
    }
  });

  const selectedRoleId = watch("role_id");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
        console.log('Available roles:', response.data);
      } catch (err) {
        setError('Failed to fetch roles');
        console.error('Error fetching roles:', err);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    console.log('Selected role ID:', selectedRoleId);
  }, [selectedRoleId]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const role_id = Number(data.role_id);
      const selectedRole = roles.find(role => role.id === role_id);
      const roleName = selectedRole?.name;

      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id
      };

      if (roleName === 'Mağaza') {
        formData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxId,
          bank_account: data.storeBankAccount
        };
      }

      console.log('Submitting data:', formData);
      await api.post('/signup', formData);
      reset();

      alert("You need to click the link in your email to activate your account!");
      history.goBack();
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Oops! Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "w-full p-2 border rounded bg-[#FAFAFA] outline-none focus:border-[#23A6F0] transition-colors";

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl text-[#252B42] font-bold mb-6">Sign Up</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Name</label>
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })}
            className={inputStyles}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
            className={inputStyles}
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
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              }
            })}
            className={inputStyles}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => {
                if (watch('password') != val) {
                  return "Passwords do not match";
                }
              },
            })}
            className={inputStyles}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm text-[#252B42] font-medium mb-1">Role</label>
          <select
            {...register('role_id')}
            className={inputStyles}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Store Fields */}
        {roles.find(role => role.id === Number(selectedRoleId))?.name === 'Mağaza' && (
          <div className="space-y-4">
            {/* Store Name */}
            <div>
              <label className="block text-sm text-[#252B42] font-medium mb-1">Store Name</label>
              <input
                {...register('storeName', {
                  required: 'Store name is required',
                  minLength: {
                    value: 3,
                    message: 'Store name must be at least 3 characters'
                  }
                })}
                className={inputStyles}
              />
              {errors.storeName && (
                <p className="text-red-500 text-sm mt-1">{errors.storeName.message}</p>
              )}
            </div>

            {/* Store Phone */}
            <div>
              <label className="block text-sm text-[#252B42] font-medium mb-1">Store Phone</label>
              <input
                {...register('storePhone', {
                  required: 'Store phone is required',
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: 'Invalid Turkish phone number'
                  }
                })}
                className={inputStyles}
                placeholder="+90XXXXXXXXXX"
              />
              {errors.storePhone && (
                <p className="text-red-500 text-sm mt-1">{errors.storePhone.message}</p>
              )}
            </div>

            {/* Store Tax ID */}
            <div>
              <label className="block text-sm text-[#252B42] font-medium mb-1">Store Tax ID</label>
              <input
                {...register('storeTaxId', {
                  required: 'Tax ID is required',
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: 'Invalid Tax ID format (TXXXXVXXXXXX)'
                  }
                })}
                className={inputStyles}
                placeholder="TXXXXVXXXXXX"
              />
              {errors.storeTaxId && (
                <p className="text-red-500 text-sm mt-1">{errors.storeTaxId.message}</p>
              )}
            </div>

            {/* Store Bank Account */}
            <div>
              <label className="block text-sm text-[#252B42] font-medium mb-1">Store Bank Account</label>
              <input
                {...register('storeBankAccount', {
                  required: 'Bank account is required',
                  pattern: {
                    value: /^TR\d{24}$/,
                    message: 'Invalid IBAN format (TR followed by 24 digits)'
                  }
                })}
                className={inputStyles}
                placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
              />
              {errors.storeBankAccount && (
                <p className="text-red-500 text-sm mt-1">{errors.storeBankAccount.message}</p>
              )}
            </div>
          </div>
        )}

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
              'Sign Up'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;