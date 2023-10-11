import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey, vehicleReducer } from './app/store/vehicles.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      StoreModule.forRoot({
      [appFeatureKey]: vehicleReducer,
    }, {}),
  ]),
    
  ],
}).catch(err => console.error(err));