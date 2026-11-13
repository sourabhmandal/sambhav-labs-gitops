import React from "react";
import { cn } from "../lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export interface AlertProps {
    type?: "error" | "success" | "warning" | "info";
    message: string;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = "info", message, className }) => {
    if (!message) return null;

    const styles = {
        error: "bg-destructive/10 text-destructive border-destructive/20",
        success:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        info: "bg-primary/10 text-primary border-primary/20"
    };

    const icons = {
        error: <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />,
        success: <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />,
        warning: <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />,
        info: <Info className="h-4 w-4 shrink-0 mt-0.5" />
    };

    return (
        <div
            role="alert"
            className={cn(
                "flex items-start gap-2.5 p-3 rounded-lg border text-xs font-medium leading-relaxed my-3",
                styles[type],
                className
            )}
        >
            {icons[type]}
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    );
};
