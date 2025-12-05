import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 p-6 rounded-xl border bg-white shadow-sm">
        
        {/* Title */}
        <div className="space-y-1 text-center">
          <p className="text-2xl font-bold">Login to Your Account</p>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="--primary-color hover:underline">
              Create a new account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>

          <Button className="w-full  hover:bg-[#fc9b34] text-white">
            Login
          </Button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
