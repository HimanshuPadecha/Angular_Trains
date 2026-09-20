import { Component, signal } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-contact',
  imports: [Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  isMessageSent = signal(false);
  contact = signal({ name: '', email: '', message: '' });

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.contact.update((contact) => ({ ...contact, [input.name]: input.value }));
  }

  handleSubmit() {
    this.isMessageSent.set(true);
    
    setTimeout(() => {
      this.contact.update((_) => ({ email: '', message: '', name: '' }));
      this.isMessageSent.set(false);
    }, 3000);
  }
}
