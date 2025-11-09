// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import firebase from "firebase/compat/app";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  imageUrl?: string;
  isGoogleAccount?: boolean;
  setImageUrl?: (url: string) => void;
  setIsGoogleAccount?: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);

  useEffect(() => {
    // pasang listener Firebase; dipanggil ketika status auth berubah
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      setImageUrl(
        firebaseUser?.photoURL || "https://avatar.iran.liara.run/public"
      );
      setIsGoogleAccount(
        firebaseUser?.providerData[0].providerId === "google.com"
      );
    });

    // cleanup saat komponen unmount
    return () => unsubscribe();
  }, []);

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, loading, imageUrl, isGoogleAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook buat konsumsi context dengan safety check
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
};
