import {Component, OnInit, Input} from '@angular/core';
import {BonusService}   from './bonus.service';
import {BonusI}   from './bonus';
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
  private subscriptionGetLocations:any;
  private clanBonus:Array<BonusI> = [];

  constructor(private _bonusService:BonusService) {
  }

  private getBonus = function (name) {
    this.subscriptionGetLocations = this._bonusService.getBonus(name)
      .subscribe(
        el => this.clanBonus = el,
        error => this.errorMessage = error
      );
  };

  ngOnInit() {
    this.clanBonus = [];
    this.getBonus(this._bonusHero);
  }

  ngOnChanges() {
    this.clanBonus = [];
    if (this.subscriptionGetLocations) {
      this.subscriptionGetLocations.unsubscribe();
    }
    this.getBonus(this._bonusHero);
  }

  ngOnDestroy() {
    this.subscriptionGetLocations.unsubscribe();
  }

}
