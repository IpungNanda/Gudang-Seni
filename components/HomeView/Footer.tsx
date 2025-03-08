import React from "react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
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
      links: [{ name: "Tentang GudangKita", href: "#" }],
    },
    {
      title: "Penggunaan",
      links: [
        { name: "Cara Kerja Pembeli", href: "#" },
        { name: "Cara Menjadi Seniman", href: "#" },
        { name: "Peraturan Pembeli", href: "#" },
        { name: "Peraturan Seniman", href: "#" },
        { name: "Kebijakan Privasi", href: "#" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { name: "📞 0895805399090", href: "tel:#" },
        { name: "📧 gudangseni@gmail.com", href: "#" },
        { name: "📸 @gudangkita", href: "#" },
      ],
    },
  ];

  return (
    <footer
      className="bg-cover bg-center min-h-screen text-black p-10"
      style={{ backgroundImage: "url('/assets/images/bg-footer.png')" }}
    >
      <div className="container mt-32 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg">{section.title}</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:underline">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}