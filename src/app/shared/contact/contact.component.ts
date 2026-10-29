import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // 1. Set optimized browser tab title for the Contact page
    this.titleService.setTitle('Contact Us & Studio Location | Young Happy And Healthy');

    // 2. Set SEO Meta Description
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Get in touch with Young Happy And Healthy. Reach out with questions about our online yoga classes, memberships, or visit our studio in Mumbai, India.' 
    });

    // 3. OpenGraph Tags (for Facebook, LinkedIn, Discord sharing)
    this.metaService.updateTag({ property: 'og:title', content: 'Contact Young Happy And Healthy | Support & Inquiries' });
    this.metaService.updateTag({ property: 'og:description', content: 'Have questions? Send us a message, chat with us on WhatsApp, or find our yoga studio location details.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://yoursite.com/assets/images/hero-yoga.jpg' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Contact Us | Young Happy And Healthy' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Reach out to our team for support, class inquiries, and membership details.' });
  }

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
