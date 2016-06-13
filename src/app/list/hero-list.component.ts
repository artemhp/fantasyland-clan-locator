import {Component, OnInit, Input, } from '@angular/core';
import {Hero}              from '../heroes/hero';

import {HeroService}       from '../clans/clan.service';
import {CommunicateService}       from './communicate-service';
// import {HeroInfoService}       from '../clans/hero.service';
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
  styles: ['.error {color:red;}'],
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
    clan: 109,
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
    this.sortList = [{ 'sort': 'location', 'name': 'По локации' }, { 'sort': 'date', 'name': 'По времени' }];

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
        this.heroes = [];

        let heroList = heroes;
        heroList.map(function(el){
          el['showDetails'] = false;
          this.heroes.push(el);
        }.bind(this));
        this.heroesOnline = new FilterHeroesByOnline().transform(heroes, []).length;
      },
      error => { this.errorMessage = <any>error }
      );

  }

  showDIff(el) {
    if (this.heroes[el]) {
      let a = this.heroes[el].date;
      let b = moment();
      return b.diff(a, 'days'); // 86400000;
    } else {
      return 10000000;
    }
  }

}
