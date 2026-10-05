import type { ComponentProps } from "react";
export function Card({className = "", ...props}: ComponentProps<"div">) {
 return <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`} {...props} />;
}
