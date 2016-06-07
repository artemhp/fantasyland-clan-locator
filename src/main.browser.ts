import {bootstrap}    from '@angular/platform-browser-dynamic';

import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
// Add all operators to Observable
// import 'rxjs/Rx';
import {AppComponent, APP_PROVIDERS} from './app';
import { HTTP_PROVIDERS } from '@angular/http';

// import moment = require("moment");

bootstrap(AppComponent,
  [
    ...PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS
  ]
  );
