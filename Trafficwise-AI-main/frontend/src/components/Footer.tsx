import { Text } from "@/components/Text";

const footerLinks = {
  Product: ["Features", "Pricing", "Documentation", "API"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Compliance"],
};

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold text-sm">TW</span>
              </div>
              <span className="font-semibold">TrafficWise AI</span>
            </div>
            <Text variant="muted">
              Transforming urban mobility with intelligent traffic solutions.
            </Text>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t">
          <Text variant="muted" className="text-center">
            © {new Date().getFullYear()} TrafficWise AI. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};
