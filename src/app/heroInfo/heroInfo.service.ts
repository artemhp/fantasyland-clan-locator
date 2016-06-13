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
    let health = {};

    // let getStats = jQuery(data).find("[title='Сила']").closest("table").closest("table").html();
    // console.log(getStats);

    let getStats = {};
    let getStats2 = {};

    let arrayStats2 = [
      'Защита от Дам',
      'Защита от Драконов',
      'Защита от Рыцарей',
      'Защита от Света',
      'Защита от Хаоса',
      'Защита от Колдовства',
      'Защита от Астрала'
    ];
    let arrayStats3 = [
      'Атака Драконов',
      'Атака Рыцарей',
      'Атака Дам',
      'Атака Света',
      'Атака Хаоса',
      'Атака Колдовства',
      'Атака Астрала'
    ];
    let arrayStats1 = [
      'Сила',
      'Ум',
      'Удача',
      'Власть над Драконами',
      'Власть над Рыцарями',
      'Власть над Дамами',
      'Магия Хаоса',
      'Магия Света',
      'Колдовство',
      'Скорость',
      'Восстановление Жизни',
      'Сила Эффектов',
      'Концентрация',
      'Защита от Яда'
    ];

    let textToHtml = jQuery(data);

    arrayStats1.map(function (el) {
      if (el) {
        let statsValue = textToHtml.find("[title='"+el+"']").closest("td").next("td").text() || "0";
        getStats[el] = statsValue;
      }
    });

    arrayStats2.map(function (el) {
      if (el) {
        let statsValue = textToHtml.find("[title='"+el+"']").closest("td").next("td").text() || "0/0";
        getStats[el] = statsValue.split("/")[1];
      }
    });

    arrayStats3.map(function (el) {
      if (el) {
        let statsValue = textToHtml.find("[title='"+el+"']").closest("td").next("td").text() || "0/0";
        getStats[el] = statsValue.split("/")[0];
      }
    });

    var match;
    while (( match = medalReg.exec(data) ) != null) {
      getMedals.push(match[1]);
    }

    let myRe = /[\w\d.]+$/gi;
    let imgAva = myRe.exec(getimgAvaDom);

    let myRe2 = /([\d]+)\/([\d]+)/gi;
    let healthDom = jQuery(data).find("#hp1").text();
    let getHealth = myRe2.exec(healthDom);
    health = {
      'health': getHealth[1],
      'total': getHealth[2]
    };

    return {
      'levelComplect': levelComplect,
      'avaSmall': imgAva,
      'medals': getMedals,
      'getStats': getStats,
      'health': health
    };
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
