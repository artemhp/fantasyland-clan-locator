import {bootstrap}    from '@angular/platform-browser-dynamic';

// Add all operators to Observable
import 'rxjs/Rx';
import {AppComponent} from './app/app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {StorageService}   from './app/storage.service';
import {UiFunctions}   from './app/ui-functions.service';
// import moment = require("moment");

bootstrap(AppComponent, [HTTP_PROVIDERS, StorageService, UiFunctions]);