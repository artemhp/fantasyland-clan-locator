import {Injectable}     from '@angular/core';
declare var moment:any;

@Injectable()
export class DateService {
  showDIff(el) {
    let now = moment().utcOffset(3);
    return now.diff(el, 'minutes');
  }
}
