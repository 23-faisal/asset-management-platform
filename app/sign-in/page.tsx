import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 flex items-center justify-center ">
      <Card className="max-w-md w-full shadow">
        <CardHeader className="text-center ">
          <div className="mx-auto p-2 rounded-full bg-teal-500 w-fit">
            <Package className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-teal-600">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-slate-600">
            Sign In to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <LoginForm />
          <SocialLogin />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link
            className="underline text-slate-500 hover:text-teal-500 transition ease-in-out duration-100 text-sm "
            href={"/sign-up"}
          >
            Doesn't have an account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
