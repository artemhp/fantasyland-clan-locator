import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
declare var moment:any;

@Injectable()

export class HeroLocationService {

  private _locationUrl = localStorage.getItem('server') + '/cgi/technical_place_list.php';  // URL to web api
  private _roomUrl = localStorage.getItem('server') + '/cgi/technical_loc_list.php';  // URL to web api

  constructor(private http:Http) {
  }

  storageLocation = {};
  storageRoom = {};

  getLocations() {
    return this.http.get(this._locationUrl)
      .map(this.extracLocation)
      .catch(this.handleError);
  }

  getRoom() {
    return this.http.get(this._roomUrl)
      .map(this.extracRoom)
      .catch(this.handleError);
  }


  private extracLocation(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    var myString = res.text();
    var resultSplit = {};
    var splits = myString.split(/([0-9]*\s[а-яА-Я- ]*)/gi);

    splits.map(function (el) {
      if (el) {
        var myRegexp1 = /^([0-9]*)\s([а-яА-Я- ]*)$/gi;
        var match7 = myRegexp1.exec(el.trim());

        resultSplit[match7[1]] = match7[2];
      }
    });

    return resultSplit;
  }

  private extracRoom(res:Response) {

    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    var myString = res.text();
    var resultSplit = {};
    var splits = myString.split(/([0-9]*\s[0-9]*\s[0-9]?[\u0400-\u04FF\a-z\-&; \"\.\:]*)/gi);

    splits.map(function (el) {
      if (el) {
        var myRegexp1 = /([0-9]*)\s([0-9]*)\s([0-9]?[\u0400-\u04FF\a-z\-&; \"\.\:]*)/gi;
        var match8 = myRegexp1.exec(el.trim());
        if (match8) {
          resultSplit[match8[1] + " " + match8[2]] = match8[3].replace("&nbsp;", " ");
        }
      }
    });

    return resultSplit;
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
