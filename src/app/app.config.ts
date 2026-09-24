import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter, withHashLocation } from "@angular/router";

// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";

// import { routes } from './app.routes';
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ),
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
