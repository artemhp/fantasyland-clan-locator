import {Injectable}     from '@angular/core';

@Injectable()

export class StorageService {
    locations: {};
    rooms: {};
    clans = [
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
  ];
}
