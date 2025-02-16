import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'; // Import icons
import backgroundImage from '../assets/background_login.jpg';
import logo from '../assets/logo.png';
import { useLogin } from './query'; // Import useLogin mutation

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const loginMutation = useLogin(); // Initialize the login mutation

  const onSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        navigate('/home'); // Navigate to the Dashboard
      },
      onError: (error) => {
        console.error('Login Failed:', error);
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start pl-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[480px] text-black">
        <img
          src={logo}
          alt="Company Logo"
          className="w-50 h-50 mx-auto mb-1 object-contain"
        />

        {/* Display error message if login fails */}
        {loginMutation.isError && (
          <div className="text-red-500 text-center mb-4">
            Login failed. Please check your credentials.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          {/* Email Field */}
          <div className="flex items-center bg-white/30 border border-black/40 rounded-lg focus-within:ring-2 focus-within:ring-white/50">
            <span className="px-3 text-black/50">
              <FaUser />
            </span>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter email"
              className="w-full p-3 bg-transparent focus:outline-none placeholder-black/50 text-black"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-white/30 border border-black/40 rounded-lg focus-within:ring-2 focus-within:ring-white/50">
            <span className="px-3 text-black/50">
              <FaLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter password"
              className="w-full p-3 bg-transparent focus:outline-none placeholder-black/50 text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 text-black/50 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-black py-3 rounded-full hover:bg-gray-900 transition-all mx-auto w-32 text-white"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-black mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-black font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;