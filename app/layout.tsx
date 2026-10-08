import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { FrotaProvider } from "@/context/FrotaContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Checklist de Revisão Veicular",
  description: "Checklist diário de revisão da frota antes da saída dos veículos",
};

// Roda antes da primeira pintura para a tela não piscar no tema errado.
// Sem escolha salva, segue a preferência do sistema.
const scriptTema = `(function(){try{var t=localStorage.getItem("tema");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // o script abaixo adiciona a classe "dark" antes da hidratação
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="min-h-full flex flex-col">
        <FrotaProvider>
          <Header />
          {children}
        </FrotaProvider>
      </body>
    </html>
  );
}
