export class UpdatePaymentDto {
  status: 'pending' | 'paid' | 'failed' | 'refunded';
}