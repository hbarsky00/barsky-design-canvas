
// Completely disabled tooltip components to prevent React context issues
export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipContent = () => null;
export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
