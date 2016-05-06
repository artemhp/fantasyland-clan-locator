import {Injectable}     from 'angular2/core';

@Injectable()

export class UiFunctions {
    private _ids2 = new Array(1, 4, 3, 6, 7, 8, 10, 13, 11, 12, 15, 16, 18, 21, 28, 33, 42, 41, 46, 70, 54, 59, 204, 62, 148, 65, 66, 68, 78, 136, 109, 149, 113, 127, 129, 161, 137, 139, 141, 153, 176, 164, 169, 200, 174, 194, 192);
    private _imgs = new Array('creators_small.gif', 'miners_capital_small.gif', 'ancient_union_small.gif', 'thinkers_small.gif', 'fighters_small.gif', 'hunters_small.gif', 'balance_small.gif', 'dawn_small.gif', 'smith_capital_small.gif', 'jewelry_small.gif', 'tailors_small.gif', 'lightkeepers_small.gif', 'druids_small.gif', 'guard_small.gif', 'alchemists_small.gif', 'kark.gif', 'vega2.gif', 'vega.gif', 'hram.gif', 'merch_small.gif', '0007.gif', 'ancient_akademy_small.gif', 'opd2.gif', 'rassvnovera.gif', 'bsl.gif', 'etern_keepers.gif', 'sd14.GIF', 'teachers.gif', 'horde_small1.gif', 'legends.gif', 'elfunion1.gif', 'recruits_small.gif', 'painter.gif', 'mafia2.gif', 'sin.gif', 'gray_guard.gif', 'resentelim.gif', 'oda.gif', 'DarkKeepers2.gif', 'nasledniki.gif', 'sinstrio.gif', 'rassvet2.gif', 'wildorks.gif', 'labers_small.gif', 'ss.gif', 'shades.gif', 'rks3.gif');

    showGuildImg(id) {
      var showIcon = "";
      this._ids2.map(function(el, index) {
        if (el == id) {
          showIcon = "http://fantasyland.ru/images/clans/" + this._imgs[index];
        }
      }, this);
      return showIcon;
    }
}
