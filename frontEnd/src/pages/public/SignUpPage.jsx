import axiosClient from "@/api/axiosClient";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  

     
        


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
    {
      name:'test1',
      email:'test1@gmail.com',
      password:'test1@',
      address:'home',
      phone: 2126123456789
    }
  });


  const onSubmit = async(data) => {
    console.log("Registering user:", data);

    try{
        // await axios.get('http://localhost:8000/sanctum/csrf-cookie',
        //   {
        //     withCredentials: true ,
        //   },
        // )
        
        await axiosClient.post(`/register` , data)
    }
    catch(err){
      console.error(err)
    }
    finally{

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              {...register("name", { required: "Le nom est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "L'email est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Le mot de passe est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              {...register("address", { required: "L'adresse est requise" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              {...register("phone", { required: "Le numéro de téléphone est requis" })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
