import { atom, useRecoilState } from "recoil";
import { signInService, signUpService } from "@/service";
import { useUserState, userDefault } from "../user";
import { useState } from "react";
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await signInService(signInData);
    console.log(userState);

    if (data.success) {
      setUserState({
        authenticated: true,
        user: data.data.user,
      });
    } else {
      setUserState(userDefault);
    }
    setSignInData(signInDefault);
    setLoading(false);
  };

  return [signInData, setSignInData, handleSignIn, loading];
};

export const useSignUp = () => {
  const [signUpData, setSignUpData] = useRecoilState(signUpAtom);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await signUpService(signUpData);
    setSignUpData(signUpDefault);
    setLoading(false);
  };

  return [signUpData, setSignUpData, handleSignUp, loading];
};
