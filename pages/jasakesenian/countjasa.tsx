"use client";
import { useState, useEffect, JSX } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaTools } from "react-icons/fa";

export default function CountJasa() {
  const [jasaCount, setJasaCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJasaCount = async () => {
      try {
        const jasaCollection = collection(db, "services"); // Sesuaikan nama koleksi
        const jasaSnapshot = await getDocs(jasaCollection);
        console.log("Total dokumen:", jasaSnapshot.size);
        setJasaCount(jasaSnapshot.size);
      } catch (err: any) {
        console.error("Error fetching jasa data:", err);
        setError(err.message || "Gagal mengambil data jasa dari Firestore");
      } finally {
        setLoading(false);
      }
    };

    fetchJasaCount();
  }, []);

  return (
    <div className="p-5 sm:ml-[250px] sm:p-10">
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card
            title="Total Jasa"
            value={jasaCount}
            icon={<FaTools size={28} />}
            bgColor="bg-blue-100"
          />
        </div>
      )}
    </div>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  bgColor: string;
}

const Card = ({ title, value, icon, bgColor }: CardProps) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-md flex items-center space-x-4`}>
      <div className="text-blue-500">{icon}</div>
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
