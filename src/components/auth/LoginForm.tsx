"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";
import { getSafeRedirect } from "@/lib/redirect";
import { isValidEmail } from "@/lib/validators";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const { user, loading: sessionLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // A logged in user does not need the login page
  useEffect(() => {
    if (!sessionLoading && user) {
      router.replace(redirectTo);
    }
  }, [sessionLoading, user, router, redirectTo]);

  const fail = (message: string) => {
    setFormError(message);
    toast.error(message);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!isValidEmail(email)) return fail("Please enter a valid email address");
    if (!password) return fail("Please enter your password");

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      return fail(error.message ?? "Login failed. Please try again.");
    }

    toast.success("Welcome back to BookNook");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            <span>{formError}</span>
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="input w-full"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={() =>
                toast("Password reset is not available yet. It is coming soon.")
              }
              className="text-sm text-primary hover:underline"
            >
              Forget Password?
            </button>
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">or</div>

      <GoogleButton callbackURL={redirectTo} label="Continue with Google" />

      <p className="mt-6 text-center text-sm text-base-content/70">
        New to BookNook?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
