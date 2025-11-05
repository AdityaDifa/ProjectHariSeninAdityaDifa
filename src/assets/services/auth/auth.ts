import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Login dengan Google berhasil:", user);
    return user;
  } catch (error) {
    console.error("Error saat login dengan Google:", error);
    throw error;
  }
}

export async function registerWithEmail(email:string, password:string,fullName:string,phone:string, gender:string){
    try{
        // Create account with email and password
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
 // Update Firebase Auth profile with displayName
    await updateProfile(user, { displayName: fullName });
    // Save user additional data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      phoneNumber: phone,
      gender:gender,
      photoURL: null,
      createdAt: new Date(),
    });

    console.log("Register email sukses:", user);
    return user;
    }catch(error){
        if(error === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
            return alert("email already in use")
        }
        console.error("Error saat register:", error);
        throw error;
    }
}
