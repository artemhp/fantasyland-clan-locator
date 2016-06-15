import {Component, OnInit, Input, } from '@angular/core';
import {Hero}              from '../heroes/hero';

import {HeroService}       from '../clans/clan.service';
import {CommunicateService}       from './communicate-service';
import {ClanListService}   from '../clans/clan-list.service';
import {HeroLocationService}   from '../location/hero-location.service';
import {StorageService}   from '../shared/storage.service';

import {HeroStyleDirective}   from '../heroes/hero.directive';
import {HeroLocationComponent}   from '../location/hero-location.component';
import {HeroInfoComponent}   from '../heroInfo/heroInfo.component';
import {HeroGuildComponent}   from '../heroes/hero-guild.component';

import {SortArray}   from './sortArray.pipe';
import {FilterHeroesByOnline}   from './filterHeroesByOnline.pipe';
import {Subscription} from "rxjs/Rx";

declare var moment: any;
declare var jQuery:any;


@Component({
  selector: 'hero-list',
  providers: [CommunicateService, HeroService, ClanListService, HeroLocationService], //HeroInfoService
  directives: [HeroStyleDirective, HeroLocationComponent, HeroGuildComponent, HeroInfoComponent],
  pipes: [SortArray, FilterHeroesByOnline],
  template: require('app/list/hero-list.component.html')
})

export class HeroListComponent implements OnInit {
  constructor(
    private _heroService: HeroService,
    private _communicateService: CommunicateService,
    private _heroLocationService: HeroLocationService,
    private _storageService: StorageService
    ) {

  }
  errorMessage: string;
  heroes: Hero[];
  heroesOnline;
  sortList;
  clanList: any = [];
  locations: any;
  rooms: any;
  model: any = {
    clan: localStorage['clan'] || 109,
    sortBy: 'date'
  };
  subscription = {
    'getLocations': {},
    'getRoom': {},
    'getHeroes': {}
  };

  subscriptionGetLocations:Subscription;
  subscriptionGetRoom:Subscription;
  subscriptionGetHeroes:Subscription;

  roomStatus: boolean = false;
  locationStatus: boolean = false;

  clanChange() {
    this.getHeroes(this.model.clan);
    localStorage['clan'] = this.model.clan;
  }

  refreshList() {
    this._communicateService.dispatchEvent("");
    this.subscriptionGetLocations.unsubscribe();
    this.subscriptionGetRoom.unsubscribe();
    this.subscriptionGetHeroes.unsubscribe();
    this.getHeroes(this.model.clan);
  }

  ngOnInit() {

    this.getHeroes(this.model.clan);
    this.clanList = this._storageService.clans;
    this.sortList = [{ 'sort': 'location', 'name': 'По локации' }, { 'sort': 'date', 'name': 'По времени' }, { 'sort': 'lvl', 'name': 'По уровню' }];

    this.subscriptionGetLocations = this._heroLocationService.getLocations()
      .subscribe(
      locations => { this._storageService.locations = locations; this.locationStatus = true; },
      error => { this.errorMessage = <any>error }
      );

    this.subscriptionGetRoom = this._heroLocationService.getRoom()
      .subscribe(
      rooms => { this._storageService.rooms = rooms; this.roomStatus = true; },
      error => { this.errorMessage = <any>error }
      );

  }

  getHeroes(el) {
    this.subscriptionGetHeroes = this._heroService.getHeroes(el).subscribe(
      heroes => {
        let heroList;
        this.heroes = [];
        heroList = heroes;
        heroList.map(function(el){
          el['showDetails'] = false;
          el['dateFromNow'] = el.date.locale("ru").fromNow();
          el['dateDiff'] = this.showDIff(el.date);
          this.heroes.push(el);
        }.bind(this));
        this.heroesOnline = new FilterHeroesByOnline().transform(heroes, []).length;
      },
      error => { this.errorMessage = <any>error }
      );
  }

  showDIff(el) {
    let now, heroDate, diff;
    now = moment().utcOffset(3);
    heroDate = el;
    diff = now.diff(heroDate, 'minutes');
    return diff;
  }

}
