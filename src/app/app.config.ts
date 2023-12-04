import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_BASE_HREF,
      useFactory: () => inject(PlatformLocation).getBaseHrefFromDOM(),
    }
  ]
};
