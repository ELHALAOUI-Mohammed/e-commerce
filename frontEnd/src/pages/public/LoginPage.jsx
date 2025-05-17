import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axiosClient from "../axiosClient"; // adjust path as needed

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    const response = await axiosClient.post('/login', data);
    const { token, user } = response.data;

    // Update context and localStorage
    login(user, token);

    // Redirect after state is updated
    navigate(user.role === 'admin' ? '/admin/dashboard' : '/customer/home');
    
  } catch (error) {
    console.error(error);
    alert('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "L'email est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Le mot de passe est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Vous n'avez pas de compte ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
}
