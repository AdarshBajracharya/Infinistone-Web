import { useMutation } from "@tanstack/react-query";
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