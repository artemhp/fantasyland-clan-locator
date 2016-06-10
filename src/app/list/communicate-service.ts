import { Injectable } from '@angular/core'
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class CommunicateService {
  private communicate = new Subject<string>();
  addEvent$ = this.communicate.asObservable();
  dispatchEvent(target: string) {
    this.communicate.next(target);
  }
}
