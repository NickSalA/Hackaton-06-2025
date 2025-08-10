import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Teacher",
  description: "Plataforma interactiva de aprendizaje impulsada por IA, con chat, lecciones y panel informativo.",
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
