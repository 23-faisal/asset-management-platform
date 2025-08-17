"use client";

import { Menu, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ThemeToggle from "@/components/layout/ToggleTheme";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const adminUser = user?.role === "admin";
  const activeClass = "text-teal-500";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    toast("Signed Out successfully");
  };

  return (
    <div className="top-0 right-0 left-0 sticky z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b   dark:border-gray-700 rounded-xl mb-4 ">
      <nav className=" h-16 flex items-center justify-between px-4  ">
        <div>
          <Package
            onClick={() => router.push("/")}
            className="h-8 w-8 text-teal-500 cursor-pointer"
          />
        </div>

        <div className="text-sm font-medium  flex items-center gap-6">
          <Link
            href={"/gallery"}
            className={`${
              pathname === "/gallery" && activeClass
            }    hover:text-teal-600 transition ease-in-out duration-100`}
          >
            Gallery
          </Link>

          {!isPending && user && !adminUser && (
            <>
              <Link
                href={"/dashboard/assets"}
                className={`${
                  pathname === "/dashboard/assets" && activeClass
                }    hover:text-teal-600 transition ease-in-out duration-100`}
              >
                Assets
              </Link>
              <Link
                href={"/dashboard/purchase"}
                className={`${
                  pathname === "/dashboard/purchase" && activeClass
                }    hover:text-teal-600 transition ease-in-out duration-100`}
              >
                My Purchases
              </Link>
            </>
          )}

          {!isPending && user && adminUser && (
            <div className="space-x-6 ">
              <Link
                href={"/admin/asset-approval"}
                className={`${
                  pathname === "/admin/asset-approval" && activeClass
                }    hover:text-teal-600 transition ease-in-out duration-100`}
              >
                Asset Approval
              </Link>{" "}
              <Link
                href={"/admin/settings"}
                className={`${
                  pathname === "/admin/settings" && activeClass
                }    hover:text-teal-600 transition ease-in-out duration-100`}
              >
                Settings
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isPending && adminUser && <Badge>admin</Badge>}

          {!isPending && user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8">
                    {user?.image ? (
                      <>
                        <AvatarImage src={user?.image} alt={user?.name} />
                      </>
                    ) : (
                      <AvatarFallback>
                        {user?.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 px-4">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-semibold text-lg uppercase">
                        {user.name}
                      </h1>
                      <p className="text-md text-slate-600">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />{" "}
                  <Button
                    className="w-full my-4"
                    variant={"destructive"}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
