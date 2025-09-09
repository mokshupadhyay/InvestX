import * as React from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.ComponentProps<"input"> {
    label?: string
    error?: string
    helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || React.useId()

        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                        {label}
                    </Label>
                )}
                <Input
                    id={inputId}
                    className={cn(
                        error && "border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        )
    }
)

FormInput.displayName = "FormInput"

export { FormInput }
