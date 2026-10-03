import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface PlanItem {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-pricing-card',
  styleUrl: './pricing-card.component.css',
  templateUrl: './pricing-card.component.html',
})
export class PricingCardComponent {
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() description: string = '';
  @Input() features: string[] = [];
  @Input() isPopular: boolean = false;
  @Input() buttonText: string = 'Get Started';

  @Output() selectPlan = new EventEmitter<void>();

  // Optional object input setter for passing an entire plan object
  @Input() 
  set planData(plan: PlanItem) {
    if (plan) {
      this.title = plan.title;
      this.price = plan.price;
      this.description = plan.description;
      this.features = plan.features;
      this.isPopular = plan.isPopular ?? false;
      this.buttonText = plan.buttonText || 'Get Started';
    }
  }

  onSelectPlan(): void {
    this.selectPlan.emit();
  }
}
