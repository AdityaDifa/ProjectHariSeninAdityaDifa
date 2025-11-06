import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

type TCard = {
  id:string;
  title: string;
  desc: string;
  mentorName: string;
  mentorJob: string;
  jobPlace: string;
  rating: number;
  voters: number;
  price: number;
  category?: string;
};

export async function fetchAllClass(){
    try{
        const classColection = collection(db, "classes")
        const querySnapshot =  await getDocs(classColection)
        const classList = querySnapshot.docs.map((doc) => ({
        id: doc.id,        // Tambahkan ID dokumen untuk keperluan frontend
        ...doc.data(),     // Spread semua field yang ada di dokumen
    }))
        return classList as TCard[];
    }catch(error){
        throw error
    }
}