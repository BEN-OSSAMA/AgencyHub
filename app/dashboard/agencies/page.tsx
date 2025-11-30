import { getAgencies } from "@/lib/data"
import { AgenciesTable } from "@/components/agencies/agencies-table"

export default function AgenciesPage() {
  const agencies = getAgencies()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agencies</h1>
        <p className="text-muted-foreground">View all registered agencies and their locations.</p>
      </div>

      <AgenciesTable agencies={agencies} />
    </div>
  )
}
