import {Component, OnInit} from '@angular/core';
import { HeroListComponent } from './list/hero-list.component';

import {Hero} from './heroes/hero';

@Component({
  selector: 'app',
  template: `
    <hero-list>test</hero-list>
  `,
  directives: [HeroListComponent]
})
export class AppComponent {

}
