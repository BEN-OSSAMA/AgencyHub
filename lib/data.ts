import type { Agency, Contact } from "./types"
import agenciesData from "@/data/agencies.json"
import contactsData from "@/data/contacts.json"

export function getAgencies(): Agency[] {
  return agenciesData as Agency[]
}

export function getAgencyById(id: string): Agency | undefined {
  return (agenciesData as Agency[]).find((agency) => agency.id === id)
}

export function getContacts(): Contact[] {
  return contactsData as Contact[]
}

export function getContactsByAgency(agencyId: string): Contact[] {
  return (contactsData as Contact[]).filter((contact) => contact.agencyId === agencyId)
}

export function getPaginatedContacts(page = 1, limit = 10): { contacts: Contact[]; total: number; pages: number } {
  const contacts = contactsData as Contact[]
  const total = contacts.length
  const pages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const end = start + limit

  return {
    contacts: contacts.slice(start, end),
    total,
    pages,
  }
}

export function getAgencyName(agencyId: string): string {
  const agency = getAgencyById(agencyId)
  return agency?.city ?? "Unknown"
}
