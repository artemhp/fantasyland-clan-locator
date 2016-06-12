import {Component, OnInit, Input} from '@angular/core';
import {HeroInfoService}   from './heroInfo.service';
import {CommunicateService}       from '../list/communicate-service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'hero-info',
  template: require('app/heroInfo/heroInfo.html'),
  providers: [HeroInfoService],
  inputs: [
    '_heroId: heroId',
    '_heroStatus: heroStatus'
  ]
})

export class HeroInfoComponent implements OnInit {
  private lvl;
  private avaSmall;
  private medals;
  private getStats;
  private _heroId;
  private _heroStatus;
  private errorMessage: string;
  private subscription;

  constructor(
    private _communicateService: CommunicateService,
    private _heroInfoService: HeroInfoService
  ) {

  }

  clear() {
    this.lvl = "";
    this.subscription.unsubscribe();
  }

  getInfo() {
    this.lvl = "...";
    this.subscription = this._heroInfoService.getHeroInfo(this._heroId).subscribe(
      asd => {
        this.lvl = asd['levelComplect'];
        this.avaSmall = asd['avaSmall'];
        this.medals = asd['medals'];
        this.getStats= asd['getStats'];
      },
      error => {
        this.errorMessage = <any>error
      }
    );
  }

  ngOnInit() {
    this.getInfo();
    this._communicateService.addEvent$.subscribe(
      message => {
        this.clear();
        this.getInfo();
      })
  }
}
