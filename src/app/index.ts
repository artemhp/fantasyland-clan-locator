import {StorageService}   from './shared/storage.service';
import {UiFunctions}   from './shared/ui-functions.service';
import {DateService}   from './shared/date.service';
export * from './app.routes';

// App
export {AppComponent} from './app.component';

// Application wide providers
export const APP_PROVIDERS = [
    StorageService,
    UiFunctions,
    DateService
  // AppState
];
