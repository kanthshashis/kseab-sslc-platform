import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KSEAB SSLC 98% Score Accelerator | Karnataka Board 2027",
  description: "Official KSEAB Karnataka SSLC 2027 Examination Prep & AI Chief Examiner Valuation Platform. Founding-4 Cohort Edition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
