import { cn } from './Button';

const Card = ({ className, children, hover = true, ...props }) => {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300",
                hover && "hover:shadow-md hover:-translate-y-1 hover:border-slate-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ className, children, ...props }) => (
    <div className={cn("p-6 pb-4", className)} {...props}>
        {children}
    </div>
);

const CardTitle = ({ className, children, ...props }) => (
    <h3 className={cn("text-xl font-bold text-slate-900 leading-tight", className)} {...props}>
        {children}
    </h3>
);

const CardContent = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props}>
        {children}
    </div>
);

const CardFooter = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>
        {children}
    </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
