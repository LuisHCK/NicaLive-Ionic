import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

import 'rxjs/add/operator/map';

import { FacebookProvider } from './../../providers/facebook-provider';

@IonicPage()
@Component({
  selector: 'page-page-details',
  templateUrl: 'page-details.html',
  providers: [FacebookProvider]
})
export class PageDetailsPage {
  details: any
  photos: any
  description: string
  cover: string

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public facebookProvider: FacebookProvider, private sanitizer: DomSanitizer) {
    this.loadData(navParams.get('id'))
  }

  loadData(id) {
    this.facebookProvider
      .getPageDetails(id).subscribe(
      result => {
        this.details = result;
        this.getDescription(result)
        console.log(result)

        /** Try to get photos from page */
        try {
          var jsonAlbums = JSON.stringify(result.albums.data)
          this.photos = JSON.parse(jsonAlbums)
        }
        catch (error) {
          console.log('No Pictures Found')
        }
      })
  }


  /** Get description from aviable strings */
  getDescription(details) {
    if (details.about) {
      this.description = details.about
    }
    else if (details.description) {
      this.description = details.description
    }
    else {
      this.description = 'No se dispone de ninguna descripción'
    }
  }

  /** Navitate to details page */
  gotoPage(id) {
    this.navCtrl.push(PageDetailsPage, {
      id: id
    });
  }

  getBackground(cover){
    if (cover) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${cover})`);
    } else {
      return this.sanitizer.bypassSecurityTrustStyle("url('../assets/cover-default.jpg')")
    }
  }

}
