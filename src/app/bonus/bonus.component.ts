import {Component, OnInit, Input} from '@angular/core';
import {BonusService}   from './bonus.service';
import {StorageService}   from '../shared/storage.service';

@Component({
  selector: 'bonus',
  providers: [BonusService],
  template: require('app/bonus/bonus.component.html'),
  inputs: [
    '_bonusHero: bonusHero'
  ]
})

export class Bonus implements OnInit {

  private _bonusHero;
  errorMessage:string;
  subscriptionGetLocations;
  clanBonus = [];

  constructor(private _bonusService:BonusService,
              private _storageService:StorageService) {
  }

  private getBonus = function (name) {
    this.subscriptionGetLocations = this._bonusService.getBonus(name)
      .subscribe(
        el => {
          this.clanBonus = el;
        },
        error => {
          this.errorMessage = <any>error
        }
      );
  };

  ngOnInit() {
    this.clanBonus = [];
    console.log(this._bonusHero);
    this.getBonus(this._bonusHero);

  }


  ngOnChanges() {
    this.clanBonus = [];
    console.log(this._bonusHero);
    this.getBonus(this._bonusHero);
  }


}
