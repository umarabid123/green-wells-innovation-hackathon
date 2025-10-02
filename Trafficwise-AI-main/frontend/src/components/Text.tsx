import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "muted" | "small" | "large";
  children: React.ReactNode;
}

export const Text = ({ variant = "default", className, children, ...props }: TextProps) => {
  const styles = {
    default: "text-base leading-7",
    muted: "text-sm text-muted-foreground leading-6",
    small: "text-sm leading-6",
    large: "text-lg leading-8",
  };

  return (
    <p className={cn(styles[variant], className)} {...props}>
      {children}
    </p>
  );
};
