import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { WMSHandheld } from './app.component';
import { HomePage } from '../pages/home/home';
import { OperationPage } from '../pages/operation/operation';
import { LoginPage } from '../pages/login/login';
import { CheckinPage } from '../pages/checkin/checkin';
import { ReceiptCheckinReturnPage } from '../pages/receiptcheckinreturn/receiptcheckinreturn';
import { PutawayPage } from '../pages/putaway/putaway';
import { PutawaydetailPage } from '../pages/putawaydetail/putawaydetail';
import { PickbytaskPage } from '../pages/pickbytask/pickbytask';
import { PickbytaskTransferPage } from '../pages/pickbytasktransfer/pickbytasktransfer';
import { ItemrelocationPage } from '../pages/itemrelocation/itemrelocation';
import { StockadjustmentPage } from '../pages/stockadjustment/stockadjustment';
import { PalletrelocationPage } from '../pages/palletrelocation/palletrelocation';
import { LocationinvquePage } from '../pages/locationinvque/locationinvque';
import { LocationrelocationPage } from '../pages/locationrelocation/locationrelocation';
import { StockcountPage } from '../pages/stockcount/stockcount';
import { Stockcount2Page } from '../pages/stockcount2/stockcount2';
import { IteminvquePage } from '../pages/iteminvque/iteminvque';
import { OperationBranchPage } from '../pages/operationBranch/operationBranch';
import { SaleReturnPage } from '../pages/salereturn/salereturn';
import { SaleReturnHeaderPage } from '../pages/salereturnheader/salereturnheader';
import { CheckinOrderPage } from '../pages/checkinorder/checkinorder';
import { ReservationOrderPage } from '../pages/reservationorder/reservationorder';
import { PackingPage } from '../pages/packing/packing';
import { PickbyorderPage } from '../pages/pickbyorder/pickbyorder';
import { PicksummaryPage } from '../pages/picksummary/picksummary';
import { ReplenishmentPage } from '../pages/replenishment/replenishment';
import { StockListPage } from '../pages/stocklist/stocklist';
import { ListPage } from '../pages/list/list';
import { LoadtotruckPage } from '../pages/loadtotruck/loadtotruck';
import { SettingPage } from '../pages/setting/setting';

import { BarcodemodelPage } from '../pages/modal/barcodemodel/barcodemodel';
import { CilentmodelPage } from '../pages/modal/cilentmodel/cilentmodel';
import { CheckbarcodemodelPage } from '../pages/modal/checkbarcodemodel/checkbarcodemodel';
import { PomodalPage } from '../pages/modal/pomodal/pomodal';
import { RecipesmodalPage } from '../pages/modal/recipesmodal/recipesmodal';
import { ItemNomodalPage } from '../pages/modal/itemNo-modal/itemNo-modal';
import { PutawaymodalPage } from '../pages/modal/putawaymodal/putawaymodal';
import { WomodalPage } from '../pages/modal/womodal/womodal';
import { LocationmodalPage } from '../pages/modal/locationmodal/locationmodal';
import { WarehousemodalPage } from '../pages/modal/warehousemodal/warehousemodal';
import { StkmodalPage } from '../pages/modal/stkmodal/stkmodal';
import { itemWObyTaskPage } from '../pages/modal/itemWObyTask-modal/itemWObyTask-modal';
import { SuppliermodelPage } from '../pages/modal/suppliermodel/suppliermodel';
import { IncmodelPage } from '../pages/modal/incmodel/incmodel';
import { PalletmodelPage } from '../pages/modal/palletmodel/palletmodel';
import { DocrefPage } from '../pages/modal/docref/docref';
import { ReceiptreturnmodelmodelPage } from '../pages/modal/receiptreturnmodel/receiptreturnmodel';
import { LoadingsummaryPage } from '../pages/modal/loadingsummary/loadingsummary';
import { VehicletypePage } from '../pages/modal/vehicletype/vehicletype';
import { LicensePage } from '../pages/modal/license/license';
import { DriverPage } from '../pages/modal/driver/driver';
import { SaleorderPage } from '../pages/modal/saleorder/saleorder';

import { Service } from '../services/service';

import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { itemPickSumPage } from '../pages/modal/itemPickSum/itemPickSum';

@NgModule({
  declarations: [
    WMSHandheld,
    HomePage,
    OperationPage,
    LoginPage,
    CheckinPage,
    PutawayPage,
    PickbytaskPage,
    ItemrelocationPage,
    StockadjustmentPage,
    PalletrelocationPage,
    LocationinvquePage,
    LocationrelocationPage,
    StockcountPage,
    IteminvquePage,
    CilentmodelPage,
    RecipesmodalPage,
    ItemNomodalPage,
    PutawaymodalPage,
    PutawaydetailPage,
    WomodalPage,
    LocationmodalPage,
    WarehousemodalPage,
    StkmodalPage,
    SaleReturnPage,
    OperationBranchPage,
    CheckinOrderPage,
    ReservationOrderPage,
    itemWObyTaskPage,
    PickbytaskTransferPage,
    Stockcount2Page,
    PackingPage,
    PomodalPage,
    CheckbarcodemodelPage,
    SuppliermodelPage,
    IncmodelPage,
    PalletmodelPage,
    PickbyorderPage,
    ReplenishmentPage,
    StockListPage,
    SaleReturnHeaderPage,
    ReceiptCheckinReturnPage,
    DocrefPage,
    BarcodemodelPage,
    ReceiptreturnmodelmodelPage,
    ListPage,
    LoadtotruckPage,
    LoadingsummaryPage,
    VehicletypePage,
    LicensePage,
    DriverPage,
    SaleorderPage,
    SettingPage,
    PicksummaryPage,
    itemPickSumPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WMSHandheld
      ,
      {
        platforms : {
          android : {
            backButtonText: 'Back',
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
    HomePage,
    OperationPage,
    LoginPage,
    CheckinPage,
    PutawayPage,
    PickbytaskPage,
    ItemrelocationPage,
    StockadjustmentPage,
    PalletrelocationPage,
    LocationinvquePage,
    LocationrelocationPage,
    StockcountPage,
    IteminvquePage,
    CilentmodelPage,
    RecipesmodalPage,
    ItemNomodalPage,
    PutawaymodalPage,
    PutawaydetailPage,
    WomodalPage,
    LocationmodalPage,
    WarehousemodalPage,
    StkmodalPage,
    SaleReturnPage,
    OperationBranchPage,
    CheckinOrderPage,
    ReservationOrderPage,
    itemWObyTaskPage,
    PickbytaskTransferPage,
    Stockcount2Page,
    PackingPage,
    PomodalPage,
    CheckbarcodemodelPage,
    SuppliermodelPage,
    IncmodelPage,
    PalletmodelPage,
    PickbyorderPage,
    ReplenishmentPage,
    StockListPage,
    SaleReturnHeaderPage,
    ReceiptCheckinReturnPage,
    DocrefPage,
    BarcodemodelPage,
    ReceiptreturnmodelmodelPage,
    ListPage,
    LoadtotruckPage,
    LoadingsummaryPage,
    VehicletypePage,
    LicensePage,
    DriverPage,
    SaleorderPage,
    SettingPage,
    PicksummaryPage,
    itemPickSumPage
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
    DocumentViewer
  ]
})
export class AppModule {}
