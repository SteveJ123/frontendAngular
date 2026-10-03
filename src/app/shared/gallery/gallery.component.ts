import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card.component';

export interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  imports: [CommonModule, TestimonialCardComponent ],
  selector: 'app-gallery',
  styleUrl: './gallery.component.css',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  readonly galleryImages: GalleryImage[] = [
    { src: 'hero-yoga.jpg', alt: 'Peaceful outdoor yoga session' },
    { src: 'hatha-yoga.jpg', alt: 'Hatha yoga class in studio' },
    { src: 'vinyasa-yoga.jpg', alt: 'Dynamic vinyasa flow session' },
    { src: 'power-yoga.jpg', alt: 'Power yoga workout class' },
    { src: 'meditation.jpg', alt: 'Meditation and mindfulness practice' },
    { src: 'hatha-yoga.jpg', alt: 'Morning yoga practice' }
  ];

  readonly testimonials: any[] = [
    {
      name: 'Sarah Mitchell',
      role: 'Yoga Enthusiast',
      content: "Young Happy And Healthy transformed my life. The instructors are knowledgeable and the community is so supportive. I've never felt better!",
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Premium Member',
      content: "Best investment I've made in my wellness journey. The live sessions are incredible and the personalized guidance has helped me progress so much.",
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Beginner Yogi',
      content: 'As a complete beginner, I felt welcomed and guided every step of the way. The community here is amazing!',
      rating: 5
    },
    {
      name: 'Michael Johnson',
      role: 'Standard Member',
      content: "The variety of classes keeps me engaged. From power yoga to meditation, there's something for every mood and goal.",
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Premium Member',
      content: 'The monthly consultations have been game-changing. Having personalized guidance makes all the difference in my practice.',
      rating: 5
    },
    {
      name: 'Alex Thompson',
      role: 'Yoga Enthusiast',
      content: 'I\'ve tried many online yoga platforms, but Young Happy And Healthy stands out. The instruction quality and community support are unmatched.',
      rating: 5
    }
  ];
}
