import {Component, OnInit, Input} from '@angular/core';
import {HeroLocationService}   from './hero-location.service';
import {StorageService}   from '../shared/storage.service';

@Component({
  selector: 'hero-location',
  template: require('app/location/hero-location.component.html'),
  inputs: [
      '_locationId: heroLocation',
      '_roomId: heroRoom',
      '_roomDataBase:roomDataBase',
      '_locationDataBase:locationDataBase'
  ]
})

export class HeroLocationComponent implements OnInit {

  errorMessage: string;
  private _locationId: any;
  private _roomId: any;

  locationTitle: string;
  roomTitle: string;

  constructor(
      private _heroLocationService: HeroLocationService,
      private _storageService: StorageService
  ) { }

  ngOnInit() {
      this.locationTitle = this.showLocation(this._locationId);
      this.roomTitle = this.showRoom(this._roomId + " " + this._locationId);
  }


ngOnChanges(){
    this.locationTitle = this.showLocation(this._locationId);
    this.roomTitle = this.showRoom(this._roomId + " " + this._locationId);
}

  showLocation(el) {
       if(this._storageService.locations && this._storageService.locations[parseInt(el)]) {
           return this._storageService.locations[parseInt(el)];
       } else {
           return "";
       }
   }
   showRoom(el) {
       if(this._storageService.rooms && this._storageService.rooms[el]) {
           return this._storageService.rooms[el];
       } else {
           return "";
       }
   }

}
