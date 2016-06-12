import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Hero}           from '../heroes/hero';
import {Observable}     from 'rxjs/Observable';
declare var moment:any;
declare var jQuery:any;

@Injectable()
export class HeroInfoService {
  constructor(private http:Http) {
  }

  private _heroesUrl = 'http://fantasyland.ru/cgi/pl_info.php?login=Artem_The_Great';  // URL to web api

  getHeroInfo(heroId):Observable<Hero[]> {
    this._heroesUrl = 'http://fantasyland.ru/cgi/pl_info.php?login=' + heroId;
    return this.http.get(this._heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let data = res['_body'];
    data = data.replace(/src=['"](..)?(\/)?images\/([\d\w._\-\/]+)['"]/gi, "src='http://fantasyland.ru/images/$3'");

    let levelComplect = jQuery(data).find("[height=225][width=50][rowspan=5][valign='top'][align='center']").find("img").prop("title").split(" :: Уровень обмундирования: ")[1];
    let getimgAvaDom = jQuery(data).find("img[height=225]").attr('src');
    let medalReg = /ShowRank\('([\w\d.]+)'/gi;
    let getMedals = [];

    let getStats = jQuery(data).find("[title='Сила']").closest("table").closest("table").html();
    console.log(getStats);
    let arrayStats = [
      'Сила',
      'Ум',
      'Удача',
      'Власть над Драконами',
      'Власть над Рыцарями',
      'Власть над Дамами',
      'Магия Хаоса',
      'Магия Света',
      'Колдовство',

      'Атака Драконов',
      'Атака Рыцарей',
      'Атака Дам',
      'Защита Дам',
      'Защита Рыцарей',
      'Атака Света',
      'Защита от Света',
      'Атака Хаоса',
      'Защита от Хаоса',
      'Атака Колдовства',
      'Защита от Колдовства',
      'Атака Астрала',
      'Защита от Астрала',

      'Скорость',
      'Концентрация',
      'Защита от Яда'
    ];
    getStats = {'Сила': 1};
    // console.log(data);
    // debugger;

    var match;
    while (( match = medalReg.exec(data) ) != null) {
      getMedals.push(match[1]);
    }


    let myRe = /[\w\d.]+$/gi;
    let imgAva = myRe.exec(getimgAvaDom);

    return {
      'levelComplect': levelComplect,
      'avaSmall': imgAva,
      'medals': getMedals,
      'getStats': getStats
    };
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
