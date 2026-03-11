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
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (value: LoginInput) => {
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", value);
      const responseData = res.data;

      if (!responseData.success) {
        setError("email", {
          message: responseData.message || "Login failed",
        });
        setIsLoading(false);
        return;
      }

      const token = responseData.data?.token;
      const userData = responseData.data?.user;

      if (!token || !userData) {
        setError("email", {
          message: "Invalid response structure from server",
        });
        setIsLoading(false);
        return;
      }

      const { password, ...userWithoutPassword } = userData;
      login({ token: token, user: userWithoutPassword });
      router.push("/questions");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed";

      if (err?.response?.status === 400 && err?.response?.data?.errors) {
        const zodErrors = err.response.data.errors;
        zodErrors.forEach((error: any) => {
          const path = Array.isArray(error.path)
            ? error.path[error.path.length - 1]
            : error.path;
          if (path) setError(path as any, { message: error.message });
        });
        setIsLoading(false);
        return;
      }

      setError("email", { message: msg || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-32 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="max-w-6xl w-full mx-auto px-4 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-stretch">
          <div className="hero-grid rounded-3xl p-8 lg:p-12 soft-shadow">
            <span className="accent-pill inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
              Community-led learning
            </span>
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1f1a17] mb-5 leading-tight">
              A forum where questions turn into shared breakthroughs.
            </h1>
            <p className="text-lg text-[#5f564f] mb-8 leading-relaxed">
              Evangadi Forum connects learners with mentors and peers so every
              challenge becomes a chance to grow. Ask boldly, answer with care,
              and build your learning story.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#4f453f]">
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mb-2">
                  curated clarity
                </p>
                <p>Find the best answers faster with a thoughtful review flow.</p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mb-2">
                  trusted mentors
                </p>
                <p>Learn from people who have walked the path before you.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/how-it-works">
                <Button className="bg-[#1f6fe5] hover:bg-[#1a5ec6] text-white px-6 py-2 rounded-full">
                  How it works
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="border-[#1f6fe5] text-[#1f6fe5] hover:bg-[#1f6fe5] hover:text-white px-6 py-2 rounded-full"
                >
                  Create an account
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 lg:p-10">
              <div className="space-y-2 mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67]">
                  Welcome back
                </p>
                <h2 className="text-3xl font-semibold text-[#1f1a17]">
                  Sign in to continue
                </h2>
                <p className="text-sm text-[#6a605a]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-[#e07a1f] underline underline-offset-4"
                  >
                    Create one now
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#7b6f67]">
                    Safe, secure, and private.
                  </span>
                  <Link
                    href="/forgot-password"
                    className="text-[#e07a1f] underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-[#e07a1f] hover:bg-[#cf6c19] text-white rounded-full"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
