import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import {create} from 'zustand'

type TUseAuthStore = {
  user: User | null
  loading: boolean
  imageUrl: string
  isGoogleAccount: boolean
  setUser: (user: User | null) => void
  setLoading: (val: boolean) => void
  setImageUrl: (url: string) => void
  setIsGoogleAccount: (val: boolean) => void
};

const useAuthStore = create<TUseAuthStore>((set)=>({
  user: null,
  loading: true,
  imageUrl: "https://avatar.iran.liara.run/public",
  isGoogleAccount: false,

  setUser: (user) => set({ user }),
  setLoading: (val) => set({ loading: val }),
  setImageUrl: (url) => set({ imageUrl: url }),
  setIsGoogleAccount: (val) => set({ isGoogleAccount: val }),
}))

onAuthStateChanged(auth, (firebaseUser) => {
  useAuthStore.getState().setUser(firebaseUser)
  useAuthStore.getState().setLoading(false)
  useAuthStore
    .getState()
    .setImageUrl(firebaseUser?.photoURL || "https://avatar.iran.liara.run/public")
  useAuthStore
    .getState()
    .setIsGoogleAccount(firebaseUser?.providerData[0]?.providerId === "google.com")
})

export default useAuthStore