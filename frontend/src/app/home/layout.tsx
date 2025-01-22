// src/app/home/layout.tsx
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Bem-vindo | Rainer Portfolio",
  description:
    "Explore o portfólio de Rainer Teixeira, com destaque para habilidades em TI, tecnologia e inovação.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SpeedInsights />
      <header className="home-header">
        <h1>Bem-vindo ao Portfólio de Rainer Teixeira</h1>
      </header>
      <div>{children}</div>
    </section>
  );
}
