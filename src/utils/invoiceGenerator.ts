import { Invoice } from '../types';

export function generateInvoiceId(): string {
  return `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export function generateTransactionHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
}

export function createInvoice(amount: string, merchant: string): Invoice {
  return {
    id: generateInvoiceId(),
    amount,
    timestamp: Date.now(),
    merchant,
    transactionHash: '',
    status: 'pending'
  };
}
