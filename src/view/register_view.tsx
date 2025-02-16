import React, { useState } from "react";
import { useForm } from "react-hook-form";
import backgroundImage from '../assets/background_login.jpg';

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // State to store the uploaded image

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission, including the profile picture
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string); // Set the image URL
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start pl-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[480px] text-black">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4"> {/* Reduced margin-bottom */}
          <label htmlFor="profilePicture" className="cursor-pointer">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover border-2 border-black/40"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/30 border-2 border-black/40 flex items-center justify-center text-black/50">
                Upload Photo
              </div>
            )}
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3"> {/* Reduced spacing to space-y-3 */}
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="tel"
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="text"
            {...register("address")}
            placeholder="Address"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="p-3 rounded-lg bg-white/30 border border-black/40 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-black/50 text-black"
          />
          
          <button
            type="submit"
            className="mt-4 bg-black py-3 rounded-full hover:bg-gray-900 transition-all mx-auto w-32 text-white"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-black mt-4">
          Already have an account?{" "}
          <a href="/" className="text-black font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;