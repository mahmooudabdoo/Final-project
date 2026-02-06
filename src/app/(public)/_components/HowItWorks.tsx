import { UploadCloud, Cpu, LineChart } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Medical Data",
    description:
      "Whether it's a photo, scan, or lab report, just upload it securely through our platform.",
    icon: UploadCloud,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
  {
    number: "02",
    title: "Let the AI Analyze",
    description:
      "Our models instantly process the information and check for abnormalities or known patterns.",
    icon: Cpu,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
  {
    number: "03",
    title: "Get Actionable Results",
    description:
      "Receive a clear, medically-informed summary and advice on the next steps.",
    icon: LineChart,
    gradient: "from-primary/20 via-primary/20 to-primary/20",
    glowColor: "shadow-primary/30",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl">
        <div className="relative mb-16 text-center">
          {/* Main heading with gradient text */}
          <h2 className="z-10 relative mb-2 font-bold text-4xl">
            Why Choose <span className="text-primary">ScanDx</span>
          </h2>

          <p className="mx-auto max-w-3xl text-muted-foreground text-lg leading-relaxed">
            Our streamlined process makes it easy to get the insights you need,
            without the complexity. Three simple steps to medical clarity.
          </p>
        </div>

        <div className="relative">
          {/* Dynamic connecting line with animation */}
          <div className="hidden lg:block top-24 sm:top-28 left-0 absolute w-full h-0.5">
            <div className="relative bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full h-full overflow-hidden">
              <div
                className="left-0 absolute inset-y-0 bg-gradient-to-r from-primary/60 to-transparent w-8 animate-pulse"
                style={{
                  animation: "flow 3s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl scale-110 ${step.glowColor}`}
                />

                {/* Main card */}
                <div className="relative bg-white/70 dark:bg-slate-900/70 shadow-xl hover:shadow-2xl backdrop-blur-sm p-8 border border-white/20 dark:border-slate-800/20 group-hover:border-primary/30 rounded-3xl group-hover:scale-105 transition-all duration-500">
                  {/* Step number with pulsing animation */}
                  <div className="relative mb-6">
                    <div className="relative flex justify-center items-center bg-gradient-to-br from-primary/20 to-primary mx-auto rounded-2xl w-16 sm:w-18 h-16 sm:h-18 overflow-hidden group-hover:scale-110 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent" />
                      <span className="z-10 relative font-bold text-white text-xl sm:text-2xl">
                        {step.number}
                      </span>
                      {/* Animated ring */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-primary/30 rounded-2xl scale-110 group-hover:scale-125 transition-all duration-700" />
                    </div>
                  </div>

                  {/* Icon with floating animation */}
                  <div className="relative mb-6">
                    <div className="relative flex justify-center items-center bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-200 dark:to-slate-700 mx-auto rounded-2xl w-24 h-24 overflow-hidden group-hover:rotate-6 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <step.icon className="z-10 relative w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />

                      {/* Floating particles effect */}
                      <div className="top-2 right-2 absolute bg-primary/40 opacity-0 group-hover:opacity-100 rounded-full w-1 h-1 transition-opacity group-hover:animate-ping duration-300" />
                      <div
                        className="bottom-3 left-3 absolute bg-primary/60 opacity-0 group-hover:opacity-100 rounded-full w-1 h-1 transition-opacity group-hover:animate-ping duration-300"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  </div>

                  {/* Content with enhanced typography */}
                  <div className="space-y-4 text-center">
                    <h3 className="font-bold group-hover:text-primary text-xl sm:text-2xl leading-tight transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-muted-foreground text-sm leading-relaxed transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Step indicator line for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden -bottom-4 left-1/2 absolute bg-gradient-to-b from-primary/30 to-transparent w-0.5 h-8 -translate-x-1/2 transform" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
