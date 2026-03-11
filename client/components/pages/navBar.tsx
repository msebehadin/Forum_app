"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth state
    logout();
    
    // Optional: Clear any additional storage if needed
    localStorage.removeItem("auth-data");
    
    // Redirect to login page
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/evangadi-logo-header-.png"
            alt="Evangadi logo"
            width={150}
            height={40}
            className="h-auto"
          />
          <span className="hidden md:inline-flex text-xs font-semibold tracking-[0.2em] text-[#7b6f67]">
            LEARN · ASK · SHARE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-[#2e2a27] hover:text-[#e07a1f] transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/questions"
            className="text-sm font-semibold text-[#2e2a27] hover:text-[#1f6fe5] transition-colors"
          >
            Questions
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#1f6fe5] text-white">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-[#1f6fe5] text-[#1f6fe5] hover:bg-[#1f6fe5] hover:text-white"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-[#1f6fe5] hover:bg-[#1a5ec6] text-white px-6 py-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden border-t border-white/60 px-4 py-2 flex justify-center gap-6 text-xs font-semibold uppercase tracking-widest">
        <Link href="/how-it-works" className="text-[#7b6f67] hover:text-[#e07a1f]">
          How it works
        </Link>
        <Link href="/questions" className="text-[#7b6f67] hover:text-[#1f6fe5]">
          Questions
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
