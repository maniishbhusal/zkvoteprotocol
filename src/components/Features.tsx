import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge ID",
    description: "Prove your citizenship without revealing personal information using advanced zkID technology"
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description: "Every vote is encrypted and stored on Solana's high-speed, secure blockchain"
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description: "All votes are publicly auditable while maintaining voter anonymity"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Real-time vote counting with results available immediately after polls close"
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description: "Vote from anywhere in the world as long as you're a verified Nepali citizen"
  },
  {
    icon: Users,
    title: "One Person, One Vote",
    description: "Blockchain ensures no duplicate voting and maintains democratic integrity"
  }
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Our Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology to ensure the most secure and transparent voting experience
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
