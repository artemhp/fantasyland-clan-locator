import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'sortArray'
})

export class SortArray implements PipeTransform {



    transform(value: Array<any>, args) {
        if (value) {
            value.sort(function(a, b){
                return b[args] - a[args];
            });
        }
        return value;
    }
}
