import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignIn } from "@/store/auth";
import { Loader2 } from "lucide-react";

function SignInForm() {
  const [signInData, setSignInData, handelSignIn, loading] = useSignIn();
  return (
    <div className="space-y-4">
      <form onSubmit={handelSignIn} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            placeholder="Enter your email"
            id="email"
            type="email"
            disabled={loading}
            value={signInData.email}
            onChange={(e) =>
              setSignInData({ ...signInData, email: e.target.value })
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
            value={signInData.password}
            onChange={(e) =>
              setSignInData({ ...signInData, password: e.target.value })
            }
            className="bg-white/40 border-gray-200 focus:bg-white/60 transition-colors"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-colors mt-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignInForm;
