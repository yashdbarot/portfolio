import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        neon: 'bg-neon text-void font-semibold hover:shadow-[0_0_35px_-6px_var(--color-neon)] hover:-translate-y-0.5',
        outline:
          'border border-neon/40 text-neon hover:bg-neon/10 hover:border-neon hover:shadow-[0_0_25px_-8px_var(--color-neon)]',
        ghost: 'text-slate-400 hover:text-neon',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-base',
        icon: 'h-11 w-11',
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
