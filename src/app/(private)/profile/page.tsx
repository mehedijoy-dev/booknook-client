import type { Metadata } from "next";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = { title: "My Profile" };
export const instant = false;
export default function ProfilePage() {
  return (
    <section className="page-container flex flex-col items-center py-10 text-center sm:py-16">
      <h1 className="section-title">My Profile</h1>
      <p className="section-subtitle">Your BookNook account details.</p>
      <ProfileCard />
    </section>
  );
}
