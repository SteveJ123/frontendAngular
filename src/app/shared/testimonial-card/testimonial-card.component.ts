import { Component, Input } from '@angular/core';
export interface TestimonialData {
  name: string;
  role: string;
  content?: string;
  comment?: string;
  rating: number;
  image?: string;
  avatar?: string;
}

@Component({
  imports: [],
  selector: 'app-testimonial-card',
  styleUrl: './testimonial-card.component.css',
  templateUrl: './testimonial-card.component.html',
})
export class TestimonialCardComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() content: string = '';
  @Input() rating: number = 5;
  @Input() image?: string;

  // Array to iterate over for star rendering
  readonly stars: number[] = [0, 1, 2, 3, 4];

  // Optional Setter to seamlessly handle binding via an object property: [testimonialData]="data"
  @Input() 
  set testimonialData(data: TestimonialData) {
    if (data) {
      this.name = data.name || this.name;
      this.role = data.role || this.role;
      this.content = data.content || data.comment || this.content;
      this.rating = data.rating ?? this.rating;
      this.image = data.image || data.avatar || this.image;
    }
  }
}
