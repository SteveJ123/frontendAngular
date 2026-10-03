import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClassCardComponent } from '../class-card/class-card.component';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ClassItem {
  title: string;
  description: string;
  duration: string;
  difficulty: DifficultyLevel;
  image: string;
  students: number;
}
@Component({
  imports: [CommonModule, ClassCardComponent],
  selector: 'app-classes',
  styleUrl: './classes.component.css',
  templateUrl: './classes.component.html',
})
export class ClassesComponent {
  readonly allClasses: ClassItem[] = [
    {
      title: 'Hatha Yoga',
      description: 'Gentle practice focusing on basic poses and breathing techniques. Perfect for beginners or those seeking a slower-paced class.',
      duration: '60 min',
      difficulty: 'Beginner',
      image: 'hatha-yoga.jpg',
      students: 234
    },
    {
      title: 'Vinyasa Flow',
      description: 'Dynamic sequences linking breath with movement. Build strength, flexibility, and mindfulness through flowing transitions.',
      duration: '75 min',
      difficulty: 'Intermediate',
      image: 'vinyasa-yoga.jpg',
      students: 189
    },
    {
      title: 'Power Yoga',
      description: 'Intense workout combining strength, flexibility, and cardio. Challenge yourself with advanced poses and sequences.',
      duration: '90 min',
      difficulty: 'Advanced',
      image: 'power-yoga.jpg',
      students: 156
    },
    {
      title: 'Meditation & Mindfulness',
      description: 'Cultivate inner peace through guided meditation and breathing exercises. Reduce stress and enhance mental clarity.',
      duration: '45 min',
      difficulty: 'Beginner',
      image: 'meditation.jpg',
      students: 312
    },
    {
      title: 'Morning Energizer',
      description: 'Start your day with energizing flows designed to awaken your body and mind. Perfect morning routine for all levels.',
      duration: '60 min',
      difficulty: 'Beginner',
      image: 'vinyasa-yoga.jpg',
      students: 267
    },
    {
      title: 'Restorative Yoga',
      description: 'Gentle, relaxing practice using props to support the body. Ideal for recovery, stress relief, and deep relaxation.',
      duration: '75 min',
      difficulty: 'Beginner',
      image: 'hatha-yoga.jpg',
      students: 198
    },
    {
      title: 'Core & Balance',
      description: 'Focus on building core strength and improving balance. Enhance stability and develop a strong foundation.',
      duration: '60 min',
      difficulty: 'Intermediate',
      image: 'power-yoga.jpg',
      students: 145
    },
    {
      title: 'Flexibility Flow',
      description: 'Dedicated practice for improving flexibility and range of motion. Deepen your stretches safely and effectively.',
      duration: '60 min',
      difficulty: 'Intermediate',
      image: 'vinyasa-yoga.jpg',
      students: 176
    }
  ];
}
