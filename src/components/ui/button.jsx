import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        neon: 'bg-neon text-void font-semibold hover:shadow-[0_0_35px_-6px_var(--color-neon)] hover:-translate-y-0.5',
        outline:
          'border border-neon/50 bg-void/85 backdrop-blur-md text-neon font-medium hover:bg-neon/20 hover:border-neon hover:shadow-[0_0_25px_-8px_var(--color-neon)] hover:-translate-y-0.5',
        glass:
          'border border-slate-400/25 bg-void/85 backdrop-blur-md text-slate-100 hover:text-neon hover:border-neon/60 hover:bg-neon/15 hover:shadow-[0_0_20px_-6px_var(--color-neon)] hover:-translate-y-0.5',
        ghost: 'text-slate-300 hover:text-neon hover:bg-slate-400/10',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-base',
        icon: 'h-11 w-11',
        'icon-lg': 'h-13 w-13',
      },
    },
    defaultVariants: {
      variant: 'neon',
      size: 'default',
    },
  },
)

export function Button({ className, variant, size, as: Comp = 'button', ...props }) {
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { buttonVariants }
