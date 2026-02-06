"use client";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "../ui/drawer";
import { navbarLinks } from "@/constants/navbar-links";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <Drawer>
      <DrawerTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-start gap-1 p-4">
          {navbarLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "w-full",
                }),
                pathname === link.href &&
                  "bg-primary/15 text-primary duration-200 transition-colors"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
