import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileTopBar } from "@/components/layout/MobileTopBar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <MobileTopBar />
      <main id="main" className="lg:pl-[272px] pb-24 lg:pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
