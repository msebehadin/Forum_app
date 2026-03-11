"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerSchema, registerInput } from "@/schema/auth";
import { api } from "@/libs/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: registerInput) => {
    setApiError(null);
    try {
      const res = await api.post("/auth/register", data);
      const responseData = res.data;

      if (!responseData?.success) {
        setApiError(responseData?.message || "Registration failed");
        return;
      }

      const token = responseData.data?.token;
      const userData = responseData.data?.user;

      if (!token || !userData) {
        setApiError("Invalid response structure from server");
        return;
      }

      login({ token, user: userData });
      router.push("/questions");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed";
      setError("email", { message: msg });
      setApiError(msg);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="max-w-6xl w-full mx-auto px-4 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl glass-card rounded-3xl p-8 lg:p-10">
              <div className="space-y-2 mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67]">
                  Start here
                </p>
                <h2 className="text-3xl font-semibold text-[#1f1a17]">
                  Create your account
                </h2>
                <p className="text-sm text-[#6a605a]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#e07a1f] underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: "First name is required" })}
                      placeholder="Sara"
                      className="h-11 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: "Last name is required" })}
                      placeholder="Abebe"
                      className="h-11 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    placeholder="sara.codes"
                    className="h-11 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="you@example.com"
                    className="h-11 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Create a strong password"
                    className="h-11 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-3 text-sm text-[#6a605a]">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                    className="mt-1 size-4 rounded border-orange-200 text-[#e07a1f] focus:ring-[#ffb66d]"
                  />
                  <label htmlFor="terms" className="leading-5">
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500">{errors.terms.message}</p>
                )}
                {apiError && <p className="text-sm text-red-500">{apiError}</p>}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-[#e07a1f] hover:bg-[#cf6c19] text-white rounded-full"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </div>
          </div>

          <div className="hero-grid rounded-3xl p-8 lg:p-12 soft-shadow">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67] mb-4">
              What you get
            </p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1f1a17] mb-6 leading-tight">
              Join a focused community of builders and learners.
            </h1>
            <p className="text-lg text-[#5f564f] mb-8 leading-relaxed">
              Post your toughest questions, share what you know, and discover
              people who are excited to help you move faster.
            </p>
            <div className="grid gap-4 text-sm text-[#4f453f]">
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mb-2">
                  smarter answers
                </p>
                <p>Signal boosts highlight the most helpful responses.</p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mb-2">
                  steady momentum
                </p>
                <p>Track progress across questions and answers in one place.</p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mb-2">
                  supportive peers
                </p>
                <p>Learn together with people who want you to succeed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
