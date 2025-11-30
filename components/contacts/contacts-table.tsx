"use client"

import { useState, useMemo } from "react"
import type { Contact } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactsTableProps {
  contacts: Contact[]
  agencyMap: Record<string, string>
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  isBlurred: boolean
}

export function ContactsTable({
  contacts,
  agencyMap,
  currentPage,
  pageSize,
  onPageChange,
  isBlurred,
}: ContactsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (agencyMap[contact.agencyId]?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
    )
  }, [contacts, searchQuery, agencyMap])

  const totalPages = Math.ceil(filteredContacts.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Contacts
            <Badge variant="secondary">{contacts.length}</Badge>
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                onPageChange(1)
              }}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {isBlurred && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md bg-background/80 backdrop-blur-sm">
              <Lock className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">Daily Limit Reached</p>
              <p className="text-sm text-muted-foreground">Upgrade to view unlimited contacts</p>
            </div>
          )}
          <div className={cn("rounded-md border", isBlurred && "blur-sm")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Agency</TableHead>
                  <TableHead className="hidden lg:table-cell">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No contacts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">{contact.phone}</TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">{contact.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{agencyMap[contact.agencyId] ?? "Unknown"}</Badge>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground lg:table-cell">{contact.position}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} contacts
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isBlurred}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isBlurred}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
