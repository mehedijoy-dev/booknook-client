"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  getPasswordErrors,
  isValidEmail,
  isValidHttpUrl,
} from "@/lib/validators";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const passwordErrors = getPasswordErrors(password);
  const showPasswordErrors = password.length > 0 && passwordErrors.length > 0;

  const fail = (message: string) => {
    setFormError(message);
    toast.error(message);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!name.trim()) return fail("Please enter your name");
    if (!isValidEmail(email)) return fail("Please enter a valid email address");
    if (!isValidHttpUrl(photo)) {
      return fail(
        "Please enter a valid photo URL that starts with http or https",
      );
    }
    if (passwordErrors.length > 0) return fail(passwordErrors[0]);

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      image: photo.trim(),
    });
    setLoading(false);

    if (error) {
      return fail(error.message ?? "Could not create your account. Try again.");
    }

    toast.success("Account created successfully! Please log in.");
    router.push("/login");
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div
            role="alert"
            className="alert alert-error text-sm rounded-xl py-3 shadow-sm"
          >
            <span>{formError}</span>
          </div>
        )}

        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/70"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Mohammad Joy"
            autoComplete="name"
            className="input input-bordered w-full rounded-xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/70"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="joymehedi890@gmail.com"
            autoComplete="email"
            className="input input-bordered w-full rounded-xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Photo URL Input */}
        <div>
          <label
            htmlFor="photo"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/70"
          >
            Photo URL
          </label>
          <input
            id="photo"
            type="url"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            placeholder="https://i.ibb.co/... or image link"
            autoComplete="photo"
            className="input input-bordered w-full rounded-xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/70"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Create a strong password"
            autoComplete="new-password"
            invalid={showPasswordErrors}
          />
          {showPasswordErrors ? (
            <ul className="mt-2 space-y-1 text-xs text-error font-medium">
              {passwordErrors.map((message) => (
                <li key={message}>• {message}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[11px] text-base-content/60 leading-relaxed">
              Must be at least 6 characters long with at least one uppercase and
              one lowercase letter.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full rounded-xl font-semibold shadow-md transition hover:scale-[1.01]"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Create Account
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6 text-xs uppercase tracking-wider text-base-content/40 font-medium">
        Or continue with
      </div>

      {/* Google Button */}
      <div className="rounded-xl overflow-hidden shadow-sm">
        <GoogleButton callbackURL="/" label="Register with Google" />
      </div>

      {/* Footer Link */}
      <p className="mt-6 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
