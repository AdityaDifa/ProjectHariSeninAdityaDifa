import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
export async function getPurchasedClasses(userUid: string | undefined) {
  if (!userUid) {
    alert("User belum login!");
    return [];
  }

  try {
    const purchasedClassesRef = collection(db, "users", userUid, "purchasedClasses");
    const snapshot = await getDocs(purchasedClassesRef);

    // ubah jadi array of data
    const purchased = snapshot.docs.map((doc) => ({
      id: doc.id,          // ini classId
      ...doc.data(),       // misalnya purchased_date, dsb
    }));

    return purchased;
  } catch (error) {
    console.error("Error getting purchased classes:", error);
    return [];
  }
}

export async function refundPurchasedClass(userUid:string|undefined, classId:string){
    if(!userUid){
        return alert("user belum login")
    }

    try{
        const docRef = doc(db, "users", userUid, "purchasedClasses", classId);
        await deleteDoc(docRef)
        alert("kelas sukses dihapus")
    }catch(error){
        console.error(error)
        alert("gagal refund kelas")
    }
}