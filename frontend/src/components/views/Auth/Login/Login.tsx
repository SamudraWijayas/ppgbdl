"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  const env = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center bg-linear-to-br from-sky-50 to-indigo-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Let&apos;s Catch Big Dreams!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Pursue your dreams passionately and strive to achieve your goals
              every day.
            </p>
          </div>

          {errors.root && (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...field}
                    value={field.value || ""}
                    placeholder="Input your email"
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-black text-sm focus:border-indigo-500 focus:outline-none",
                      errors.identifier ? "border-red-500" : "border-gray-300",
                    )}
                  />
                  {errors.identifier && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      value={field.value || ""}
                      type={isVisible ? "text" : "password"}
                      placeholder="Input your password"
                      className={cn(
                        "w-full rounded-xl border px-4 text-black py-3 pr-12 text-sm focus:border-indigo-500 focus:outline-none",
                        errors.password ? "border-red-500" : "border-gray-300",
                      )}
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {isVisible ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Button */}
            <button
              type="submit"
              disabled={isPendingLogin}
              className="mt-2 w-full rounded-xl bg-linear-to-r from-orange-400 to-orange-500 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
            >
              {isPendingLogin ? "Loading..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-sm font-medium"
            >
              <span>Google</span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Do have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-indigo-600"
            >
              Sign
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/illustration/illus.png" // ganti sesuai asset kamu
          alt="Illustration"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Text */}
        <div className="absolute bottom-10 left-10 max-w-sm text-white">
          <h3 className="text-2xl font-semibold">
            Catch Your Biggest Opportunities
          </h3>
          <p className="mt-2 text-sm text-white/80">
            Become part of our vibrant community of dedicated anglers. Adventure
            awaits!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
