"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { loginSchema, LoginInput } from "@/schema/auth";
import { api } from "@/libs/axios";
import { useAuthStore } from "@/store/useAuthStore";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (value: LoginInput) => {
    try {
      const res = await api.post("/auth/login", value);
      const data = res.data;

      if (!data?.token || !data?.user) {
        setError("email", { message: "Invalid server response" });
        return;
      }

      login({ token: data.token, user: data.user });
      router.push("/questions");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.response?.data?.error;

      if (err?.response?.status === 400 && err?.response?.data?.errors) {
        const zodErrors = err.response.data.errors;

        zodErrors.forEach((e: any) => {
          const path = Array.isArray(e.path)
            ? e.path[e.path.length - 1]
            : e.path;
          if (path) setError(path as any, { message: e.message });
        });
        return;
      }

      setError("email", { message: msg || "Something went wrong" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT — Login Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Login to your account
              </h1>
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#fe8402] underline underline-offset-4"
                >
                  create a new account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="text"
                  placeholder="your email"
                  className="h-12 bg-yellow-50 border-yellow-200 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-[#fc9b34]"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-yellow-50 border-yellow-200 focus-visible:ring-2 focus-visible:ring-[#fc9b34]"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end text-sm">
                <Link
                  href="/forgot-password"
                  className="text-[#fc9b34] underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT — About Section */}
        <div className="px-4 md:px-8">
          <h2 className="text-lg font-semibold text-[#fe8402] mb-2">About</h2>

          <h1 className="text-4xl font-extrabold text-purple-800 mb-4 leading-tight">
            Evangadi Networks
          </h1>

          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            No matter what stage of life you are in, whether you’re just starting
            elementary school or being promoted to CEO of a Fortune 500 company,
            you have much to offer to those who are trying to follow in your
            footsteps.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>

          <Button className="bg-[#fe8402] hover:bg-[#fc9b34] text-white px-6 py-2 text-lg rounded-lg">
            HOW IT WORKS
          </Button>
        </div>
      </div>
    </div>
  );
}
