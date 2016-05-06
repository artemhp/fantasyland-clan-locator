import {Component, OnInit} from 'angular2/core';
import { HeroListComponent } from './hero-list.component';

import {Hero} from './hero';

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
  `,
  directives: [HeroListComponent]
})
export class AppComponent {

}
