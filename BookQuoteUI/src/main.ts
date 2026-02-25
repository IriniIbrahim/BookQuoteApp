import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'bootstrap';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [...appConfig.providers, provideHttpClient()],
});