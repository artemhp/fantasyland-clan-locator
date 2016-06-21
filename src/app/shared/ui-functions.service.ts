import {Injectable}     from '@angular/core';

@Injectable()

export class UiFunctions {
  private _ids2 = new Array(1, 3, 4, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 21, 28, 33, 41, 42, 46, 54, 59, 62, 65, 68, 70, 78, 109, 113, 127, 129, 136, 137, 139, 141, 148, 149, 153, 161, 164, 169, 174, 176, 192, 194, 200, 204);
  private _names = new Array('LDK', 'Союз Древних', 'Столичные Шахтеры', 'Мудрецы', 'Бойцы', 'Охотники Илдиора', 'Орден Равновесия', 'Столичные Кузнецы', 'Столичные Ювелиры', 'Орден Рассвета', 'Портные', 'Хранители Света', 'Собиратели', 'Стражи', 'Алхимики', 'Рыцари Арки', 'Vega', 'Знак Грома', 'Служители Храма', 'Гвардия Света', 'Академия Древних', 'Рассвет Новой Эры', 'Хранители Вечности', 'Учителя', 'Заморские Купцы', 'Орда Орков', 'Союз Эльфов', 'Гильдия Художников', 'Мафия', 'S i n', 'The Legends', 'Resente Lim', 'Орден Меча и Магии', 'Хранители Тьмы', 'Братство Славян', 'Рекруты', 'Хранители Энии', 'Серые Стражи', 'Орден Восходящего Солнца', 'Дикие Орки', 'Созвездие Славян', 'Sin`s Tiro', 'Рыцари круглого стола ', 'The Shades', 'Королевские Лабоходы', 'Орден Пылающих Драконов');
  private _imgs = new Array('creators_small.gif', 'ancient_union_small.gif', 'miners_capital_small.gif', 'thinkers_small.gif', 'fighters_small.gif', 'hunters_small.gif', 'balance_small.gif', 'smith_capital_small.gif', 'jewelry_small.gif', 'dawn_small.gif', 'tailors_small.gif', 'lightkeepers_small.gif', 'druids_small.gif', 'guard_small.gif', 'alchemists_small.gif', 'kark.gif', 'vega.gif', 'vega2.gif', 'hram.gif', '0007.gif', 'ancient_akademy_small.gif', 'rassvnovera.gif', 'etern_keepers.gif', 'teachers.gif', 'merch_small.gif', 'horde_small1.gif', 'elfunion1.gif', 'painter.gif', 'mafia2.gif', 'sin.gif', 'legends.gif', 'resentelim.gif', 'oda.gif', 'DarkKeepers2.gif', 'bsl.gif', 'recruits_small.gif', 'nasledniki.gif', 'gray_guard.gif', 'rassvet2.gif', 'wildorks.gif', 'ss.gif', 'sinstrio.gif', 'rks3.gif', 'shades.gif', 'labers_small.gif', 'opd2.gif');

  showGuildImg(id) {
    var showIcon = "";
    this._ids2.map(function (el, index) {
      if (el == id) {
        showIcon = "http://fantasyland.ru/images/clans/" + this._imgs[index];
      }
    }, this);
    return showIcon;
  }

  showGuildName(id) {
    var showName = "";
    this._ids2.map(function (el, index) {
      if (el == id) {
        showName = this._names[index];
      }
    }, this);
    return showName;
  }
}
