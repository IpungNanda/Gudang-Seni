'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  { question: 'Apa itu GudangSeni?', answer: 'SeniKita adalah platform untuk...' },
  { question: 'Bagaimana cara membuat akun di GudangSeni?', answer: 'Anda bisa mendaftar dengan...' },
  { question: 'Apa jenis produk dan jasa yang tersedia di GudangSeni?', answer: 'SeniKita menyediakan berbagai produk...' },
  { question: 'Bagaimana cara melakukan pembayaran di GudangSeni?', answer: 'Pembayaran dapat dilakukan melalui...' }
];

export default function Pertanyaan() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 p-8 mx-6">
      <div className="w-full lg:w-1/2 ">
        <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-3 ">Pertanyaan Yang Sering Ditanyakan</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b py-2 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center text-lg font-medium">
                {faq.question}
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openIndex === index && (
                <motion.p
                  className="text-gray-600 mt-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image src="/assets/images/pertanyaan_tari.png" alt="Tari" width={300} height={300} />
      </div>
    </div>
  );
}
