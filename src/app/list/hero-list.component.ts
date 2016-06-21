import {Component, OnInit, Input,} from '@angular/core';
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
import {ShowActive}   from './showActive.pipe';
import {Subscription} from "rxjs/Rx";

declare var moment:any;
declare var jQuery:any;


@Component({
  selector: 'hero-list',
  providers: [CommunicateService, HeroService, ClanListService, HeroLocationService], //HeroInfoService
  directives: [HeroStyleDirective, HeroLocationComponent, HeroGuildComponent, HeroInfoComponent],
  pipes: [SortArray, ShowActive, FilterHeroesByOnline],
  template: require('app/list/hero-list.component.html')
})

export class HeroListComponent implements OnInit {
  constructor(private _heroService:HeroService,
              private _communicateService:CommunicateService,
              private _heroLocationService:HeroLocationService,
              private _storageService:StorageService) {

  }

  errorMessage:string;
  heroes:Hero[];
  heroesOnline;
  sortList;
  clanList:any = [];
  locations:any;
  rooms:any;
  model:any = {
    clan: localStorage['clan'] || 109,
    heroesActiveStatus: false,
    sortBy: 'date',
    showMap: false
  };
  subscription = {
    'getLocations': {},
    'getRoom': {},
    'getHeroes': {}
  };

  subscriptionGetLocations:Subscription;
  subscriptionGetRoom:Subscription;
  subscriptionGetHeroes:Subscription;

  roomStatus:boolean = false;
  locationStatus:boolean = false;

  clanChange() {
    this.heroes = [];
    this.getHeroes(this.model.clan);
    localStorage['clan'] = this.model.clan;
  }

  statusChange() {
    if (this.model.heroesActiveStatus) {
      this.heroes.map(function (el) {
        console.log(el['name']);
        console.log(el['dateDiff']);
        if (el['dateDiff'] < 120) {
          el['hidden'] = true;
        } else {
          el['hidden'] = false;
        }
      });
    }
  }

  refreshList() {
    this._communicateService.dispatchEvent("");
    this.subscriptionGetLocations.unsubscribe();
    this.subscriptionGetRoom.unsubscribe();
    this.subscriptionGetHeroes.unsubscribe();
    this.getHeroes(this.model.clan);
  }

  totalLocation = [];
  totalLocationOffline = [];

  ngOnInit() {

    this.getHeroes(this.model.clan);
    this.clanList = this._storageService.clans;
    this.sortList = [{'sort': 'location', 'name': 'По локации'}, {'sort': 'date', 'name': 'По времени'}, {
      'sort': 'lvl',
      'name': 'По уровню'
    }];

    this.subscriptionGetLocations = this._heroLocationService.getLocations()
      .subscribe(
        locations => {
          this._storageService.locations = locations;
          this.locationStatus = true;
        },
        error => {
          this.errorMessage = <any>error
        }
      );

    this.subscriptionGetRoom = this._heroLocationService.getRoom()
      .subscribe(
        rooms => {
          this._storageService.rooms = rooms;
          this.roomStatus = true;
        },
        error => {
          this.errorMessage = <any>error
        }
      );

  }

  showLocation = function (el) {
    if (this._storageService.locations && this._storageService.locations[parseInt(el)]) {
      return this._storageService.locations[parseInt(el)];
    } else {
      return "";
    }
  };



  getHeroes(el) {
    this.subscriptionGetHeroes = this._heroService.getHeroes(el).subscribe(

      heroes => {
        let heroList;
        let totalLocation = {};
        this.heroes = [];
        this.totalLocation = [];
        heroList = heroes;
        totalLocation = {};
        let totalLocationOffline = {};
        totalLocationOffline = {};

        heroList.map(function (el) {
          el['showDetails'] = false;
          this.heroes.push(el);
          if (this.showLocation(el.location1)) {
            let locationName = this.showLocation(el.location1);
            if (el.status == "online" || el.status == "invisible") {
              totalLocation[locationName] = totalLocation[locationName] + 1 || 1;
            }
            totalLocationOffline[locationName] = totalLocationOffline[locationName] + 1 || 1;
          }
        }.bind(this));
        for (let loc in totalLocation) {
          if (totalLocation.hasOwnProperty(loc)) {
            this.totalLocation.push({
              location: loc,
              count: totalLocation[loc]
            });
          }
        }
        for (let loc in totalLocationOffline) {
          if (totalLocationOffline.hasOwnProperty(loc)) {
            this.totalLocationOffline.push({
              location: loc,
              count: totalLocationOffline[loc]
            });
          }
        }
        this.showMap();
        this.heroesOnline = new FilterHeroesByOnline().transform(heroes, []).length;
      },
      error => {
        this.errorMessage = <any>error
      }
    );
  }

  showMap() {
    jQuery(".map-item").css("display", "none");
    this.totalLocation.map(function(el){
      console.log(el);
      setTimeout(() => {
        jQuery("#"+el['location'].replace(" ", "-")).css('display', 'block').css('transform', 'scale('+(2+parseInt(el['count'])/3)+')');
      },0);
    });
  }

  showDIff(el) {
    let now, heroDate, diff;
    now = moment().utcOffset(3);
    heroDate = el;
    diff = now.diff(heroDate, 'minutes');
    return diff;
  }

}
