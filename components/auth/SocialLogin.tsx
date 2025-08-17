"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const continueWithGoogle = async () => {
    setIsLoading(false);
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const continueWithGithub = async () => {
    setIsLoading(false);
    try {
      await authClient.signIn.social({
        provider: "github",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 flex gap-2 w-full">
      <Button
        disabled={isLoading}
        onClick={continueWithGoogle}
        className="font-semibold  flex-1"
        variant={"outline"}
      >
        Continue With Google
      </Button>

      <Button
        disabled={isLoading}
        onClick={continueWithGithub}
        className="font-semibold  flex-1  "
        variant={"outline"}
      >
        Continue With Github
      </Button>
    </div>
  );
};

export default SocialLogin;
