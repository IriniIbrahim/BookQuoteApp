import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeToggle } from './shared/theme-toggle/theme-toggle';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ThemeToggle, CommonModule],
  templateUrl: './app.html',
})
export class App {
  backgrounds: string[] = [
    'backgrounds/bg1.jpg',
    'backgrounds/bg2.jpg',
    'backgrounds/bg3.jpg',
    'backgrounds/bg4.jpg',
    'backgrounds/bg5.jpg',
  ];

  selectedBackground: string | null = null;
  ngOnInit(): void {
    this.selectedBackground = localStorage.getItem('bgImage');
  }
  setBackground(bg: string) {
    this.selectedBackground = bg;
    localStorage.setItem('bgImage', bg);
  }
}
