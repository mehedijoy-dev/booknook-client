import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <section className="page-container flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-200 p-6 shadow-sm sm:p-8">
        <h1 className="section-title text-center">Create your account</h1>
        <p className="section-subtitle mx-auto text-center">
          Join BookNook to add, borrow and return books.
        </p>
        <RegisterForm />
      </div>
    </section>
  );
}
