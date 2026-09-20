import { Component } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-frequently-asked-questions',
  imports: [Footer],
  templateUrl: './frequently-asked-questions.html',
  styleUrl: './frequently-asked-questions.css',
})
export class FrequentlyAskedQuestions {

  faqs = [
  {
    question: "How far in advance can I book a ticket?",
    answer: "You can book tickets up to 120 days in advance of the journey date. For certain special trains, this period might vary."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellations made 48 hours before departure are eligible for a full refund minus a small processing fee. Cancellations within 48 hours are subject to higher deductions based on the time remaining."
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: "No, tickets are non-transferable. Ensure that the passenger details match the valid ID proof carried during the journey."
  },
  {
    question: "How do I get my PNR status?",
    answer: "You can check your PNR status from the 'Account' section after logging in, or look securely at the top of the Home page in the Quick Access menu."
  },
  {
    question: "What should I do if my payment fails but money is deducted?",
    answer: "In most cases, the amount is automatically refunded to your original payment method within 3-5 business days. If you don't receive it, please Contact Us with your transaction ID."
  }
];
}
