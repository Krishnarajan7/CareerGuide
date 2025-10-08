"use client";
import React from "react";

// Individual SVG icons
const GoogleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" {...props}>
    <path
      fill="#4285F4"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    />
  </svg>
);

const MicrosoftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" {...props}>
    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

const AmazonIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 603 182" {...props}>
    <path
      fill="#FF9900"
      d="M374.3 141.5c-45.3 33.5-111 51.4-167.5 51.4-79.2 0-150.5-29.3-204.5-78.1-4.2-3.8-.4-9 4.6-6 58.3 33.9 130.3 54.3 204.7 54.3 50.2 0 105.4-10.4 156.3-32 7.7-3.3 14.2 5.1 6.4 10.4z"
    />
    <path
      fill="#FF9900"
      d="M388.4 125.2c-5.8-7.4-38.3-3.5-52.9-1.8-4.4.5-5.1-3.3-1.1-6.1 25.9-18.2 68.4-13 73.3-6.9 4.9 6.2-1.3 49-25.7 69.4-3.7 3.1-7.3 1.5-5.6-2.7 5.4-13.6 17.6-44 12-52z"
    />
  </svg>
);

const TextIcon = ({ bg, text, label, fontSize = "140" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <rect width="512" height="512" fill={bg} />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize={fontSize}
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      {label}
    </text>
  </svg>
);

// ✅ Export this array so it can be reused anywhere
export const companyLogos = [
  { name: "Google", id: 1, img: GoogleIcon },
  { name: "Microsoft", id: 2, img: MicrosoftIcon },
  { name: "Amazon", id: 3, img: AmazonIcon },
  { name: "TCS", id: 4, img: (p) => <TextIcon {...p} bg="#1F1F9F" label="TCS" fontSize="200" /> },
  { name: "Infosys", id: 5, img: (p) => <TextIcon {...p} bg="#007CC3" label="Infosys" /> },
  { name: "Wipro", id: 6, img: (p) => <TextIcon {...p} bg="#6200EA" label="Wipro" fontSize="150" /> },
  { name: "Cognizant", id: 7, img: (p) => <TextIcon {...p} bg="#0033A0" label="Cognizant" fontSize="100" /> },
  { name: "Accenture", id: 8, img: (p) => <TextIcon {...p} bg="#A100FF" label="Accenture" fontSize="120" /> },
  { name: "HCL", id: 9, img: (p) => <TextIcon {...p} bg="#ED1C24" label="HCL" fontSize="180" /> },
  { name: "Capgemini", id: 10, img: (p) => <TextIcon {...p} bg="#0070AD" label="Capgemini" fontSize="100" /> },
  {
    name: "IBM",
    id: 11,
    img: (p) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" {...p}>
        <rect width="1000" height="400" fill="#1F70C1" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="280"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          letterSpacing="20"
        >
          IBM
        </text>
      </svg>
    ),
  },
  { name: "Oracle", id: 12, img: (p) => <TextIcon {...p} bg="#F80000" label="Oracle" /> },
  { name: "Deloitte", id: 13, img: (p) => <TextIcon {...p} bg="#000000" label="Deloitte" fontSize="130" /> },
];

// Keep your nice display component
export default function CompanyLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-6">
      {companyLogos.map(({ id, name, img: Logo }) => (
        <div key={id} className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24">
            <Logo width="100%" height="100%" />
          </div>
          <p className="text-sm font-medium text-center">{name}</p>
        </div>
      ))}
    </div>
  );
}
