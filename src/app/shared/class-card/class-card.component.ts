import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter  } from '@angular/core';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

@Component({
  imports: [CommonModule],
  selector: 'app-class-card',
  styleUrl: './class-card.component.css',
  templateUrl: './class-card.component.html',
})
export class ClassCardComponent {
  @Input() classData!: any;
  // @Output() joinClass = new EventEmitter<ClassItem>();
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() duration: string = '';
  @Input() difficulty: DifficultyLevel = 'Beginner';
  @Input() image: string = '';
  @Input() students?: number;

  @Output() joinClass = new EventEmitter<void>();

  getDifficultyClass(): string {
    switch (this.difficulty) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Intermediate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Advanced':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  }

  onJoinClass(): void {
    this.joinClass.emit();
  }
}
