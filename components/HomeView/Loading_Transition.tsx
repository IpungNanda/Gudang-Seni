"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoAnimasi from "@/public/assets/images/logo_animasi.png";

export default function LoadingTransition({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Durasi loading 2 detik
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-pulse">
          <Image src={logoAnimasi} alt="Loading" width={200} height={200} className="animate-spin-slow" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
