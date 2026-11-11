import React from "react";
import { BookOpen } from "lucide-react";

export interface HeaderProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    realmName?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, realmName }) => {
    return (
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs mb-1">
                <BookOpen className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
                <div className="text-xs font-semibold tracking-wider uppercase text-primary/80">
                    {realmName || "CampusBook"}
                </div>
                {title && (
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground text-balance max-w-xs mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};
