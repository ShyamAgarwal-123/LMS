import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignUp } from "@/store/auth";
import { Loader2 } from "lucide-react";

function SignUpForm() {
  const [signUpData, setSignUpData, handelSignUp, loading] = useSignUp();

  return (
    <div className="space-y-4">
      <form onSubmit={handelSignUp} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-700">
            Username
          </Label>
          <Input
            placeholder="Enter username"
            id="username"
            type="text"
            disabled={loading}
            value={signUpData.username}
            onChange={(e) =>
              setSignUpData({ ...signUpData, username: e.target.value })
            }
            className="bg-white/40 border-gray-200 focus:bg-white/60 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            placeholder="Enter your email"
            id="email"
            type="email"
            disabled={loading}
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
            className="bg-white/40 border-gray-200 focus:bg-white/60 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            placeholder="Enter your password"
            id="password"
            type="password"
            disabled={loading}
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
            className="bg-white/40 border-gray-200 focus:bg-white/60 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              id="role"
              type="checkbox"
              disabled={loading}
              className="h-4 w-4 rounded border-gray-200"
              checked={signUpData.role === "admin"}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  role: e.target.checked ? "admin" : "user",
                });
              }}
            />
            <Label htmlFor="role" className="text-gray-700">
              Sign up as Admin
            </Label>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-colors mt-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
