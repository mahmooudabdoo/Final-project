import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
  side: "left" | "right";
};

const ServiceSection = ({
  title,
  description,
  cta,
  ctaLink,
  image,
  side,
}: Props) => {
  const isLeft = side === "left";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20" id="service-section">
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            !isLeft && "lg:grid-flow-col-dense"
          )}
        >
          {/* Content */}
          <div className={cn("space-y-8", !isLeft && "lg:col-start-2")}>
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles className="mr-2 w-4 h-4 text-primary" />
              <span className="font-medium text-primary text-sm">
                Featured Service
              </span>
            </Badge>

            <h2 className="font-bold text-primary text-4xl sm:text-5xl lg:text-6xl leading-tight">
              {title}
            </h2>

            <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <Link
              href={ctaLink}
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <Zap className="mr-2 w-5 h-5" />
              {cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <div className="bg-green-500 rounded-full w-2 h-2" />
                <span>Trusted by 10K+ users</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <div className="bg-blue-500 rounded-full w-2 h-2" />
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={cn(!isLeft && "lg:col-start-1")}>
            <Card className="shadow-lg p-2 rounded-2xl">
              <div className="rounded-xl overflow-hidden">
                <Image
                  width={600}
                  height={400}
                  src={image}
                  alt={title}
                  className="rounded-xl w-full h-auto object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
