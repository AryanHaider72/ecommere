"use client";
import { useState } from "react";
import Navbar from "@/component/Navbar/page";
import LoginPage from "@/authentication/login/page";
import HomeCom from "@/component/Header/page";

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };
  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <Navbar onPageChange={handleNavClick} />

      <main className="p-4">
        {activePage === "home" && <HomeCom />}

        {activePage === "login" && <LoginPage />}
      </main>
    </div>
  );
}
