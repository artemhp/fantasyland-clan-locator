import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Hero}           from '../heroes/hero';
import {Observable}     from 'rxjs/Observable';
declare var moment: any;
declare var jQuery:any;

@Injectable()
export class HeroInfoService {
  constructor(private http: Http) { }
  private _heroesUrl = 'http://fantasyland.ru/cgi/pl_info.php?login=Artem_The_Great';  // URL to web api

  getHeroInfo(heroId): Observable<Hero[]> {

    this._heroesUrl = 'http://fantasyland.ru/cgi/pl_info.php?login=' + heroId;
    return this.http.get(this._heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }


    let data = res['_body'];
    data = data.replace(/src=['"](..)?(\/)?images\/([0-9a-z. а-яA-ZА-Я_\-\/]+)['"]/gi, "src='http://fantasyland.ru/images/$3'");

    let getLevelComplect = jQuery(data).find("[height=225][width=50][rowspan=5][valign='top'][align='center']").find("img").prop("title").split(" :: Уровень обмундирования: ")[1];
    // console.log(data);


    return {getLevelComplect: getLevelComplect};
  }
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
