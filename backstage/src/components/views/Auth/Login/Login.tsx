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

  return (
    <section className="flex min-h-screen p-6">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-1 md:w-1/2 lg:px-24">
        {/* <div className="mb-10">
          <Image
            src="/images/general/logogreen.jpg"
            alt="logo"
            width={140}
            height={40}
            priority
          />
        </div> */}

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-1 text-gray-500">
            Enter your email and password to access your account.
          </p>
        </div>

        {errors.root && (
          <div className="mt-4 rounded-md bg-red-50 p-2 text-sm text-red-500">
            {errors?.root?.message}
          </div>
        )}

        <form
          className={cn(
            "mt-6 flex flex-col",
            Object.keys(errors).length > 0 ? "gap-3" : "gap-5"
          )}
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* Email */}
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...field}
                  value={field.value || ""}
                  type="text"
                  placeholder="Enter your email"
                  className={cn(
                    "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none",
                    errors.identifier && "border-red-500"
                  )}
                />
                {errors.identifier && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.identifier.message}
                  </span>
                )}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    value={field.value || ""}
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className={cn(
                      "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none",
                      errors.password && "border-red-500"
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            )}
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-gray-600">Remember Me</span>
            </div>
            <Link
              href="/auth/forget-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot Your Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPendingLogin}
            className="mt-4 flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPendingLogin ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Log In"
            )}
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="mx-2 text-sm text-gray-500">Or Login With</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.6-1.6-35.1-4.7-51.9H272v98.2h147.2c-6.3 34-25.3 62.8-53.9 82v68h87c51.1-47.1 81.2-116.4 81.2-196.3z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.7 0 133.7-24 178.3-65.4l-87-68c-24.2 16.3-55.1 26-91.3 26-70.3 0-129.9-47.4-151.2-111.3H31.2v69.7C75.9 486 167.6 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M120.8 324.3c-5.3-16-8.3-33-8.3-50.3s3-34.3 8.3-50.3V154h-89.8C10 190 0 224.5 0 259.9s10 69.9 31 105.9l89.8-41.5z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.4 0 70.9 12.9 97.3 38.2l72.8-72.8C404.8 26.2 343.7 0 272 0 167.6 0 75.9 58.3 31.2 154l89.8 69.3C142.1 155.1 201.7 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            <span>Log in with Google</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden w-1/2 items-center justify-center rounded-3xl bg-indigo-600 text-white lg:flex">
        <div className="max-w-md text-left">
          <h3 className="mb-4 text-2xl font-semibold">
            Satu akun untuk semua kebutuhan eventmu.
          </h3>
          <p className="mb-6 text-sm text-indigo-100">
            Login sebagai Event Organizer untuk kelola penjualan tiket, atau
            sebagai Customer untuk beli tiket dengan mudah.
          </p>

          <Image
            src="/images/general/logogreen.jpg"
            alt="illustration"
            width={500}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
