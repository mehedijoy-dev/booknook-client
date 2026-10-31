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

    toast.success("Account created. Please log in.");
    router.push("/login");
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
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className="input w-full"
          />
        </div>

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
          <label htmlFor="photo" className="mb-1 block text-sm font-medium">
            Photo URL
          </label>
          <input
            id="photo"
            type="url"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            placeholder="https://example.com/your-photo.jpg"
            autoComplete="photo"
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Create a password"
            autoComplete="new-password"
            invalid={showPasswordErrors}
          />
          {showPasswordErrors ? (
            <ul className="mt-2 space-y-1 text-sm text-error">
              {passwordErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-base-content/60">
              Use at least 6 characters with an uppercase and a lowercase
              letter.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Register
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">or</div>

      <GoogleButton callbackURL="/" label="Register with Google" />

      <p className="mt-6 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
