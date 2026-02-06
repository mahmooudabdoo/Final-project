"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ModeToggle({ className }: Props) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(className)}
    >
      <Image
        src="/mode-toggle.svg"
        alt="Mode Toggle"
        width={24}
        height={24}
        className="dark:invert"
      />
    </Button>
  );
}
