import { Component, OnInit } from '@angular/core';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';
import { ClassCardComponent } from '../class-card/class-card.component';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card.component';
import { Title, Meta } from '@angular/platform-browser';

export interface ClassItem {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  image: string;
  instructor: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

@Component({
  imports: [CommonModule, NavbarcomponentComponent, ClassCardComponent, TestimonialCardComponent],
  selector: 'app-homecomponent',
  styleUrl: './homecomponent.component.css',
  templateUrl: './homecomponent.component.html',
})
export class HomecomponentComponent implements OnInit {
  featuredClasses: ClassItem[] = [
    {
      id: '1',
      title: 'Vinyasa Flow Foundation',
      level: 'Beginner',
      description: 'Gentle practice focusing on basic poses and breathing techniques',
      duration: '45 mins',
      image: 'vinyasa-yoga.jpg',
      instructor: 'Maya Patel'
    },
    {
      id: '2',
      title: 'Power & Core Strength',
      level: 'Intermediate',
      description: 'Dynamic sequences linking breath with movement',
      duration: '60 mins',
      image: 'power-yoga.jpg',
      instructor: 'Alex Rivera'
    },
    {
      id: '3',
      title: 'Yin Yoga & Meditation',
      level: 'All Levels',
      description: 'Intense workout combining strength, flexibility, and cardio',
      duration: '50 mins',
      image: 'hatha-yoga.jpg',
      instructor: 'Maya Patel'
    }
  ];

  benefits: Benefit[] = [
    {
      icon: 'shield',
      title: 'Expert Guidance',
      description: 'Learn from certified instructors with over a decade of dedicated teaching practice.'
    },
    {
      icon: 'clock',
      title: 'Flexible Schedules',
      description: 'Access live streaming sessions and on-demand video libraries anytime, anywhere.'
    },
    {
      icon: 'users',
      title: 'Global Community',
      description: 'Connect with like-minded wellness seekers in a supportive, inclusive environment.'
    },
    {
      icon: 'heart',
      title: 'Holistic Health',
      description: 'Strengthen body and mind through a blend of physical poses, breathwork, and meditation.'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Sarah Jenkins',
      role: 'Member for 1 year',
      comment: 'Young Happy And Healthy completely changed my daily routine. My flexibility, mental clarity, and stress levels have improved dramatically.',
      rating: 5,
      avatar: 'assets/images/avatar-1.jpg'
    },
    {
      name: 'David Chen',
      role: 'Member for 6 months',
      comment: 'The live interactive sessions make it feel like you are right in the studio. Maya is an exceptional instructor.',
      rating: 5,
      avatar: 'assets/images/avatar-2.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Member for 2 years',
      comment: 'From beginner foundations to advanced sessions, the progression here is unmatched. Highly recommended!',
      rating: 5,
      avatar: 'assets/images/avatar-3.jpg'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    // 1. Set optimized browser tab title for SEO & branding
    this.titleService.setTitle('Young Happy And Healthy | Online Yoga Classes & Wellness Community');

    // 2. Set high-converting meta description and OpenGraph social tags
    this.metaService.updateTag({
      name: 'description',
      content: 'Transform your mind and body with expert-led online yoga classes, live Vinyasa flow sessions, meditation, and a global wellness community. Start your 7-day free trial today!'
    });

    // OpenGraph Tags (for Facebook, LinkedIn, Discord previews)
    this.metaService.updateTag({ property: 'og:title', content: 'Young Happy And Healthy | Online Yoga & Wellness' });
    this.metaService.updateTag({ property: 'og:description', content: 'Join live yoga sessions, expert-guided meditation, and improve your holistic health with Young Happy And Healthy.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://yoursite.com/assets/images/hero-yoga.jpg' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Young Happy And Healthy | Online Yoga Classes' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Transform your body and mind with our expert-led yoga and mindfulness classes.' });
  }
}
