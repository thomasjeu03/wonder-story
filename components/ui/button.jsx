import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center backdrop-blur-sm whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-lg hover:bg-foreground/90 outline-dashed outline-1 outline-gray-500 -outline-offset-4 hover:outline-gray-800",
        destructive:
          "bg-destructive/30 outline-dashed outline-1 outline-destructive -outline-offset-4 text-red-300 shadow-lg hover:bg-destructive/50",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 outline-dashed outline-1 outline-gray-600 -outline-offset-4 hover:outline-gray-600",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "rounded-xs px-2 py-2 text-xs gap-1",
        default: "px-3 py-3 font-semibold",
        lg: "rounded-lg px-4 py-4 text-lg font-semibold gap-3",
        icon: "rounded-xs h-[36px] px-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
