import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { FacebookProvider } from './../../providers/facebook-provider';

@IonicPage()
@Component({
  selector: 'page-page-details',
  templateUrl: 'page-details.html',
  providers: [FacebookProvider]
})
export class PageDetailsPage {
  details:any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public facebookProvider: FacebookProvider) {
    this.loadData(navParams.get('id'))
  }

  loadData(id) {
    this.facebookProvider
      .getPageDetails(id).subscribe(
        result => {
          this.details=result;
          console.log(result)
        }
      )
  }

  /** This converts maped data in a readable object */
  mapPage = (pageDetails) => {
    return {
      name: pageDetails.name,
      description: pageDetails.description_html,
      city: this.getCity(pageDetails.location),
      street: this.getCity(pageDetails.location),
      category: pageDetails.category,
      phone: pageDetails.phone,
      picture: pageDetails.picture['data'].url + "",
      cover: this.getJson(pageDetails['cover']),
      id: pageDetails.id
    };
  }

  /** Get json an return url string, if url not exists return a default image */
  getJson(cover) {
    try {
      return cover['source'] + ""
    }
    catch (e) {
      return '../assets/cover.gif'
    }
  }

  /** Navitate to details page */
  gotoPage(id) {
    this.navCtrl.push(PageDetailsPage, {
      id: id
    });
  }

  getCity(location) {
    try {
      return location['city'] + ""
    } catch (e) {
      return ''
    }
  }

  getStreet(location) {
    try {
      return location['street'] + ""
    } catch (e) {
      return ''
    }
  }

}
