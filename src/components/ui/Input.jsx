import { forwardRef } from 'react';
import { cn } from './Button';

const Input = forwardRef(({ className, label, error, id, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                ref={ref}
                className={cn(
                    "flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-shadow",
                    error && "border-red-500 focus:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export { Input };
