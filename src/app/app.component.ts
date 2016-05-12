import {Component, OnInit} from '@angular/core';
import { HeroListComponent } from './hero-list.component';

import {Hero} from './hero';

@Component({
  selector: 'app',
  template: `
    <hero-list>test</hero-list>
  `,
  directives: [HeroListComponent]
})
export class AppComponent {

}
