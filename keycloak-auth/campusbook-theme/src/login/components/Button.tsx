import React from "react";
import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "secondary" | "ghost" | "destructive" | "link";
    size?: "sm" | "default" | "lg";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
            outline: "border border-border bg-card hover:bg-muted/60 text-card-foreground shadow-xs",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-muted text-foreground",
            destructive: "bg-destructive text-destructive-foreground hover:opacity-90 shadow-sm",
            link: "text-primary underline-offset-4 hover:underline p-0 h-auto"
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            default: "h-10 px-4 py-2",
            lg: "h-11 px-6 text-base"
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
