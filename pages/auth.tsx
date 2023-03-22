import { signIn, getSession } from "next-auth/react";
import { Input } from "../components/Input";
import React, { useCallback } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { NextPageContext } from "next";
import { Session } from "next-auth";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/profiles",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

type AuthType = {
  session: Session | null;
};

export default function Auth({ session }: AuthType) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [variant, setVariant] = React.useState<"login" | "signup">("login");
  const toggleVariant = useCallback(() => {
    setVariant(prev => (prev === "login" ? "signup" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles"
      });
    } catch (err: any) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name
        })
      }).then(res => res.json());
      await login();
    } catch (err) {
      console.log(err);
    }
  }, [email, password, name, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className=" px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12 w-fit" />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black  bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg lg:max-w-md  rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Sign Up"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                value={email}
                onchange={e => setEmail(e.target.value)}
              />

              {variant === "signup" && (
                <Input
                  id="name"
                  label="Username"
                  value={name}
                  onchange={e => setName(e.target.value)}
                />
              )}

              <Input
                id="password"
                label="Password"
                value={password}
                onchange={e => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <button
              className="bg-red-600 text-white py-3 mt-10 w-full  rounded-md hover:bg-red-700 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-50
                  transition
                "
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-50
                  transition
                "
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12 text-center">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <a
                href="#"
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Sign Up" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
