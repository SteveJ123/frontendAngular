import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withHashLocation } from "@angular/router";

// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";

// import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
  ],
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes, withHashLocation()),
//     provideHttpClient(),
//     provideAnimations(),
//   ],
// };
