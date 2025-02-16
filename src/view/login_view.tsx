import React from "react";
import { useForm } from "react-hook-form";
import backgroundImage from '../assets/background_login.jpg';
import logo from '../assets/logo.png'; // Import the logo

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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

        {/* <h2 className="text-3xl font-semibold text-center mb-12">Login</h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <input
            type="email"
            {...register("email")}
            placeholder="Enter email"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />

          <button
            type="submit"
            className="mt-4 bg-black py-3 rounded-full hover:bg-gray-900 transition-all mx-auto w-32 text-white"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-black mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-black font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
