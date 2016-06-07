import {Component, ViewEncapsulation} from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { RouterActive } from './router-active';
import { Home } from './pages/home';
import { About } from './pages/about';
// import {Hero} from './heroes/hero';


@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="text-right">
      <span router-active>
        </span>
        <span router-active>
          <button class="btn btn-default btn-sm" [routerLink]=" ['Home'] ">
            Clan Locator
          </button>
        </span>
        <span router-active>
          <button [routerLink]=" ['About'] " class="btn btn-default btn-sm">
            About
          </button>
        </span>
    </div>

    <router-outlet></router-outlet>

  `,
  directives: [RouterActive]
})

// <hero-list>test</hero-list>

@RouteConfig([
  // { path: '/', name: 'Index', component: HeroListComponent, useAsDefault: true },
  { path: '/home', name: 'Home', component: Home, useAsDefault: true },
  { path: '/about', name: 'About', component: About }
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])

export class AppComponent {

  ngOnInit() {
    console.log('Initial App');
  }
}
