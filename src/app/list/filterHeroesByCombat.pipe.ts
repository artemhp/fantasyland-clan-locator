import {Pipe, PipeTransform} from "@angular/core";
import 'rxjs/Rx';

@Pipe({
  name: 'filterHeroesByCombat'
})

export class FilterHeroesByCombat implements PipeTransform {
  transform(value: Array<any>, args) {
    var result = [];
    if (value) {
      value.map(function(el) {
        if (el.combat !== '0') {
            result.push(el);
        }

      });
    }
    return result;
  }
}
