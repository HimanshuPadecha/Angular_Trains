import { Component, inject, signal } from '@angular/core';
import { Methods, UpiApps } from '../../types';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-methods',
  imports: [NgClass],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {
  currentMethod = signal<Methods>('UPI');
  upiId = signal('');
  loading = signal(false);
  idChecked = signal(false);

  currentUpiApp = signal<UpiApps>('GPAY');

  private toaster = inject(ToastrService);

  checkUpiId() {
    if (this.upiId().length === 0) {
      this.toaster.error('Please enter upi id to check!!');
      return;
    }
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
      this.idChecked.set(true);
    }, 2000);
  }
}
