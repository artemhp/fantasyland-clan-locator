import {Pipe, PipeTransform} from "@angular/core";
import 'rxjs/Rx';

@Pipe({
  name: 'sortArray'
})

export class SortArray implements PipeTransform {
  transform(value: Array<any>, args) {
    // console.log(args);
    // console.log(value);
    if (value && args !== "location") {
      value.sort(function(a, b) {
        if (args == "date") {
          if (a[args] < b[args]) return 1;
          if (a[args] > b[args]) return -1;
        }
        else {
          if (a[args] < b[args]) return -1;
          if (a[args] > b[args]) return 1;
        }

        return 0;
      });
  } else if (value) {
        value.map(function(el){
            // console.log(el);
        });
    }
    // console.log(value);
    return value;
  }
}
