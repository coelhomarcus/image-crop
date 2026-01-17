import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
