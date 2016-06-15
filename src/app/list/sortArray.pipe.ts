import {Pipe, PipeTransform} from "@angular/core";
import {Hero} from '../heroes/hero';

@Pipe({
  name: 'sortArray'
})

export class SortArray implements PipeTransform {
  transform(value: Array<any>, args: string) {

    var sorByDate = function(a: Hero, b: Hero) {
      if (a['date'] < b['date']) return 1;
      if (a['date'] > b['date']) return -1;
    };

    var sorByLvl = function(a: Hero, b: Hero) {
      return b['level'] - a['level'];
    };

    if (value && args == "date") {
      let onlineArray = [];
      let offlineArray = [];
      value.map(function(el){
        if (el['status']) {
          onlineArray.push(el);
        } else {
          offlineArray.push(el);
        }
      });

      onlineArray = onlineArray.sort(sorByLvl);

      value = onlineArray.concat(offlineArray);

    } else if (value && args == "lvl") {
      value.sort(sorByLvl);
    } else if (value && args == "location") {

      let groupByLocation: Array<any> = [];
      let result: Array<Hero> = [];

      value.map(function(el) {

        var countHeroesInLocation: number = 1;
        var collectionHeroes: Array<Hero> = [];

        if (groupByLocation[el.location1 + " " + el.location2]) {
          countHeroesInLocation = (groupByLocation[el.location1 + " " + el.location2]['count'] || 0) + 1;
          if (groupByLocation[el.location1 + " " + el.location2]['heroes'].length) {
            collectionHeroes = (groupByLocation[el.location1 + " " + el.location2]['heroes']);
            collectionHeroes.push(el);
          } else {
            collectionHeroes = [el];
          }
        } else {
          countHeroesInLocation = 1;
          collectionHeroes = [el];
        }

        groupByLocation[el.location1 + " " + el.location2] = { 'count': countHeroesInLocation, 'heroes': collectionHeroes };
      });

      if (groupByLocation) {
        let sortable: Array<any> = [];
        for (let loc in groupByLocation) {
          groupByLocation[loc]['heroes'].sort(sorByDate);
          sortable.push([loc, groupByLocation[loc]['count'], groupByLocation[loc]['heroes']]);
        }
        sortable.sort(function(a, b) {
          return b[1] - a[1]
        });
        sortable.map(function(el) {
          el[2].map(function(el2) {
            result.push(el2);
          });
        });
      }

      value = result;
    }
    return value;
  }
}
