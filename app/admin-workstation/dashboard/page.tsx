"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import AcaraPage from "@/pages/acaraterkini/acarapage";
import CountAcara from "@/pages/acaraterkini/countacara";
import ProdukPage from "@/pages/produkkesenian/produkpage";
import CountProduk from "@/pages/produkkesenian/countproduk";
import CountJasa from "@/pages/jasakesenian/countjasa";
import JasaPage from "@/pages/jasakesenian/jasapage";
import AdminComments from "../comments/page";


export default function Page() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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
    } else {
      setIsAdmin(false);
      router.push("/not-authorized");
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="pt-14">
      <CountAcara/>
      <AcaraPage/>
      <CountProduk/>
      <ProdukPage/>
      <CountJasa/>
      <JasaPage/>
    </div>
  );
}