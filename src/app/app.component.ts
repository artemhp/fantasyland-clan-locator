import {Component, ViewEncapsulation} from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { RouterActive } from './router-active';
import { Home } from './pages/home';
import { About } from './pages/about';
// import {Hero} from './heroes/hero';

localStorage.setItem('server', 'http://locator.deykun.com/api');

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  template: require('app/app.html'),
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
