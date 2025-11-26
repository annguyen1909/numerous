import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4BFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105",
        destructive: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
        outline: "border border-[#3f3f46]/40 bg-transparent hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]",
        secondary: "bg-linear-to-r from-[#FFAC33] to-[#FFC966] text-[#2D1B69] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105",
        ghost: "hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]",
        link: "text-[#6B4BFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
