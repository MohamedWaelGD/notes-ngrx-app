import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import {
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideLottieOptions } from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    importProvidersFrom([
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        NgxSkeletonLoaderModule,
    ])
],
};
