import { cn } from "@/lib/utils";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level = 1, className, children }: HeadingProps) => {
  const styles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    3: "text-2xl md:text-3xl font-semibold tracking-tight",
    4: "text-xl md:text-2xl font-semibold tracking-tight",
    5: "text-lg md:text-xl font-semibold",
    6: "text-base md:text-lg font-semibold",
  };

  const baseStyles = cn(styles[level], "text-foreground", className);

  switch (level) {
    case 1:
      return <h1 className={baseStyles}>{children}</h1>;
    case 2:
      return <h2 className={baseStyles}>{children}</h2>;
    case 3:
      return <h3 className={baseStyles}>{children}</h3>;
    case 4:
      return <h4 className={baseStyles}>{children}</h4>;
    case 5:
      return <h5 className={baseStyles}>{children}</h5>;
    case 6:
      return <h6 className={baseStyles}>{children}</h6>;
    default:
      return <h1 className={baseStyles}>{children}</h1>;
  }
};
