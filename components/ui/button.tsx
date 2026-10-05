import type { ComponentProps } from "react";
type Props = ComponentProps<"button"> & { variant?: "default" | "outline" | "ghost"; size?: "default" | "sm" };
export function Button({ className = "", variant = "default", size = "default", type = "button", ...props }: Props) {
 const style = variant === "outline" ? "border border-input bg-background" : variant === "ghost" ? "hover:bg-accent/10" : "bg-primary text-primary-foreground";
 return <button type={type} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50 disabled:pointer-events-none ${size === "sm" ? "h-8 px-3" : "h-10 px-4"} ${style} ${className}`} {...props} />;
}
