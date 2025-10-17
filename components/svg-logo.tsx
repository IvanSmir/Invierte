// components/svg-logo.tsx
import * as React from "react";

type SVGLogoProps = React.SVGProps<SVGSVGElement>;

const SVGLogo: React.FC<SVGLogoProps> = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 150 130"
    // Clave: escalar con el texto
    className={`inline-block h-[1em] w-auto align-[.05em] ${className}`}
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
    {...props}
  >
    <rect x={10} y={10} width={45} height={30} fill="white" stroke="black" strokeWidth={3} />
    <rect x={59} y={10} width={70} height={30} fill="#0B6617" stroke="black" strokeWidth={3} />
    <rect x={10} y={47} width={45} height={30} fill="#0B6617" stroke="black" strokeWidth={3} />
    <rect x={59} y={47} width={55} height={30} fill="white" stroke="black" strokeWidth={3} />
    <rect x={10} y={84} width={45} height={30} fill="white" stroke="black" strokeWidth={3} />
    <rect x={59} y={84} width={70} height={30} fill="#0B6617" stroke="black" strokeWidth={3} />
  </svg>
);

export default SVGLogo;
