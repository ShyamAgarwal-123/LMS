import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SignInForm, SignUpForm } from "@/components/form";
import { motion } from "framer-motion";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-400 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Please sign in to continue your journey
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6"
        >
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={(e) => setActiveTab(e)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "signin" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
