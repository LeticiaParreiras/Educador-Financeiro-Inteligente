import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import type { SimulationRecord } from '@/data/simulation'
import { Button } from '@/components/shared/Button'
import { calcMonthlySavings } from '@/utils/simulation'

interface CardHistoryProps {
  data: SimulationRecord
  navigate: () => void
  delete: () => void
}

export function CardHistory({ data, navigate, delete: deleteSimulation }: CardHistoryProps) {
  const monthlySavings = calcMonthlySavings(data)

  return (
    <div className="bg-card flex w-full flex-col gap-6 rounded-3xl p-5 shadow-[0_4px_18px_0px_rgba(0,0,0,0.08)] sm:p-6 lg:grid lg:grid-cols-[minmax(220px,1.1fr)_minmax(420px,2.4fr)_auto] lg:items-center lg:gap-8 lg:p-8">
      {/* Ícone + título  */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="bg-muted-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
          <Goal size={20} className="text-primary" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-foreground truncate text-base font-semibold">
            {data.goalName}
          </h2>
          <div className="text-muted-foreground text-sm">
            {new Date(data.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Infos */}
      <div className="border-border grid grid-cols-1 gap-4 border-y py-4 min-[420px]:grid-cols-3 min-[420px]:gap-3 sm:gap-6 sm:border-0 sm:py-0 lg:gap-10">
        <InfoBlock label="Custo da meta" value={data.goalAmount} />
        <InfoBlock label="Prazo" value={`${data.goalDeadline} meses`} />
        <InfoBlock
          label="Economia mensal"
          value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        />
      </div>

      {/* Ações */}
      <div className="border-border flex items-center justify-between gap-4 pt-4 sm:justify-end sm:border-0 sm:pt-0 lg:gap-6">
        <Button
          variant="ghost"
          icon={Trash2}
          onClick={deleteSimulation}
          aria-label="Excluir meta"
          className="text-red-500 transition-colors hover:bg-red-500/10"
        />
        <div className="bg-border h-10 w-px" />
        <Button
          variant="secondary"
          icon={ExternalLink}
          onClick={navigate}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}

function InfoBlock({
  label,
  value,
  className = '',
}: {
  label: string
  value: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <h3 className="text-muted-foreground text-xs font-semibold uppercase">
        {label}
      </h3>
      <p className="text-foreground text-base font-semibold">{value}</p>
    </div>
  )
}
