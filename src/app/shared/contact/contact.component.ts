import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ContactInfoItem {
  type: 'pin' | 'phone' | 'mail' | 'clock';
  title: string;
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ToastNotification {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.component.css',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  toast: ToastNotification | null = null;
  private toastTimeout: any;

  readonly contactInfo: ContactInfoItem[] = [
    {
      type: 'pin',
      title: 'Visit Us',
      content: '123 Wellness Street, Mumbai, India 400001'
    },
    {
      type: 'phone',
      title: 'Call Us',
      content: '+91 9XXXXXXXXX'
    },
    {
      type: 'mail',
      title: 'Email Us',
      content: 'tushardogra19@gmail.com'
    },
    {
      type: 'clock',
      title: 'Studio Hours',
      content: 'Mon-Sat: 6AM - 9PM, Sun: 7AM - 7PM'
    }
  ];

  handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.showToast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    this.showToast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you soon.",
      variant: 'default'
    });

    this.formData = { name: '', email: '', phone: '', message: '' };
  }

  showToast(notification: ToastNotification): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toast = notification;
    this.toastTimeout = setTimeout(() => {
      this.toast = null;
    }, 4000);
  }

  closeToast(): void {
    this.toast = null;
  }
}
