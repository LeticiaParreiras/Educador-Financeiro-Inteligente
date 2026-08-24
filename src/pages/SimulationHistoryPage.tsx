import { CardHistory } from '@/components/features/history/Card'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SimulationHistoryPage() {
   const { getAllData, deleteSimulation } = useSimulationStorage()
   const navigate = useNavigate()
   const [data, setData] = useState(() => getAllData())

   useEffect(() => {
      setData(getAllData())
   }, [])

   const handleDelete = (id: string) => {
      deleteSimulation(id)
      setData((currentData) => currentData.filter((simulation) => simulation.id !== id))
   }
console.log(data)
   return (
      <main className="p-4">
         <PageHero
            title="Histórico de simulações"
            subtitle="Acompanhe o histórico de seus planos financeiros."
         />
         <div className="flex flex-col gap-4">
            {data.length==0 && <h3 className='text-center text-muted-foreground mb-8 text-m'>Nenhuma simulação realizada</h3>}
            {data.map((simulation) => (
               <CardHistory
                  key={simulation.id}
                  data={simulation}
                  navigate={() => navigate(`/resultado/${simulation.id}`)}
                  delete={() => handleDelete(simulation.id)}
               />
            ))}
         </div>
      </main>
   )
}