import {bootstrap}    from 'angular2/platform/browser';
// Add all operators to Observable
import 'rxjs/Rx';
import {AppComponent} from './app.component';
import { HTTP_PROVIDERS } from 'angular2/http';
import {StorageService}   from './storage.service';
import {UiFunctions}   from './ui-functions.service';
// import moment = require("moment");

bootstrap(AppComponent, [HTTP_PROVIDERS, StorageService, UiFunctions]);
