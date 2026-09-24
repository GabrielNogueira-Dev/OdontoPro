"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "#profissionais", label: "Profissionais" },
];

const NavLinks = ({ closeMenu }: { closeMenu?: () => void }) => (
  <>
    {navItems.map((item) => (
      <Button
        key={item.href}
        asChild
        onClick={closeMenu}
        className="bg-transparent hover:bg-transparent text-black shadow-none"
      >
        <Link href={item.href}>{item.label}</Link>
      </Button>
    ))}
  </>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-999 py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-zinc-900 text-3xl"
        >
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
            <NavLinks closeMenu={() => setIsOpen(false)} />
        </nav>


        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden cursor-pointer">
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-60 sm:w-64 z-9999 transition-all duration-100 ease-in"
          >
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader />

            <SheetDescription>
              Veja nossos links
            </SheetDescription>

            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks closeMenu={() => setIsOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
