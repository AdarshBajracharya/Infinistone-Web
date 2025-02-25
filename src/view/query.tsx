import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      fname: string;
      lname: string;
      email: string;
      image: any;
      phone: string;
      address: string;
      password: string;
    }) => axios.post("http://localhost:3000/api/v1/auth/register", data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/auth/login", data);
    },
  });
};

export const useUpdateProfile = (userId: string) => {
  return useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: (data: {
      fname?: string;
      lname?: string;
      phone?: string;
      address?: string;
      image?: any;
    }) => axios.put(`http://localhost:3000/api/v1/auth/update/${userId}`, data), 
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["ADD_PRODUCT"],
    mutationFn: (data: {
      item_name: string;
      item_type: string;
      item_description: string;
      item_price: number;
      image: any;
    }) => axios.post("http://localhost:3000/api/v1/product/create", data),
  });
};

type Product = {
  _id: string;
  item_name: string;
  item_type: string;
  item_description: string;
  item_price: number;
  image: any;
};

// Fetch products query
export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["GET_PRODUCTS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/v1/product/getAllProducts");
      console.log("Fetched products:", response.data);
      return response.data.data; // Ensure this path is correct
    },
  });
};
export const useGetProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["GET_PRODUCT", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      console.log("Fetched product:", response.data); // Log the full response for debugging
      return response.data.data; // Ensure we're accessing the 'data' property
    },
    enabled: !!id, // Only run query when id is available
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: (id: string) => {
      return axios.delete(`http://localhost:3000/api/v1/product/${id}`);
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: (data: {
      id: string;
      item_name?: string;
      item_type?: string;
      item_description?: string;
      item_price?: number;
      image?: any;
    }) =>
      axios.put(`http://localhost:3000/api/v1/product/${data.id}`, data),
  });
};

// Booking Types
type Booking = {
  _id: string;
  customer: {
    fname: string;
    lname: string;
    email: string;
  };
  product: {
    item_name: string;
    item_price: number;
  };
  bookingDate: string;
};

// Add Booking
export const useAddBooking = () => {
  return useMutation({
    mutationKey: ["ADD_BOOKING"],
    mutationFn: (data: {
      customerId: any;
      productId: string;
      bookingDate: string;
    }) => axios.post("http://localhost:3000/api/v1/booking/booking", data),
  });
};

// Get All Bookings
export const useGetBookings = () => {
  return useQuery({
    queryKey: ["GET_BOOKINGS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/v1/booking/bookings");
      console.log("Fetched bookings:", response.data); // Log the full response for debugging
      return response.data.bookings; // Access the 'bookings' property from the response
    },
  });
};


// Get Booking by ID
export const useGetBooking = (id: string) => {
  return useQuery<Booking, Error>({
    queryKey: ["GET_BOOKING", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/booking/booking/${id}`);
      console.log("Fetched booking:", response.data); // Log the full response for debugging
      return response.data.data; // Ensure we're accessing the 'data' property
    },
    enabled: !!id, // Only run query when id is available
  });
};

// Get Bookings by User ID
export const useGetBookingsByUserId = (userId: string) => {
  return useQuery<Booking[], Error>({
    queryKey: ["GET_BOOKINGS_BY_USER", userId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/booking/bookings/customer/${userId}`);
      console.log("Fetched bookings by user:", response.data);
      return response.data.data; // Ensure this path is correct
    },
    enabled: !!userId, // Only run query when userId is available
  });
};

// Update Booking
export const useUpdateBooking = () => {
  return useMutation({
    mutationKey: ["UPDATE_BOOKING"],
    mutationFn: (data: {
      id: string;
      customerId?: string;
      productId?: string;
      bookingDate?: string;
    }) =>
      axios.put(`http://localhost:3000/api/v1/booking/booking/${data.id}`, data),
  });
};

// Delete Booking
export const useDeleteBooking = () => {
  return useMutation({
    mutationKey: ["DELETE_BOOKING"],
    mutationFn: (id: string) => {
      return axios.delete(`http://localhost:3000/api/v1/booking/booking/${id}`);
    },
  });
};