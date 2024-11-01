import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href={"/"} className="md:flex-1">
        <Image
          src={"/assets/icons/logo.svg"}
          alt="Logo with name"
          height={120}
          width={120}
          className="hidden md:block"
        />
        <Image
          src={"/assets/icons/logo.svg"}
          alt="Logo with name"
          height={82}
          width={82}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
