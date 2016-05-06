import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';
declare var moment: any;

@Injectable()
export class HeroService {
  constructor(private http: Http) { }
  private _heroesUrl = 'http://www.fantasyland.ru/cgi/technical_clan_status.php?clan_id=109';  // URL to web api
  getHeroes(clanId): Observable<Hero[]> {

    this._heroesUrl = 'http://www.fantasyland.ru/cgi/technical_clan_status.php?clan_id=' + clanId;
    return this.http.get(this._heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let arrayHerroes: any[] = [];

    res.text().split(");").map(function(el, index) {

      let infoColor = "0000"
      let infoPart = el.split("#w");
      var myRegexp1 = /([0-9]+#[0-9]+#[0-9]+)#([\w\u0400-\u04FF-_0-9]+)#([0-9]+-[0-9]+-[0-9]+ [0-9]+:[0-9]+:[0-9]+)#([0-9]+)/gi;
      var match1 = myRegexp1.exec(infoPart[0]);
      var myRegexp2 = /"([\w\u0400-\u04FF-_0-9]+)",([0-9]+),([0-9]+),([0-9]+),"([0-9a-z]+)",?(.+)/gi;
      var match2 = myRegexp2.exec(infoPart[1]);


      var generateObj;


      if (match1 && match2) {

        var myRegexp3 = /,"[\w\u0400-\u04FF\.\ \-)\[\]0-9&;’\s]+",/gi;
        var list = match2[6].split(myRegexp3);
        var listGuild = list.slice(0, -1);
        var myRegexp4 = /"([a-zA-Z]+)"/gi;
        var gender = myRegexp4.exec(list[list.length - 1]);

        var status = match1[1].split("#");
        var statusOnline = false;

        if (status[0] && status[0] == "1") {
          statusOnline = true;
          match1[3] = "2050-05-03 16:05:10";
        }

        generateObj = {
          id: index,
          name: match1[2],
          status: statusOnline,
          location1: status[1],
          location2: status[2],
          combat: match1[4],
          date: moment(match1[3] + " +03:00", "YYYY-MM-DD hh:mm:ss Z"),
          style: match2[4],
          level: match2[3],
          color: match2[5],
          guild: listGuild,
          gender: gender[1]
        };
        arrayHerroes.push(generateObj);
      } else {
        // console.log(match2);
        if (match2) {

          var myRegexp3 = /,"[\w\u0400-\u04FF\.\ \-)\[\]0-9&;’\s]+",/gi;
          var list = match2[6].split(myRegexp3);
          var listGuild = list.slice(0, -1);
          var myRegexp4 = /"([a-zA-Z]+)"/gi;
          var gender = myRegexp4.exec(list[list.length - 1]);

          generateObj = {
            id: index,
            name: match2[1],
            status: false,
            location1: "Unknown",
            location2: "Unknown",
            combat: "0",
            date: moment("2051-05-03 16:05:10 +03:00", "YYYY-MM-DD hh:mm:ss Z"),
            style: match2[4],
            level: match2[3],
            color: match2[5],
            guild: listGuild,
            gender: gender[1]
          };

          arrayHerroes.push(generateObj);
        }

      }
    });
    console.log(arrayHerroes);
    return arrayHerroes || {};
  }
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
