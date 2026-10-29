import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PricingCardComponent } from '../pricing-card/pricing-card.component';
import { Meta, Title } from '@angular/platform-browser';

export interface FAQItem {
  question: string;
  answer: string;
}

@Component({
  imports: [CommonModule, PricingCardComponent],
  selector: 'app-price',
  styleUrl: './price.component.css',
  templateUrl: './price.component.html',
})
export class PriceComponent {
  readonly plans: any[] = [
    {
      title: 'Free Trial',
      price: 'Free',
      description: 'Perfect for trying out our platform',
      features: [
        '7 days full access',
        'Access to 1 live class',
        '3 recorded sessions',
        'Basic progress tracking',
        'Community forum access'
      ],
      buttonText: 'Start Free Trial',
      isPopular: false
    },
    {
      title: 'Standard',
      price: '₹799',
      description: 'For dedicated practitioners',
      features: [
        'Unlimited recorded sessions',
        '5 live classes per month',
        'Advanced progress tracking',
        'Downloadable resources',
        'Priority email support',
        'Monthly wellness newsletter'
      ],
      isPopular: false,
      buttonText: 'Get Started'
    },
    {
      title: 'Premium',
      price: '₹1,499',
      description: 'The complete wellness experience',
      features: [
        'Everything in Standard',
        'Unlimited live sessions',
        '1-on-1 monthly consultation',
        'Personalized practice plans',
        'Exclusive workshops & retreats',
        'Early access to new content',
        'Priority booking',
        'Custom diet recommendations'
      ],
      isPopular: true,
      buttonText: 'Go Premium'
    }
  ];

  readonly faqs: FAQItem[] = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
    },
    {
      question: 'Do I need any equipment?',
      answer: 'All you need is a yoga mat and comfortable clothing. Props like blocks and straps are optional but can enhance your practice.'
    },
    {
      question: 'Are classes suitable for beginners?',
      answer: 'Absolutely! We offer classes for all levels, from complete beginners to advanced practitioners.'
    },
    {
      question: "What's included in the live sessions?",
      answer: 'Live sessions include real-time instruction, the ability to ask questions, and personalized feedback from our instructor.'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // 1. Set optimized browser tab title for the Pricing page
    this.titleService.setTitle('Pricing Plans & Subscriptions | Young Happy And Healthy');

    // 2. Set SEO Meta Description
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Choose an affordable yoga and wellness plan that fits your lifestyle. Start a 7-day free trial or upgrade to Standard and Premium for unlimited live classes and 1-on-1 coaching.' 
    });

    // 3. OpenGraph Tags (for Facebook, LinkedIn, Discord sharing)
    this.metaService.updateTag({ property: 'og:title', content: 'Yoga Pricing Plans & Free Trial | Young Happy And Healthy' });
    this.metaService.updateTag({ property: 'og:description', content: 'Explore our flexible pricing plans including a 7-day free trial, unlimited classes, and personalized wellness coaching.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://yoursite.com/assets/images/pricing-hero.jpg' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Pricing Plans | Young Happy And Healthy' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Start your yoga and mindfulness journey today with our flexible pricing plans and 7-day free trial.' });
  }
}
