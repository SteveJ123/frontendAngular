import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

interface Achievement {
  icon: string;
  label: string;
  value: string;
}

interface Philosophy {
  title: string;
  description: string;
}

@Component({
  imports: [CommonModule, FooterComponent],
  selector: 'app-about',
  styleUrl: './about.component.css',
  templateUrl: './about.component.html',
})
export class AboutComponent {
instructorImage = 'assets/images/instructor.jpg';

  certifications: string[] = [
    '200-Hour RYT Certified',
    'Advanced Vinyasa Specialist',
    'Meditation & Mindfulness Coach',
    'Prenatal Yoga Certified'
  ];

  achievements: Achievement[] = [
    { icon: 'users', label: 'Taught', value: '500+ Students' },
    { icon: 'award', label: 'Experience', value: '10+ Years' },
    { icon: 'heart', label: 'Practice', value: '10,000+ Hours' },
    { icon: 'star', label: 'Rating', value: '4.9/5' }
  ];

  philosophies: Philosophy[] = [
    {
      title: 'Mindful Movement',
      description: "Every practice is an opportunity to connect with yourself. I emphasize mindful movement that honors your body's unique capabilities and limitations."
    },
    {
      title: 'Breath as Foundation',
      description: 'The breath is the bridge between body and mind. Through pranayama and conscious breathing, we unlock deeper levels of awareness and peace.'
    },
    {
      title: 'Community & Support',
      description: 'Yoga is a journey best shared. I cultivate a warm, inclusive environment where everyone feels welcome, supported, and empowered to grow.'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // 1. Set optimized browser tab title for the About page
    this.titleService.setTitle('About Maya Patel | Expert Yoga Instructor & Wellness Coach');

    // 2. Set SEO Meta Description
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Meet Maya Patel, certified yoga instructor with over 10 years of experience. Learn about her teaching philosophy, certifications, and holistic wellness journey.' 
    });

    // 3. OpenGraph Tags (for Facebook, LinkedIn, Discord sharing)
    this.metaService.updateTag({ property: 'og:title', content: 'About Maya Patel | Young Happy And Healthy' });
    this.metaService.updateTag({ property: 'og:description', content: 'Discover the experience, certifications, and teaching philosophy of expert yoga instructor Maya Patel.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://yoursite.com/assets/images/instructor.jpg' });
    this.metaService.updateTag({ property: 'og:type', content: 'profile' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'About Maya Patel | Lead Yoga Instructor' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Learn more about Maya Patel and her mindful approach to yoga and holistic health.' });
  }
}
