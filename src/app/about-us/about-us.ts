import { Component } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-about-us',
  imports: [Footer],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  features = [
    { icon: 'speed', title: 'Lightning Fast', desc: 'Book tickets in under 2 minutes.' },
    { icon: 'security', title: 'Secure Payments', desc: 'Your transactions are 100% protected.' },
    { icon: 'support_agent', title: '24/7 Support', desc: 'Always here to assist with your journey.' }
  ];
}
