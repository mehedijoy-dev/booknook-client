import PrivateRoute from "@/components/auth/PrivateRoute";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
