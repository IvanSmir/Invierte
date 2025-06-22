export interface Reservation {
  id: string
  phone: string
  lotId: string
  userId: string
  User: User
  lot: Lot
}

export interface User {
  id: string
  email: string
  fullName: string
}

export interface Lot {
  id: string
  propertyId: string
}
