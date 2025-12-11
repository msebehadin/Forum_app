"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo - Left side */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/evangadi-logo-header-.png"
            alt="Evangadi logo"
            width={150}
            height={40}
            className="h-auto"
          />
        </Link>

        {/* "How it works" link - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Link 
            href="/how-it-works" 
            className="text-gray-700 hover:text-[#516cf0] font-medium text-lg transition-colors duration-200"
          >
            How it works
          </Link>
        </div>

        {/* Auth Section - Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="border border-gray-200">
                <AvatarFallback className="bg-[#516cf0] text-white">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button 
                variant="outline" 
                onClick={logout}
                className="border-[#516cf0] text-[#516cf0] hover:bg-[#516cf0] hover:text-white transition-colors duration-200"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-[#516cf0] hover:bg-[#3e56d8] text-white px-6 py-2 rounded-md font-medium">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile "How it works" link - Center below for mobile */}
      <div className="md:hidden border-t mt-2 pt-2 flex justify-center">
        <Link 
          href="/how-it-works" 
          className="text-gray-700 hover:text-[#516cf0] font-medium text-sm transition-colors duration-200"
        >
          How it works
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;