import { Component } from '@angular/core';
import { PaymentMethods } from '../payment-methods/payment-methods';
import { JourneySummary } from '../journey-summary/journey-summary';
import { FooterSecurityBanner } from '../footer-security-banner/footer-security-banner';

@Component({
  selector: 'app-payment',
  imports: [PaymentMethods,JourneySummary,FooterSecurityBanner],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  
}
