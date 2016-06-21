import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
declare var moment:any;

@Injectable()

export class BonusService {
  private _heroLink = localStorage.getItem('server') + '/cgi/pl_info.php?login=';  // URL to web api
  private getHeroLink = function (el) {
    return this._heroLink + el;
  };

  constructor(private http:Http) {
  }

  getBonus(name) {
    return this.http.get(this.getHeroLink(name))
      .map(this.extracBonus)
      .catch(this.handleError);
  }

  private extracBonus(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let data = res.text();
    let bonusReg = /ShowClanBonus\('([^']+)',\s'([^']+)',\s'([^']+)'\)/gi;
    let tower1Reg = /'gtower2.png'/gi;
    let tower2Reg = /'gtower3.png'/gi;
    let tower3Reg = /'gtower4.png'/gi;
    let getClanBonus = [];
    let match;

    let bonusAdd = function(array, match) {
      let bonusExist = false;
      array.map(function (el) {
        if (el['name'] == match[2]) {
          bonusExist = true;
          el['value'] = el['value'] + parseInt(match[3]);
        }
      });
      if (!bonusExist) {
        array.push(
          {
            'img': match[1],
            'name': match[2],
            'value': parseInt(match[3])
          }
        );
      }
    };

    while (( match = bonusReg.exec(data)) != null) {
      bonusAdd(getClanBonus, match);
    }

    if (tower1Reg.exec(data)) {
      bonusAdd(getClanBonus, ['','luck.gif', 'Удача', 5]);
    } else if (tower2Reg.exec(data)) {
      bonusAdd(getClanBonus, ['','luck.gif', 'Удача', 3]);
    } else if (tower3Reg.exec(data)) {
      bonusAdd(getClanBonus, ['','luck.gif', 'Удача', 1]);

    }

    return getClanBonus;
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
