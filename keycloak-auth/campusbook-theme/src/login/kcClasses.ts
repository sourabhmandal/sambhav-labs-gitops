import type { ClassKey } from "keycloakify/login";

export const defaultKcClasses: { [key in ClassKey]?: string } = {
    // Layout and Form containers
    kcFormGroupClass: "space-y-1.5 text-left mb-4",
    kcFormGroupHeader: "pt-4 pb-2 border-b border-border/60 mb-3",
    kcFormGroupErrorClass: "has-error [&_input]:border-destructive [&_input]:focus-visible:ring-destructive",
    
    // Labels
    kcLabelWrapperClass: "flex items-center gap-1 text-xs font-medium text-foreground/80 tracking-wide mb-1.5",
    kcLabelClass: "block text-xs font-medium text-foreground/80 tracking-wide cursor-pointer",
    
    // Inputs & Wrappers
    kcInputWrapperClass: "relative w-full space-y-1",
    kcInputClass:
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive",
    kcTextareaClass:
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive",
    
    // Helper & Validation texts
    kcInputHelperTextBeforeClass: "block text-xs text-muted-foreground/80 leading-relaxed mb-1.5",
    kcInputHelperTextAfterClass: "block text-xs text-muted-foreground/80 leading-relaxed mt-1.5",
    kcInputErrorMessageClass: "block text-xs font-medium text-destructive mt-1.5 leading-normal",
    
    // Password Group & Visibility Toggle
    kcInputGroup: "relative flex items-center w-full [&>input]:pr-10",
    kcFormPasswordVisibilityButtonClass:
        "absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground/70 hover:text-foreground transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-r-md",
    kcFormPasswordVisibilityIconShow: "kcFormPasswordVisibilityIconShow",
    kcFormPasswordVisibilityIconHide: "kcFormPasswordVisibilityIconHide",
    
    // Checkboxes & Radios
    kcCheckClass: "flex items-center gap-2 mt-2",
    kcCheckInputClass: "rounded border-input text-primary focus:ring-ring focus:ring-offset-0 h-4 w-4 bg-background",
    kcCheckLabelClass: "text-xs font-medium text-foreground/80 cursor-pointer select-none",
    kcInputClassCheckbox: "flex items-center gap-2 mt-2",
    kcInputClassCheckboxInput: "rounded border-input text-primary focus:ring-ring focus:ring-offset-0 h-4 w-4 bg-background",
    kcInputClassCheckboxLabel: "text-xs font-medium text-foreground/80 cursor-pointer select-none",
    kcInputClassRadio: "flex items-center gap-2 mt-2",
    kcInputClassRadioInput: "border-input text-primary focus:ring-ring focus:ring-offset-0 h-4 w-4 bg-background",
    kcInputClassRadioLabel: "text-xs font-medium text-foreground/80 cursor-pointer select-none",
    
    // Buttons
    kcButtonClass:
        "inline-flex items-center justify-center font-medium rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
    kcButtonPrimaryClass: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
    kcButtonSecondaryClass: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    kcButtonDefaultClass: "border border-border bg-card hover:bg-muted/60 text-card-foreground shadow-xs",
    kcButtonBlockClass: "w-full",
    kcButtonLargeClass: "h-11 px-6 text-base"
};
