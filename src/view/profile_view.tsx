import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from './query'; // Importing from query.tsx
import axios from 'axios';
import Header from './header';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string>("https://via.placeholder.com/150");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<any>({});
  const { mutate: updateProfile } = useUpdateProfile(localStorage.getItem('userId') || ""); // Pass userId dynamically

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!token || !userId) {
      alert("You need to be logged in to view this page.");
      navigate('/');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched user data:", response.data.data); // Access the correct data
    
        setUser(response.data.data); // Use response.data.data
        setImagePreview(response.data.data.image || "https://via.placeholder.com/150");
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setEditedUser({ ...editedUser, image: imageUrl }); // Set image in edited user data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateProfile(editedUser, {
      onSuccess: (response) => {
        setUser(response.data);
        setIsEditing(false);
        alert("Profile updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 pt-16 flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">{isEditing ? 'Edit Profile' : 'Profile'}</h2>

          <div className="space-y-4 text-left">
            <label className="block">
              <span className="font-semibold text-gray-700">First Name</span>
              <input
                type="text"
                name="fname"
                value={isEditing ? editedUser.fname ?? user.fname : user.fname}
                onChange={isEditing ? handleChange : undefined}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </label>

            <label className="block">
              <span className="font-semibold text-gray-700">Last Name</span>
              <input
                type="text"
                name="lname"
                value={isEditing ? editedUser.lname ?? user.lname : user.lname}
                onChange={isEditing ? handleChange : undefined}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </label>

            <label className="block">
              <span className="font-semibold text-gray-700">Phone</span>
              <input
                type="text"
                name="phone"
                value={isEditing ? editedUser.phone ?? user.phone : user.phone}
                onChange={isEditing ? handleChange : undefined}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </label>

            <label className="block">
              <span className="font-semibold text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </label>

            <label className="block">
              <span className="font-semibold text-gray-700">Address</span>
              <input
                type="text"
                name="address"
                value={isEditing ? editedUser.address ?? user.address : user.address}
                onChange={isEditing ? handleChange : undefined}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </label>
          </div>

          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Update Profile
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-6 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
