import {Component, OnInit, Input} from '@angular/core';
import {Hero}              from './hero';

import {HeroService}       from './clan.service';
import {ClanListService}   from './clan-list.service';
import {HeroLocationService}   from './hero-location.service';
import {StorageService}   from './storage.service';

import {HeroStyleDirective}   from './hero.directive';
import {HeroLocationComponent}   from './hero-location.component';
import {HeroGuildComponent}   from './hero-guild.component';

import {SortArray}   from './sortArray.pipe';

declare var moment: any;


@Component({
  selector: 'hero-list',
  template: require('app/hero-list.component.html'),
  styles: ['.error {color:red;}'],
  providers: [HeroService, ClanListService, HeroLocationService],
  directives: [HeroStyleDirective, HeroLocationComponent, HeroGuildComponent],
  pipes : [SortArray]
})

export class HeroListComponent implements OnInit {
  constructor(
    private _heroService: HeroService,
    private _heroLocationService: HeroLocationService,
    private _storageService: StorageService
    ) { }
  errorMessage: string;
  heroes: Hero[];
  clanList: any = [];
  locations: any;
  rooms: any;
  model: any = {
    clan: 109
  };

  roomStatus: boolean = false;
  locationStatus: boolean = false;

  clanChange() {
    this.getHeroes(this.model.clan);
  }

  refreshList() {
    this.getHeroes(this.model.clan);
  }

  ngOnInit() {
    this.getHeroes(this.model.clan);
    this.clanList = this._storageService.clans;

    this._heroLocationService.getLocations()
      .subscribe(
      locations => { this._storageService.locations = locations; this.locationStatus = true; },
      error => { this.errorMessage = <any>error }
      );

    this._heroLocationService.getRoom()
      .subscribe(
      rooms => { this._storageService.rooms = rooms; this.roomStatus = true; },
      error => { this.errorMessage = <any>error }
      );
  }

  getHeroes(el) {
    this._heroService.getHeroes(el).subscribe(
      heroes => {this.heroes = heroes},
      error => {this.errorMessage = <any>error}
      );
  }

  showDIff(el) {
    if (this.heroes[el]) {
      var a = this.heroes[el].date;
      var b = moment();
      return b.diff(a, 'days') // 86400000;
    } else {
      return 10000000;
    }
  }

}
