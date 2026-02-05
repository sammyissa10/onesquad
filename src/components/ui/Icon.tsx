import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export type IconName = keyof typeof Icons;

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = Icons[name as IconName] as React.ComponentType<LucideProps> | undefined;

  if (!IconComponent) {
    return <Icons.Star {...props} />;
  }

  return <IconComponent {...props} />;
}
