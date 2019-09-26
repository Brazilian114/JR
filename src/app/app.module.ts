import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { WMSHandheld } from './app.component';

import { Service } from '../services/service';
import { DatePipe } from '@angular/common'
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DocumentViewer } from '@ionic-native/document-viewer';

@NgModule({
  declarations: [
    WMSHandheld,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WMSHandheld
      ,
      {
        platforms : {
          android : {
            backButtonText: 'ย้อนกลับ',
            backButtonIcon: 'ios-arrow-back',
            scrollPadding: false,
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            // ,
            scrollAssist: false,    // Valid options appear to be [true, false]
            autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
          }
        }
      }
  ),
    HttpModule,
    IonicStorageModule.forRoot(),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WMSHandheld,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Service,
    DatePicker,
    BarcodeScanner,
    Keyboard,
    Network,
    ScreenOrientation,
    DocumentViewer,
    DatePipe
  ]
})
export class AppModule {}
