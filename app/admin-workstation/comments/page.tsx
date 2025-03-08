"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminComments() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkIfUserIsAdmin(user.email);
      } else {
        setLoading(false);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const checkIfUserIsAdmin = (userEmail: string | null) => {
    const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (userEmail && userEmail === allowedAdminEmail) {
      setIsAdmin(true);
      fetchComments();
    } else {
      setIsAdmin(false);
      router.push("/not-authorized");
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(db, "comments"));
    const commentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setComments(commentsData);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      await deleteDoc(doc(db, "comments", id));
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
   
    <div className="md:pl-[270px] w-full h-screen pt-14 pb-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-start">Komentar Pengguna</h1>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-300 rounded-lg">
              <p className="text-sm text-gray-600">{comment.email}</p>
              <p className="mt-2 text-gray-800">{comment.pesan}</p>
              <button
                onClick={() => handleDelete(comment.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada komentar.</p>
        )}
      </div>
    </div>
  );
}