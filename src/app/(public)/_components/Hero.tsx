import { Particles } from "@/components/magicui/particles";
import AiChatDialog from "@/components/shared/ai-chat/AiChatDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Telescope } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-primary/5 p-2 h-[calc(100vh-53px)]">
      <div className="flex justify-center items-center mx-auto h-full container">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Your{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary to-foreground text-transparent">
              AI Medical Assistant
            </span>
            <br />
            Fast, Reliable, and Always Available
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-sm md:text-base text-center">
            Revolutionize your health journey with AI-powered diagnostics. From
            skin and eyes to brain scans and lab results, our smart platform
            delivers instant medical insights—anytime, anywhere.
          </p>
          <div className="flex lg:flex-row flex-col justify-center items-center gap-2 mt-4">
            <Link
              href="#service-section"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Telescope /> Start a Diagnosis Now
            </Link>
            <AiChatDialog>
              <Button size="lg" variant="outline">
                <Bot/>
                Chat with AI Consultant
              </Button>
            </AiChatDialog>
          </div>
        </div>
      </div>

      <Particles
        className="z-0 absolute inset-0"
        quantity={110}
        ease={100}
        size={1}
        color="#2b7fff"
        refresh
      />
    </section>
  );
};

export default Hero;
