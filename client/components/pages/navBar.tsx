"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";


const NavBar = () => {
  const { user, logout } = useAuthStore(); // FIXED

  return (
    <nav className="w-full border-b bg-background/70 backdrop-blur-md text">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <Image
            src="/evangadi-logo-header-.png"
            alt="Evangadi logo"
            width={150}
            height={40} // FIXED
          />
        </Link>

        {/* Links */}
        <div>
          <Link href="#" className="hover:text-primary">
            How it works
          </Link>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="border">
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
