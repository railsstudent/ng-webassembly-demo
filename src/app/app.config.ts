import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { ApplicationConfig, inject } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: () => inject(PlatformLocation).getBaseHrefFromDOM(),
    }
  ]
};
