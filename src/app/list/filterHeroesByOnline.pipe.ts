import {Pipe, PipeTransform} from "@angular/core";
import 'rxjs/Rx';

@Pipe({
  name: 'filterHeroesByOnline'
})

export class FilterHeroesByOnline implements PipeTransform {
  transform(value: Array<any>, args) {
    var result = [];
    if (value) {
      value.map(function(el) {
        if (el.status == 'online' || el.status == 'invisible') {
            result.push(el);
        }

      });
    }
    return result;
  }
}
