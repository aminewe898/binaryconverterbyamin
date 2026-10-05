import type { ComponentProps } from "react";
export function Input({className = "", ...props}: ComponentProps<"input">) {
 return <input className={`flex w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-2 focus-visible:outline-ring ${className}`} {...props} />;
}
