import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", label, error, helperText, showPasswordToggle = false, id, ...props }, ref) => {
        const [isRevealed, setIsRevealed] = useState(false);
        const actualType = showPasswordToggle && isRevealed ? "text" : type;

        return (
            <div className="w-full space-y-1.5 text-left">
                {label && (
                    <label htmlFor={id} className="block text-xs font-medium text-foreground/80 tracking-wide">
                        {label}
                        {props.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={id}
                        type={actualType}
                        ref={ref}
                        className={cn(
                            "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors shadow-2xs",
                            "border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary",
                            error && "border-destructive focus-visible:ring-destructive",
                            showPasswordToggle && "pr-10",
                            className
                        )}
                        {...props}
                    />
                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={() => setIsRevealed(!isRevealed)}
                            tabIndex={-1}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                            aria-label={isRevealed ? "Hide password" : "Show password"}
                        >
                            {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    )}
                </div>
                {error ? (
                    <p className="text-xs text-destructive font-medium">{error}</p>
                ) : helperText ? (
                    <p className="text-xs text-muted-foreground">{helperText}</p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";
