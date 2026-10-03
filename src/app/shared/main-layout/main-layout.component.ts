import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule, FooterComponent, NavbarcomponentComponent, RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
}
