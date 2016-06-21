import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Hero}           from '../heroes/hero';
import {DateService}   from '../shared/date.service';
import {Observable}     from 'rxjs/Observable';
declare var moment:any;

@Injectable()
export class HeroService {
  constructor(private http:Http,
              private dateService:DateService) {
  }

  private _heroesUrl = localStorage.getItem('server') + '/cgi/technical_clan_status.php?clan_id=';  // URL to web api


  // Get Array of Heroes
  getHeroes(clanId):Observable<Hero[]> {
    return this.http.get(
      // Plain Text. Not JSON
      this._heroesUrl + clanId
    ).map(
      // Get and transform data
      this.extractData.bind(this)
    ).catch(
      // Handle Error
      this.handleError
    );
  }

  private extractData(res:Response) {
    let arrayHerroes:Hero[] = [];

    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let result = res.text();

    // Look for "Hello"
    var rePattern = /(\d)+#(\d)+#(\d)+#([^#"]+)#(0|\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})(\s0#0#0;|#(\d+))#w\("\4",(\d+),(\d+)?,([0-4]{1})?,"([\d\w]+)?",([\d]+),"([^"]+)\)",(([\d]+),"([а-яА-Я\s-]+)?(\))?(\[([\d]+)])?)",(([\d]+),"([а-яА-Я\s-]+)?(\))?(\[([\d]+)])?)",(([\d]+),"([а-яА-Я\s-]+)?(\))?(\[([\d]+)])?)",([\d]+),\s?"([\w])"\);/gi;
    let arrMatch;
    let indexObj = 0;
    while (arrMatch = rePattern.exec(result)) {
      let generateObj;

      let statusOnline;
      let momentDate;
      let fromNow;
      let dateDiffValue;

      if (arrMatch[5] != 0) {
        momentDate = moment(arrMatch[5] + " +03:00", "YYYY-MM-DD hh:mm:ss Z");
        fromNow =  momentDate.locale("ru").fromNow();
        dateDiffValue = this.dateService.showDIff(momentDate)
      } else {
        momentDate = false;
        fromNow = false;
        dateDiffValue = 0;
      }
      let listGuild = [
        {
          id: arrMatch[15],
          status: arrMatch[16],
          exp: arrMatch[19]
        },
        {
          id: arrMatch[21],
          status: arrMatch[22],
          exp: arrMatch[25]
        },
        {
          id: arrMatch[27],
          status: arrMatch[28],
          exp: arrMatch[31]
        }
      ];

      if (arrMatch[1] == "1") {
        statusOnline = "online";
      } else if (arrMatch[1] == "2") {
        statusOnline = "offline";
      } else if (arrMatch[1] == "3") {
        statusOnline = "invisible";
      }

      generateObj = {
        id: indexObj,
        name: arrMatch[4],
        status: statusOnline,
        location1: arrMatch[2],
        location2: arrMatch[3],
        clanStatus: arrMatch[13],
        location: "",
        combat: arrMatch[7],
        date: momentDate,
        style: arrMatch[10],
        color: arrMatch[11],
        level: arrMatch[9],
        guild: listGuild,
        gender: arrMatch[33],
        dateFromNow: fromNow,
        dateDiff: dateDiffValue
      };
      arrayHerroes.push(generateObj);
      indexObj++;
    }
    return arrayHerroes || {};
  }

  private handleError(error:any) {
    let errMsg = error.message || 'Server error';
    return Observable.throw(errMsg);
  }
}
