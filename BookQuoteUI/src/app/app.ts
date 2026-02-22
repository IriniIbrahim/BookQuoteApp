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
    'backgrounds/bg6.jpg',
    'backgrounds/bg7.jpg',
    "backgrounds/bg8.jpg",
  ];

  selectedBackground: string | null = null;
  ngOnInit() {
    const defaultBg = this.backgrounds[0];
    this.setBackground(defaultBg);
  }
  setBackground(bg: string) {
    document.body.style.setProperty('--app-bg', `url(${bg})`);
    this.selectedBackground = bg;
  }
}


