import {Injectable}     from '@angular/core';
// import {Http, Response} from 'angular2/http';
// import {Headers, RequestOptions} from 'angular2/http';
// import {Hero}           from './hero';
// import {Observable}     from 'rxjs/Observable';

export class ClanListService {
  private _ids = new Array(1, 4, 3, 6, 7, 8, 10, 13, 11, 12, 15, 16, 18, 21, 28, 33, 42, 41, 46, 70, 54, 59, 204, 62, 148, 65, 66, 68, 78, 136, 109, 149, 113, 127, 129, 161, 137, 139, 141, 153, 176, 164, 169, 200, 174, 194, 192);
  private _cnames = new Array('LDK', 'Столичные Шахтеры', 'Союз Древних', 'Мудрецы', 'Бойцы', 'Охотники Илдиора', 'Орден Равновесия', 'Орден Рассвета', 'Столичные Кузнецы', 'Столичные Ювелиры', 'Портные', 'Хранители Света', 'Собиратели', 'Стражи', 'Алхимики', 'Рыцари Арки', 'Знак Грома', 'Vega', 'Служители Храма', 'Заморские Купцы', 'Гвардия Света', 'Академия Древних', 'Орден Пылающих Драконов', 'Рассвет Новой Эры', 'Братство Славян', 'Хранители Вечности', 'Sigma', 'Учителя', 'Орда Орков', 'The Legends', 'Союз Эльфов', 'Рекруты', 'Гильдия Художников', 'Мафия', 'S i n', 'Серые Стражи', 'Resente Lim', 'Орден Меча и Магии', 'Хранители Тьмы', 'Хранители Энии', 'Sin`s Tiro', 'Орден Восходящего Солнца', 'Дикие Орки', 'Королевские Лабоходы', 'Созвездие Славян', 'The Shades', 'Рыцари круглого стола ');
  private _imgs = new Array('creators_small.gif', 'miners_capital_small.gif', 'ancient_union_small.gif', 'thinkers_small.gif', 'fighters_small.gif', 'hunters_small.gif', 'balance_small.gif', 'dawn_small.gif', 'smith_capital_small.gif', 'jewelry_small.gif', 'tailors_small.gif', 'lightkeepers_small.gif', 'druids_small.gif', 'guard_small.gif', 'alchemists_small.gif', 'kark.gif', 'vega2.gif', 'vega.gif', 'hram.gif', 'merch_small.gif', '0007.gif', 'ancient_akademy_small.gif', 'opd2.gif', 'rassvnovera.gif', 'bsl.gif', 'etern_keepers.gif', 'sd14.GIF', 'teachers.gif', 'horde_small1.gif', 'legends.gif', 'elfunion1.gif', 'recruits_small.gif', 'painter.gif', 'mafia2.gif', 'sin.gif', 'gray_guard.gif', 'resentelim.gif', 'oda.gif', 'DarkKeepers2.gif', 'nasledniki.gif', 'sinstrio.gif', 'rassvet2.gif', 'wildorks.gif', 'labers_small.gif', 'ss.gif', 'shades.gif', 'rks3.gif');
  private _list = [];
  getClanList() {
    return [
      {id: 1, name: 'LDK'},
      {id: 3, name: 'Союз Древних'},
      {id: 136, name: "The Legends" },
      {id: 65,name: "Хранители Вечности"},
      {id: 129,name: "S i n"},
      {id: 10,name: 'Орден Равновесия'},
      {id: 66,name: 'Sigma'},
      {id: 109,name: 'Союз Эльфов'},
      {id: 16,name: 'Хранители Света'},
      {id: 194,name: 'The Shades'},
      {id: 13,name: 'Орден Рассвета'},
      {id: 62,name: 'Рассвет Новой Эры'},
      {id: 148, name: 'Братство Славян'},
      {id: 127,name: 'Мафия'},
      {id: 54,name: 'Гвардия Света'},
      {id: 33,name: 'Рыцыри Арки'},
      {id: 161,name: 'Серые стражи'},
      {id: 141,name: 'Хранители Тьмы'},
      {id: 41,name: 'Vega'},
      {id: 139,name: 'Орден Меча и Магии'},
      {id: 153,name: 'Хранители Энии'},
      {id: 176,name: 'Sin`s Tiro'},
      {id: 78,name: 'Орда Окров'},
      {id: 59, name: 'Академия Древних'},
      {id: 46,name: 'Служители Храма'},
      {id: 137,name: 'Resente Lim'},
      {id: 192,name: 'Рыцари круглого стола'},
      {id: 149,name: 'Рекруты'},
      {id: 169, name: 'Дикие Орки'},
      {id: 164,name: 'Орден Восходящего Солнца'},
      {id: 174,name: 'Созвездие Славян'},
      {id: 113,name: 'Гильдия Художников'},
      {id: 42,name: 'Знак Грома'},
      {id: 204,name: 'Орден Пылающих Драконов'},
    ]
  }


  showGuildImg(id) {
    var showIcon = "";
    this._ids.map(function(el, index) {
      if (el == id) {
        showIcon = localStorage.getItem('server')+"/images/clans/" + this._imgs[index];
      }
    }, this);
    return showIcon;
  }
}
