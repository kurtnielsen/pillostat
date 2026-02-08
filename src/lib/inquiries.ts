export interface Inquiry {
  id: string;
  unitId: string;
  unitName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contractLength: number;
  startDate: string;
  employer?: string;
  hospital?: string;
  message?: string;
  status: 'new' | 'contacted' | 'approved' | 'booked' | 'declined';
  createdAt: string;
  notes?: string;
}

// In-memory store for prototype (would be database in production)
let inquiries: Inquiry[] = [
  {
    id: '1',
    unitId: 'studio-suite',
    unitName: 'Studio Suite',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    contractLength: 13,
    startDate: '2024-03-01',
    employer: 'TravelNurse Inc',
    hospital: 'Regional Medical Center',
    message: 'Looking for a quiet place during my 13-week contract. I work night shifts.',
    status: 'new',
    createdAt: '2024-02-01T10:30:00Z',
  },
  {
    id: '2',
    unitId: 'garden-suite',
    unitName: 'Garden Suite',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@email.com',
    phone: '(555) 987-6543',
    contractLength: 26,
    startDate: '2024-02-15',
    employer: 'Aya Healthcare',
    hospital: 'University Hospital',
    status: 'contacted',
    createdAt: '2024-01-28T14:15:00Z',
    notes: 'Called on 1/29. Very interested. Waiting for contract confirmation.'
  },
];

export function getInquiries(): Inquiry[] {
  return inquiries;
}

export function getInquiry(id: string): Inquiry | undefined {
  return inquiries.find(i => i.id === id);
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: Date.now().toString(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  return newInquiry;
}

export function updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | undefined {
  const index = inquiries.findIndex(i => i.id === id);
  if (index === -1) return undefined;
  inquiries[index] = { ...inquiries[index], ...updates };
  return inquiries[index];
}
