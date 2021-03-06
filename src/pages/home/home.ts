import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FacebookProvider } from './../../providers/facebook-provider';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { PageDetailsPage } from './../page-details/page-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FacebookProvider]
})
export class HomePage {
  pages = []

  recommends = [
    { "id": '929225050495820', },
    { "id": 'hardbarestelinic' },
    { "id": 'Riffcafe' },
    { "id": 'marzosbar.lounge' },
    { "id": 'restaurantestiptop' },
    { "id": '264463480373744' },
    { "id": '391361374251977' },
    { "id": '304332816268438' },
    { "id": '651882444960889' },
    { "id": 'CelularesEbenezer' }
  ]

  constructor(public navCtrl: NavController, public facebookProvider: FacebookProvider,
    public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    //this.getPages('lugares', 'nicaragua')
    this.getRecommended()
  }

  getRecommended() {
    let loader = this.loadingCtrl.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      for (let page of this.recommends) {
        this.facebookProvider
          .getPageDetails(page.id).subscribe(
          result => {
            this.pages.push(JSON.parse(JSON.stringify(result)))
            //console.log(JSON.parse(JSON.stringify(result)))
          })
      }
      loader.dismiss();
    });

  }


  /** Navitate to details page */
  gotoPage(id) {
    this.navCtrl.push(PageDetailsPage, {
      id: id
    });
  }

  getItems(searchBar) {
    var q = searchBar.srcElement.value;
    if (q) {
      this.facebookProvider.getPages(q, '').subscribe(
        result => {
          this.pages = result;
        })
    }
  }

  resetPages() {
    this.pages.length = 0
    this.getRecommended()
  }
}
