import {StorageService}   from './shared/storage.service';
import {UiFunctions}   from './shared/ui-functions.service';

// App
export {AppComponent} from './app.component';

// Application wide providers
export const APP_PROVIDERS = [
    StorageService,
    UiFunctions
  // AppState
];
