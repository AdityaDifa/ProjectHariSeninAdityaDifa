import { createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc,getDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth/web-extension";

const googleProvider = new GoogleAuthProvider();


export async function loginWithEmail(email: string, password: string) {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential;
  }catch(error){
    console.error("failed to login with email:",error)
    throw error
  }
}

export async function loginOrRegisterWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userRef = doc(db,"users",user.uid)
    const userSnap = await getDoc(userRef)
    
    //if database not exist, add the data to database
    if(!userSnap.exists()){
      //user baru -> register
      console.log("registering new user")
      await setDoc(userRef,{
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
        phoneNumber: "",
        gender:"",
        photoURL: null,
        createdAt: new Date(),
      })
    }

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
    return result;
    }catch(error){
        if(error === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
            return alert("email already in use")
        }
        console.error("Error saat register:", error);
        throw error;
    }
}

export async function updateAccountProfile(newName:string, newGender?:string, newPhoneNumber?:string, email?:string, newPassword?:string, oldPassword?:string){
  const user = auth.currentUser
  console.log(user)

  if(!user){
    console.log("user not found")
    return
  }
  
  try{
    const userRef = doc(db, "users", user.uid)
    
    if(user.providerData[0].providerId === "google.com"){ //if using google account
      const newData:object = {fullName: newName}

      await updateDoc(userRef,newData)
      await updateProfile(user, newData)

    }else{ //if using native email instead
    try{
      const credential = EmailAuthProvider.credential(email!, oldPassword!)
      await reauthenticateWithCredential(user, credential)

      await updateDoc(userRef, {
      fullName:newName,
      password:newPassword,
      gender:newGender,
      phoneNumber:newPhoneNumber
    })

      if(newPassword !== oldPassword){
        await updatePassword(user, newPassword!)
      }
    }catch(error){
      console.log(error)
    }
    
    }
  }catch(error){
    console.error(error)
  }

}

export async function checkAccountIsGoogle():Promise<boolean>{
  const user = auth.currentUser;
  if (!user) return false;

  const providerId = user.providerData[0]?.providerId;
  return providerId === "google.com";
}

export async function sendImagePicture(){
  const user = auth.currentUser;
  const imageProfilePicture = user?.photoURL ?? ""
  return imageProfilePicture
}

export async function getIdUser(){
  const user = auth.currentUser
  console.log(user)
}