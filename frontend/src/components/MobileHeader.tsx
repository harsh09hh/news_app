// MobileHeader.tsx
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileHeader() {
  const { setOpen } = useSidebar();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 border-b bg-white z-40">
      <button onClick={() => setOpen(true)} className="p-2 rounded-md border">
        <Menu />
      </button>

      <h1 className="mx-auto font-bold">The Daily Draft</h1>
    </header>
  );
}
