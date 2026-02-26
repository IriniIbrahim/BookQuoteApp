import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ThemeToggle } from './shared/theme-toggle/theme-toggle';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ThemeToggle, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
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
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const defaultBg = this.backgrounds[0];
    this.setBackground(defaultBg);
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  setBackground(bg: string) {
    document.body.style.setProperty('--app-bg', `url(${bg})`);
    this.selectedBackground = bg;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    window.location.href = '/';
  }
}
