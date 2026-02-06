"use client";
import { navbarLinks } from "@/constants/navbar-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import LogoLink from "./LogoLink";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-center items-center bg-background/50 backdrop-blur-sm border-b border-border border-dashed w-full h-[53px]">
      <nav className="flex justify-between items-center mx-auto px-2 md:px-4 lg:px-6 py-2 container">
        <LogoLink />
        <div className="hidden lg:flex items-center gap-2">
          {navbarLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                pathname === link.href &&
                  "bg-primary/15 text-primary duration-200 transition-colors"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
