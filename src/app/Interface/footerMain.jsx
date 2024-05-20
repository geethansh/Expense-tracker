import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import Link from "next/link";
import Image from "next/image";


const Footer = () => {
  return (
    <footer className="border z-10 border-t-[#33353F]  border-r-transparent mt-[1rem] ">
      <div className="p-2 flex justify-between">
        <p className="text-slate-600 pl-11 pt-3">Made By Geethansh P</p>
        <Link href="https://github.com/geethansh">
            <Image src={GithubIcon} alt="Github Icon" className=" bg-black rounded-full mr-5" />
          </Link>
      </div>
      
      
    </footer>
  );
};

export default Footer;
