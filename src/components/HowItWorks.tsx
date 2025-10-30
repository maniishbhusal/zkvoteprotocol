import { Card, CardContent } from "@/components/ui/card";
import { ScanFace, Wallet, Vote, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: ScanFace,
    title: "Verify Identity",
    description: "Scan your Nepali citizenship or voter ID card. Our zkID system verifies you're a citizen without storing your personal data.",
    step: "01"
  },
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Solana wallet to receive your unique voting token. One citizen, one vote guaranteed by blockchain.",
    step: "02"
  },
  {
    icon: Vote,
    title: "Cast Your Vote",
    description: "Browse active elections and polls. Vote securely with complete anonymity while maintaining verifiable authenticity.",
    step: "03"
  },
  {
    icon: BarChart3,
    title: "View Results",
    description: "Track real-time results with complete transparency. Every vote is recorded on-chain and publicly auditable.",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to participate in the future of democratic voting
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Step number */}
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative z-10">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;