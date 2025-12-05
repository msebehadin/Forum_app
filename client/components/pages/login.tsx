import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {loginSchema,LoginInput} from '@/schema/auth'
import {api} from '@/libs/axios'
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ZodObject, ZodString } from "zod";
import { $strip } from "zod/v4/core";

export default function LoginPage() {
  const router=useRouter();
  const {login}=useAuthStore();
    const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
const onSubmit=async (value:LoginInput)=>{
  try {
    const res=await api.post('/auth/login',value)
    const data=res.data;
    if(!data?.token || !data?.user){
      setError('email',{message:'invalid server response'})
    return;

    }
    login({token:data.token,user:data.user})
    router.push('/questions')
  } catch (err:any) {
    const msg=err?
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 to-white">
      <div className="w-full max-w-md space-y-8">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
          
          {/* Title + Register */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Login to your account
            </h1>

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#fe8402] hover:text-[#fc9b34] underline underline-offset-4"
              >
                create a new account
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">

            {/* Username / Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>

              <Input
                id="email"
                type="text"
                placeholder="msebehadin"
                defaultValue="msebehadin"
                className="
                  h-12 
                  bg-yellow-50 
                  border-yellow-200
                  placeholder:text-gray-600
                  focus-visible:ring-2 
                  focus-visible:[#fc9b34]
                "
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="
                  h-12 
                  bg-yellow-50 
                  border-yellow-200
                  focus-visible:ring-2 
                  focus-visible:#fc9b34
                "
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end text-sm">
              <Link
                href="/forgot-password"
                className="text-[#fc9b34] hover:text-[#ce781d] underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="
                w-full 
                h-12 
                text-lg 
                font-semibold 
                bg-blue-600 
                hover:bg-blue-700 
                text-white
                rounded-lg
              "
            >
              Login
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
function zodResolver(loginSchema: ZodObject<{ email: ZodString; password: ZodString; }, $strip>): import("react-hook-form").Resolver<{ email: string; password: string; }, any, { email: string; password: string; }> | undefined {
  throw new Error("Function not implemented.");
}

