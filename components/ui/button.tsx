//@ts-nocheck
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `
          bg-product-primary 
          text-button-text 
          shadow 
          hover:bg-primary-accent 
          hover:shadow-md 
          hover:text-product-foreground 
          hover:scale-[1.02]
        `,
        destructive: `
          bg-red-500 
          text-white 
          hover:bg-red-600 
          shadow-sm
        `,
        outline: `
          border border-product-border 
          bg-transparent 
          text-product-foreground 
          hover:bg-product-hover-background 
          hover:text-product-foreground-accent 
          transition-colors shadow-sm
        `,
        secondary: `
          bg-product-background 
          text-product-foreground-accent 
          border border-product-border 
          hover:bg-product-hover-background 
          hover:text-product-foreground 
          shadow-sm
        `,
        ghost: `
          text-product-foreground 
          hover:bg-product-hover-background 
          hover:text-product-foreground-accent
        `,
        success: `
          bg-green-500 
          text-white 
          hover:bg-green-600
        `,
        link: `
          text-product-secondary 
          underline-offset-4 
          hover:underline
        `,
        'primary-inverted': `
          bg-white 
          text-product-primary 
          border-2 border-product-primary 
          hover:bg-product-hover-background 
          hover:text-product-foreground 
          hover:border-primary-accent 
          shadow
        `,
        navbar: `
          text-product-foreground 
          hover:bg-navbar-button-hover-bg 
          hover:text-navbar-button-hover-text 
          hover:shadow-navbar-button-hover-shadow 
          hover:transform-navbar-button-hover-transform 
          hover:scale-navbar-button-hover-scale
          hover:font-bold
          focus:ring-2 
          focus:ring-navbar-button-focus-ring 
          focus:ring-offset-2 
          active:bg-navbar-button-active-bg 
          active:text-navbar-button-active-text 
          transition-navbar-button-transition
          border border-transparent
          hover:border-navbar-button-hover-border
        `,
        store: `
          flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit
          text-white bg-product-foreground
        `,
        'store-light': `
          flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit
          text-product-foreground bg-white
        `,
        cta: `
          w-full py-3 px-4 rounded-full font-semibold transition-all duration-300 transform overflow-hidden group/btn
          bg-product-primary hover:bg-product-primary-accent text-product-foreground shadow-lg hover:shadow-xl
        `,
        'cta-secondary': `
          w-full py-3 px-4 rounded-full font-semibold transition-all duration-300 transform overflow-hidden group/btn
          bg-hero-product-background hover:bg-product-primary text-product-foreground shadow-md hover:shadow-lg
        `,
        header: `
          text-black bg-product-primary hover:bg-product-primary-accent px-8 py-3 rounded-full transition-colors
        `,
        'header-mobile': `
          text-black bg-product-primary hover:bg-product-primary-accent px-5 py-2 rounded-full block w-fit
        `,
        contact: `
          group relative bg-product-primary hover:bg-primary-accent text-product-foreground px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-product-hover-scale hover:shadow-product-hover-shadow disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]`
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
