'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" // You'll need this component
import { useRouter } from "next/navigation" // Changed from next/router to next/navigation
import { useAuthStore } from "@/store/useAuthStore"
import { registerInput, registerSchema } from "@/schema/auth"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/libs/axios"

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuthStore(); // Changed from 'register' to 'login' if that's what your store has
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<registerInput>({ resolver: zodResolver(registerSchema) })
  
  const onSubmit = async (value: registerInput) => {
    try {
      const res = await api.post('/auth/register', value);
      const data = res.data;
      
      if (!data?.token || !data?.user) {
        setError('email', { message: 'Invalid server response' });
        return;
      }
      
      login({ token: data.token, user: data.user }); // Changed from register to login
      router.push('/questions')
      
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error;

      if (err?.response?.status === 400 && err?.response?.data?.errors) {
        const zodErrors = err.response.data.errors;
        
        zodErrors.forEach((error: any) => {
          const path = Array.isArray(error.path)
            ? error.path[error.path.length - 1]
            : error.path;
          if (path) setError(path as any, { message: error.message });
        });
        return;
      }

      setError("email", { message: msg || "Something went wrong" });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-4 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-10">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Join the network</h1>
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#FF6B00] hover:text-[#FF8C00] underline underline-offset-2"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div className="space-y-3">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                  className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* First and Last Name in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    type="text"
                    placeholder="Enter first name"
                    className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    type="text"
                    placeholder="Enter last name"
                    className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm your password"
                  className="h-12 bg-gray-50 border-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <Label htmlFor="terms" className="text-gray-600 text-sm">
                  I agree to the{" "}
                  <Link href="/privacy-policy" className="text-[#FF6B00] hover:text-[#FF8C00] underline">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-[#FF6B00] hover:text-[#FF8C00] underline">
                    terms of service
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FF9D33] text-white font-bold text-lg rounded-md"
              >
                {isSubmitting ? "Processing..." : "Agree and Join"}
              </Button>

              {/* Already have account link at bottom */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#FF6B00] hover:text-[#FF8C00] underline underline-offset-2"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Mobile: About Section */}
          <div className="lg:hidden bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] rounded-xl p-6 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Evangadi Networks</h2>
            <p className="mb-4 text-sm">
              No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
            </p>
            <Button className="bg-white text-[#FF6B00] hover:bg-gray-100 font-bold px-6 py-2 rounded-md">
              HOW IT WORKS
            </Button>
          </div>
        </div>
      </div>

      {/* Right: About Section (Desktop) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gradient-to-b from-[#FF6B00] to-[#FF8C00] p-10 text-center text-white">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <h3 className="text-4xl font-bold mb-6">Evangadi Networks</h3>
          <p className="mb-6 text-lg leading-relaxed">
            No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
          </p>
          <p className="mb-8 text-lg leading-relaxed">
            Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
          </p>
          <Button className="bg-white text-[#FF6B00] hover:bg-gray-100 font-bold px-8 py-3 rounded-md text-lg">
            HOW IT WORKS
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage