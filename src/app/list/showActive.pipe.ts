import {Pipe, PipeTransform} from "@angular/core";
import 'rxjs/Rx';

@Pipe({
  name: 'showActive'
})

export class ShowActive implements PipeTransform {
  transform(value:Array<any>, args) {
    var result = [];
    if (value && args == true) {
      value.map(function (el) {
        if (el.dateDiff < 120) {
          result.push(el);
        }
      });
    }else {
      result = value;
    }
    return result;
  }
}
