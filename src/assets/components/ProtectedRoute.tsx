import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    //if not login
    return <Navigate to="/login" />;
  }

  //if already login
  return children;
}
