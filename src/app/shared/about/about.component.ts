import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

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
}
