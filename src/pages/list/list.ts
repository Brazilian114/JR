import { Component } from '@angular/core';
import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@IonicPage(
  {name:'ListPage',
  segment: 'List'}
)

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer, public platform: Platform) {

  }

    open() {
      const options: DocumentViewerOptions = {
          title: 'My PDF',
          openWith: { enabled: true }, //this will allow you to open the document with an external application
          print:{ enabled: true },
          // any more options
        };
        // this.document.viewDocument('file:///android_asset/www/assets/pdftest.pdf', 'application/pdf', options);
    }
 }
