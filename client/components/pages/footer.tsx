import Image from 'next/image'
import Link from 'next/link';
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* First Column - Logo and Social Media */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="mb-6">
              <Image 
                src='/evangadi-logo-header-.png' 
                alt='evangadi logo'
                width={180}
                height={50}
                className="h-auto"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link 
                href="#" 
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <CiFacebook size={24} />
              </Link>
              <Link 
                href="#" 
                className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <CiInstagram size={24} />
              </Link>
              <Link 
                href="#" 
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Second Column - Useful Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              Useful Links
            </h2>
            <div className="flex flex-col gap-3">
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                How it works
              </Link>
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Terms of service
              </Link>
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Third Column - Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              Contact Info
            </h2>
            <div className="flex flex-col gap-3">
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Evangadi Networks
              </Link>
              <Link 
                href="mailto:support@evangadi.com" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                support@evangadi.com
              </Link>
              <Link 
                href="tel:+1-202-386-2702" 
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                +1-202-386-2702
              </Link>
            </div>
          </div>

        </div>
        
        {/* Copyright/Bottom section */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Evangadi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer