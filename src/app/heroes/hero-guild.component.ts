import {Component, OnInit, Input} from '@angular/core';
import {UiFunctions}   from '../shared/ui-functions.service';

@Component({
  selector: 'guild',
  template: require('app/heroes/hero-guild.component.html'),
  inputs: [
    '_guildId: guildId',
    '_guildText: guildText'
  ]
})

export class HeroGuildComponent implements OnInit {
  _guildId: number;
  _guildText: string;
  guildSrc: string;
  guildTitleText: string;
  constructor(private _uiFunctions: UiFunctions) {}

  ngOnInit() {
      this.guildSrc = this._uiFunctions.showGuildImg(this._guildId);
      this.guildTitleText = this._uiFunctions.showGuildName(this._guildId) + ' ' + this._guildText;
  }

  ngOnChanges() {
      this.guildSrc = this._uiFunctions.showGuildImg(this._guildId);
      this.guildTitleText = this._uiFunctions.showGuildName(this._guildId) + ' ' + this._guildText;
  }

}
