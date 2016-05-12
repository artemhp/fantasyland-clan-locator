import {Component, OnInit, Input} from '@angular/core';
import {UiFunctions}   from './ui-functions.service';

@Component({
  selector: 'guild',
  template: require('app/hero-guild.component.html'),
  inputs: [
    '_guildId: guildId'
  ]
})

export class HeroGuildComponent implements OnInit {
  _guildId: number;
  guildSrc: string;
  constructor(private _uiFunctions: UiFunctions) {}

  ngOnInit() {
      this.guildSrc = this._uiFunctions.showGuildImg(this._guildId);
  }

}
