import config from "@config/config.json";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { logo_text, title } = config.site;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link 
      href="/" 
      className="navbar-brand block font-secondary font-bold text-xl md:text-2xl tracking-tight text-dark dark:text-white hover:text-primary transition-colors duration-200"
    >
      {/* Dynamic textual logo based on config.json logo_text */}
      {mounted ? logo_text || title : "Ali Hamdan"}
    </Link>
  );
};

export default Logo;