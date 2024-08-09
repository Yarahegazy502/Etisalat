import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),

  provideAnimationsAsync(),
  provideHttpClient(withFetch()),
  importProvidersFrom(HttpClientModule),
  provideClientHydration(
    withHttpTransferCacheOptions({
      includePostRequests: true,
    }),
  ),
  provideRouter(routes, withComponentInputBinding()),
    // importProvidersFrom([BrowserAnimationsModule])
    // provideAnimations()
  ]
};
