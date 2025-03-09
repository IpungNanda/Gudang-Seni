import React from "react";
import Link from "next/link";
import { FiPhone, FiMail, FiInstagram } from "react-icons/fi";

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode; // Ganti JSX.Element dengan React.ReactNode
}

export default function Footer() {
  const footerLinks: { title: string; links: FooterLink[] }[] = [
    {
      title: "Kategori",
      links: [
        { name: "Seni Tari", href: "#" },
        { name: "Seni Musik", href: "#" },
        { name: "Seni Kriya", href: "#" },
      ],
    },
    {
      title: "Info GudangKita",
      links: [{ name: "Tentang GudangSeni", href: "#" }],
    },
    {
      title: "Penggunaan",
      links: [
        { name: "Cara Kerja Pembeli", href: "#about" },
        { name: "Cara Menjadi Seniman", href: "#" },
        { name: "Peraturan Pembeli", href: "#" },
        { name: "Peraturan Seniman", href: "#" },
        { name: "Kebijakan Privasi", href: "#" },
      ],
    },
    {
      title: "Layanan Pelanggan",
      links: [
        { name: "0895805399090", href: "tel:#", icon: <FiPhone /> },
        { name: "gudangseni@gmail.com", href: "#", icon: <FiMail /> },
        { name: "@gudangkita", href: "#", icon: <FiInstagram /> },
      ],
    },
  ];

  return (
    <footer
      className="bg-cover bg-center min-h-screen text-black p-10"
      style={{ backgroundImage: "url('/assets/images/bg-footer.png')" }}
    >
      <div className="container mt-28 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg">{section.title}</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              {section.links.map((link, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  {link.icon && <span>{link.icon}</span>}
                  <Link href={link.href} className="hover:underline">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="my-6 border-gray-400" />
      <p className="text-center text-gray-700">© 2025 GudangSeni | Seluruh Hak Cipta Dilindungi</p>
    </footer>
  );
}
