import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

export async function buyClassAPI(userUid:string|undefined, classId:string){
    if (!userUid) {
      alert("User belum login!")
      return
    }
    try{
    // 🔍 Langsung ambil dokumen dengan id = classId
    const classRef = doc(db, "users", userUid, "purchasedClasses", classId);
    const classSnap = await getDoc(classRef);

    if (classSnap.exists()) {
      alert("You already purchased this class");
      return;
    }

    // 💾 Tambahkan dokumen baru dengan nama = classId
    await setDoc(classRef, {
      classId, // bisa simpan juga di field kalau mau
      purchased_date: new Date(),
    });

    alert(`Success purchased class ${classId}`);
    }catch(error){
        alert(error)
    }
}