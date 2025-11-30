"use client"

import { useState } from "react"
import { format } from "date-fns"
import type { Agency } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building2 } from "lucide-react"

interface AgenciesTableProps {
  agencies: Agency[]
}

export function AgenciesTable({ agencies }: AgenciesTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agency.address?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            All Agencies
            <Badge variant="secondary">{agencies.length}</Badge>
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgencies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No agencies found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAgencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-mono text-sm">{agency.id}</TableCell>
                    <TableCell className="font-medium">{agency.city}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {agency.address ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {format(new Date(agency.createdAt), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredAgencies.length} of {agencies.length} agencies
        </div>
      </CardContent>
    </Card>
  )
}
