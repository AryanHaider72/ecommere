"use client";
import { useState } from "react";
import Navbar from "@/component/Navbar/page";
import LoginPage from "@/authentication/login/page";
import HomeCom from "@/component/Header/page";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/component/Footer/page";

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };
  return (
    <div className="w-full h-screen bg-gray-100">
      <Navbar onPageChange={handleNavClick} />

      <main className="">
        {activePage === "home" && <HomeCom />}
        {activePage === "login" && (
          <div className="">
            <div className="flex w-full h-screen justify-center items-center bg-gray-100">
              <div className="w-full max-w-5xl mx-4">
                <LoginPage />
              </div>
            </div>
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
}
