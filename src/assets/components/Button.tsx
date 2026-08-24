import { LucideIcon } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  Icon?: LucideIcon
}
const baseClasses =
  'flex cursor-pointer item-center justify-center font-medium text-sm gap-2 p-4 rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'
const variantClasses = {
  primary: 'bg-primary text-primary-foreground font-semibold ',
  secondary: 'bg-secondary-button border border-border',
  ghost: 'text-foreground',
}
export function Button({
  variant,
  Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[baseClasses, variantClasses[variant], className].join(' ')}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  )
}
