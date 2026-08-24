import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-1g">
            <span className="text-muted-foreground font-medi">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            Icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant="ghost"
            Icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Button
            aria-label={`Mudar tema para ${theme === 'light' ? 'claro' : 'escuro'}`}
            variant="ghost"
            Icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          ></Button>
        </div>
      </nav>
    </header>
  )
}
