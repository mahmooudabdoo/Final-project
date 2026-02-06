import { Card } from "@/components/ui/card";
import { whyChooseUs } from "@/constants/why-choose-us";
import { cn } from "@/lib/utils";

const WhyUS = () => {
  return (
    <section className="mx-auto max-w-7xl py-16 overflow-hidden">
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl font-bold mb-2 relative z-10">
          Why Choose <span className="text-primary">ScanDx</span>
        </h2>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered diagnostic platform combines cutting-edge technology
          with clinical expertise to deliver fast, accurate insights you can
          trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {whyChooseUs.map((item, index) => (
          <Card
            key={item.title}
            className={cn(
              "relative p-6 hover:shadow-xl group transition-all overflow-hidden duration-300 border-muted/50 hover:border-primary/50",
              "hover:-translate-y-1"
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="absolute -top-5 -right-5 bg-primary/5 group-hover:bg-primary/10 duration-500 transition-all w-32 h-32 rounded-full blur-2xl" />

            <div className="bg-muted/30 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
              <item.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyUS;
