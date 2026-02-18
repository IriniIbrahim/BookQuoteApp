import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle implements OnInit {
  isDark = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isDark = document.body.classList.contains('dark-mode');
    }
  }

  toggleTheme(): void {
    if (!this.isBrowser) return;

    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
  }
}