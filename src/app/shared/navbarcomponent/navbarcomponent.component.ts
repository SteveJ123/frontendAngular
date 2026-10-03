import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-navbarcomponent',
  styleUrl: './navbarcomponent.component.css',
  templateUrl: './navbarcomponent.component.html',
})
export class NavbarcomponentComponent {
isOpen = false;

  navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }
}
