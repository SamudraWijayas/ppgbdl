"use client";

import { ThemeSwitcher } from "../../ThemeSwitcher/ThemeSwitcher";
import Image from "next/image";
import { User, Lock, Info, LogOut } from "lucide-react";
import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@heroui/react";

const Account = () => {
  const { dataProfile } = useProfile();
  const session = useSession();
  const isLoadingSession = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  if (isLoadingSession) {
    return (
      <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10">
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-4 rounded-lg" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Image
            src={
              dataProfile?.foto
                ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.foto}`
                : "/profil.jpg"
            }
            width={200}
            height={200}
            alt="profile"
            unoptimized
            className="w-16 h-16 object-cover rounded-full"
          />

          <div className="flex flex-col gap-0 ">
            <h1 className="text-lg font-bold">{dataProfile?.nama}</h1>
            <span className="text-sm text-gray-600">
              {dataProfile?.desa.name}
            </span>
          </div>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Login
        </Link>
      )}
      <ThemeSwitcher />
      <div className="pt-4 flex flex-col gap-3">
        <span className="text-gray-600 dark:text-gray-500 font-medium">
          Lainnya
        </span>
        <div className="flex flex-col gap-5">
          {isAuthenticated && (
            <>
              <Link href="/profile" className="flex gap-2 items-center">
                <User size={20} />
                <span className="text-sm">Kelola Profile</span>
              </Link>
              <Link href="/update-password" className="flex gap-2 items-center">
                <Lock size={20} />
                <span className="text-sm">Ubah Password</span>
              </Link>
            </>
          )}
          <Link href="/" className="flex gap-2 items-center">
            <Info size={20} />
            <span className="text-sm">Pusat Bantuan</span>
          </Link>
          {isAuthenticated && (
            <button
              className="flex gap-2 items-center text-red-600 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <LogOut />
              <span className="text-sm">Keluar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
