import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <section className="page-container flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-200 p-6 shadow-sm sm:p-8">
        <h1 className="section-title text-center">Welcome back</h1>
        <p className="section-subtitle mx-auto text-center">
          Log in to add, borrow and return books.
        </p>
        <Suspense
          fallback={
            <div className="mt-10 flex justify-center">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
