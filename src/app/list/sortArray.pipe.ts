import {Pipe, PipeTransform} from "@angular/core";
import 'rxjs/Rx';

@Pipe({
  name: 'sortArray'
})

export class SortArray implements PipeTransform {
  transform(value: Array<any>, args) {
    var sorByDate = function(a, b) {
        if (a['date'] < b['date']) return 1;
        if (a['date'] > b['date']) return -1;
    };
    if (value && args == "date") {
      value.sort(sorByDate);
  } else if (value && args == "location") {
      var result = [];
      var counts = {};
      value.map(function(el) {
        var tt = 1;
        var pp = [];
        if (counts[el.location1 + " " + el.location2]) {
          tt = (counts[el.location1 + " " + el.location2]['count'] || 0) + 1;
          if (counts[el.location1 + " " + el.location2]['heroes'].length) {
            pp = (counts[el.location1 + " " + el.location2]['heroes']);
            pp.push(el);
          } else {
            pp = [el];
          }
        }
        counts[el.location1 + " " + el.location2] = { 'count': tt, 'heroes': pp };
      });
      var sortable = [];
      for (var loc in counts) {
          counts[loc]['heroes'].sort(sorByDate);
        sortable.push([loc, counts[loc]['count'], counts[loc]['heroes']]);
      }
      sortable.sort(function(a, b) { return b[1] - a[1] });
      sortable.map(function(el) {
        el[2].map(function(el2) {
          result.push(el2);
        });
      });
      value = result;
    }
    return value;
  }
}
