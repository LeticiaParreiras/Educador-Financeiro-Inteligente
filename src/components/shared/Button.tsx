import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' | 'rounded'
  icon?: LucideIcon
}

const baseClasses =
  'flex cursor-pointer items-center justify-center font-medium text-sm gap-2  transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

const variantClasses = {
  primary: 'bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-3',
  secondary: 'bg-secondary-button border border-border rounded-3xl px-4 py-3',
  ghost: 'rounded-lg text-foreground px-4 py-3',
  rounded: 'bg-primary flex text-lg items-center justify-center rounded-full text-primary-foreground p-2'
}

export function Button({
  variant,
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[className, baseClasses, variantClasses[variant] ].join(' ')}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  )
}
