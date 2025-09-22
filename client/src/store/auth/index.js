import { atom, useRecoilState } from "recoil";
import { signInService, signUpService } from "@/service";
import { useUserState, userDefault } from "../user";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
export const signInDefault = {
  email: "",
  password: "",
};

export const signInAtom = atom({
  key: "signInAtom",
  default: signInDefault,
});

export const signUpDefault = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

export const signUpAtom = atom({
  key: "signUpAtom",
  default: signUpDefault,
});

export const useSignIn = () => {
  const [signInData, setSignInData] = useRecoilState(signInAtom);
  const [userState, setUserState] = useUserState();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signInService(signInData);
      console.log(userState);

      if (data.success) {
        setUserState({
          authenticated: true,
          user: data.data.user,
        });

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
          variant: "success",
        });
      } else {
        setUserState(userDefault);

        toast({
          title: "Sign In Failed",
          description:
            data.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setUserState(userDefault);

      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setSignInData(signInDefault);
    setLoading(false);
  };

  return [signInData, setSignInData, handleSignIn, loading];
};

export const useSignUp = () => {
  const [signUpData, setSignUpData] = useRecoilState(signUpAtom);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signUpService(signUpData);

      if (data.success) {
        toast({
          title: "Account Created!",
          description:
            "Your account has been created successfully. You can now sign in.",
          variant: "success",
        });
      } else {
        toast({
          title: "Sign Up Failed",
          description:
            data.message || "Failed to create account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setSignUpData(signUpDefault);
    setLoading(false);
  };

  return [signUpData, setSignUpData, handleSignUp, loading];
};
