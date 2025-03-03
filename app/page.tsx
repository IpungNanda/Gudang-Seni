import About from "@/components/HomeView/About";
import CategorySearchBar from "@/components/HomeView/Category";
import JasaKesenian from "@/components/HomeView/Jasa_Kesenian";
import Join from "@/components/HomeView/Join";
import Acara_Terkini from "@/components/HomeView/Kegiatan_Terkini";
import Kerjasama from "@/components/HomeView/Kerjasama";
import Navbar from "@/components/HomeView/Navbar"
import Pertanyaan from "@/components/HomeView/Pertanyaan";
import ProdukKesenian from "@/components/HomeView/Produk_kesenian";

export default function Home() {
  return (
    <div >
     <Navbar/>
     <About/>
     <Acara_Terkini/>
     <div className="flex items-center justify-center mb-12">
        <CategorySearchBar />
      </div>
     <ProdukKesenian/>
     <JasaKesenian/>
     <Join/>
     <Kerjasama/>
     <Pertanyaan/>
    </div>
  );
}
