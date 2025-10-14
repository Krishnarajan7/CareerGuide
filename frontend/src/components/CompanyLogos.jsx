"use client";
import React from "react";

// Company logos array using public SVGs
export const companyLogos = [
  { name: "Accenture", id: 1, img: "/logos/Accenture.svg" },
  { name: "Cognizant", id: 2, img: "/logos/Cognizant_logo_2022.svg" },
  { name: "HCL", id: 3, img: "/logos/HCL_Technologies_logo.svg" },
  { name: "Infosys", id: 4, img: "/logos/Infosys_logo.svg" },
  { name: "Wipro", id: 5, img: "/logos/Wipro_Primary_Logo_Color_RGB.svg" },
  { name: "Wahmi", id: 6, img: "/logos/wahmisoft_logo.svg" },
  { name: "TCS", id: 7, img: "/logos/Tata_Consultancy_Services_old_logo.svg" },
  { name: "ZOHO", id: 8, img: "/logos/ZOHO_logo_2023.svg" },
  { name: "Lavendal", id: 9, img: "/logos/lavendel-logo-black.png" },
  { name: "Touchmark", id: 10, img: "/logos/tds-color-logo.png" },
  { name: "tds", id: 11, img: "/logos/tauras.jpg" },
  { name: "sys", id: 12, img: "/logos/sys.svg" },
  { name: "kaartech", id: 13, img: "/logos/kaartech.png" },
  { name: "Hexaware", id: 14, img: "/logos/Hexaware_new_logo.svg" },
  { name: "Halleyx", id: 15, img: "/logos/Halleyx.svg" },
  { name: "Blogvault", id: 16, img: "/logos/BlogVault.png" },
  { name: "SoftSquare", id: 17, img: "/logos/SoftSquare.svg" },
  { name: "Muthoot", id: 18, img: "/logos/Muthoot.webp" },
  { name: "Delta", id: 19, img: "/logos/Delta.svg" },
  { name: "Medplus_logo", id: 20, img: "/logos/Medplus_logo.jpg" },
  { name: "Datapattern", id: 21, img: "/logos/Datapattern.png" },
  { name: "Icanio", id: 21, img: "/logos/Icanio.svg" },
];

// Main component
export default function CompanyLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8">
      {companyLogos.map(({ id, name, img }) => (
        <div key={id} className="flex flex-col items-center space-y-3">
          {/* Even bigger uniform logo container */}
          <div className="w-40 h-40 flex items-center justify-center bg-white rounded-xl shadow-lg p-6">
            <img
              src={img}
              alt={name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="text-base font-semibold text-center">{name}</p>
        </div>
      ))}
    </div>
  );
}
