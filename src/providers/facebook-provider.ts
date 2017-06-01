import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookProvider {
  private Token = "1589715151323815|2-kQ_MRnD5G4rpR6NmECVyaPmW4"
  private graphUrl = 'https://graph.facebook.com/';

  private graphQuery = `&type=page&fields=id,name,description_html,location,category,phone,picture,cover&access_token=${this.Token}`

  constructor(private http: Http) { }

  /** Get pages by search */
  getPages(pageName: string, pageLocation: string): Observable<any[]> {
    let url = this.graphUrl + "search?q=" + pageName + "%" + pageLocation + this.graphQuery;

    return this.http
      .get(url)
      .map(response => response.json().data);
  };

  private grapQuerybyName = `?fields=id,name,description_html,description,about,location,category,
                             phone,picture.type(large),cover,username,albums{picture.type(album)}&
                             access_token=${this.Token}`
  
  /** Get page data by ID */
  getPageDetails(userName: String) {
    let url = this.graphUrl + userName + this.grapQuerybyName;
    //console.log('page url: ' + url)
    return this.http
      .get(url)
      .map(response => response.json())
  }
}