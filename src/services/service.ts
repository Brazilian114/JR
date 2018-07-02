// import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
@Injectable()
export class Service {
  // public hostWebService:string = 'http://192.168.1.108/RF-Service_ekapab/RFService.asmx';
  public hostWebService:string;
  public hostWebService1:string = 'http://192.168.1.108/API_Service/api/po';
  url:string;
  constructor(private http: Http, private storage: Storage, private alertCtrl: AlertController){

    this.storage.get('_url').then((res)=>{
      this.url = res;
     this.hostWebService = "http://"+this.url+"/RF-Service_JRFB/RFService.asmx";

      //this.hostWebService = "http://"+this.url+"/RF-Service/RFService.asmx";  //debug

    })
  }

//JSON
//POST

doLoginPost(oUsername:string, oPassword:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
                user_id:oUsername,
                password:oPassword
              };
    // var response = this.http.post(this.hostWebService1+'/Check_Login',body,options)
   var response = this.http.post(this.hostWebService1+'/Check_Login', JSON.stringify(body), {headers:headers})
   .map((res) => res.json());
   console.log(JSON.stringify(body));
   return response;
}
doLoginGet(oUsername:string, oPassword:string){
    var url = this.hostWebService1+'/Login' + '?oUsername=' + oUsername + "&oPassword=" + oPassword;
    var response = this.http.get(url).map(res => res.json());
    return response;
}

//GET
//NEW
get_login(Username,Password) {
  let parameters='oUsername='+Username+'&oPassword='+Password;
  return this.http.get(this.hostWebService +"/Check_Login?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(), function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_client(User) {
  let parameters='User='+User;
  return this.http.get(this.hostWebService +"/Get_Client?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_showitemlist(oClient,oReceiptNO,oPONo,oItemNO) {
  let parameters='oClient='+oClient+'&oReceiptNO='+oReceiptNO+'&oPONo='+oPONo+'&oItemNO='+oItemNO;
  return this.http.get(this.hostWebService +"/ShowItemList?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}


get_receipt_detail(oClient, oReciptNo, oReceiptType, oBook) {
  let parameters='oClient='+oClient+'&oReciptNo='+oReciptNo+'&oReceiptType='+oReceiptType+'&oBook='+oBook;
  return this.http.get(this.hostWebService +"/rfSelReceiptNoList?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_PO(oClient,  oPO, oItem) {
  let parameters='oClient='+oClient+'&oPONO='+oPO+'&oReceiptType='+oItem;
  return this.http.get(this.hostWebService +"/Get_PO?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_new_pallet(oClient) {
  let parameters='oClient='+oClient;
  return this.http.get(this.hostWebService +"/Get_New_Pallet?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_item_no(oClient) {
  let parameters='oClient='+oClient+'&oItemNO='+"";
  return this.http.get(this.hostWebService +"/Get_ItemNo?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_item_code_ref_ASN(oClient, oReceipt, oDocRef, oItemNo) {
  let parameters='oClient='+oClient+'&oReceipt='+oReceipt+'&oDocRef='+oDocRef+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/setItemCodeRefASN?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_item_code_ref_PO(client, item_no, po_ref) {
  let parameters='client='+client+'&item_no='+item_no+'&po_ref='+po_ref;
  return this.http.get(this.hostWebService +"/setItemCodeRefPO?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_UOM(oClient, oItemNo) {
  let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/Get_UOM?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_UOM_Branch(oClient, oItemNo) {
  let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/Get_UOM_Branch?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_UOM_Branch_Return(oClient, oItemNo) {
  let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/Get_UOM_Branch_Return?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_Grade() {
  // let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/Get_Grade?")
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_ListItemInPalletLocation_ByPallet(oClient,oPallet) {
  let parameters='oClient='+oClient+'&oPallet='+oPallet;
  return this.http.get(this.hostWebService +"/Get_ListItemInPalletLocation_ByPallet?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_ListItemInPalletLocation_ByPallet_ByRecNum(oClient,oPallet,oRecNum) {
  let parameters='oClient='+oClient+'&oPallet='+oPallet+'&oRecNum='+oRecNum;
  return this.http.get(this.hostWebService +"/Get_ListItemInPalletLocation_ByPallet_ByRecNum?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
item_Relocation(oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM, oMaker) {
  let parameters='oSrcPallet='+oSrcPallet+'&oDestWhse='+oDestWhse+'&oDestLoc='+oDestLoc+'&oDestPallet='+oDestPallet+'&oClient='+oClient+'&oItem='+oItem
  +'&oSrcRec='+oSrcRec+'&oQty='+oQty+'&oUOM='+oUOM+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Item_Relocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_exist_pallet_location(oWarehouse, oPallet, oReceiptNO) {
  let parameters='oWarehouse='+oWarehouse+'&oPallet='+oPallet+'&oReceiptNO='+oReceiptNO;
  return this.http.get(this.hostWebService +"/Get_Exist_Pallet_Location?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_pallet_for_putaway(oPallet) {
  let parameters='oPallet='+oPallet;
  return this.http.get(this.hostWebService +"/Get_Pallet_For_Putaway?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_putaway_detail(oOrderNo, oItem, oUser) {
  let parameters='oOrderNo='+oOrderNo+'&oItem='+oItem+'&oUser='+oUser;
  return this.http.get(this.hostWebService +"/Get_PutAway_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_wo(oClient, oWO, oMaker) {
  let parameters='oClient='+oClient+'&oWO='+oWO+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/GetWoStockMovements?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_wo_sum(oClient, oWO, oMaker) {
  let parameters='oClient='+oClient+'&oWO='+oWO+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/GetWoSum?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_TranferStockMovements(oClient, oWO, oMaker) {
  let parameters='oClient='+oClient+'&oWO='+oWO+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/GetTranferStockMovements?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_Detail_Tranfer_WorkOrder(oWO) {
  let parameters='oWO='+oWO;
  return this.http.get(this.hostWebService +"/Get_Detail_Tranfer_WorkOrder?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_location_warehouse(oClient, oItemNO, oWH, oLOC) {
  let parameters='oClient='+oClient+'&oItemNO='+oItemNO+'&oWH='+oWH+'&oLOC='+oLOC;
  return this.http.get(this.hostWebService +"/Get_Loaction_Warehouse?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_itemrelocation(oClient, oItemNO, oWH, oLOC_DESC, oLOC) {
  let parameters='oClient='+oClient+'&oItemNO='+oItemNO+'&oWH='+oWH+'&oLOC_DESC='+oLOC_DESC+'&oLOC='+oLOC;
  return this.http.get(this.hostWebService +"/Get_Loaction_Zone_Warehouse?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_warehouse_loc() {
  // let parameters='oClient='+oClient+'&oItemNO='+oItemNO+'&oWH='+oWH+'&oLOC='+oLOC;
  return this.http.get(this.hostWebService +"/Get_WarehouseLoc?")
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_location_all(oWarehouse, oLocation) {
  let parameters='oWarehouse='+oWarehouse+'&oLocation='+oLocation;
  return this.http.get(this.hostWebService +"/Get_Loaction_all?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_ListPalletInLocation(oWH, oLoc) {
  let parameters='oWH='+oWH+'&oLoc='+oLoc;
  return this.http.get(this.hostWebService +"/Get_ListPalletInLocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_ListItemInPalletLocation(oClient, oItemNo) {
  let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
  return this.http.get(this.hostWebService +"/Get_ListItemInPalletLocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_StockCountRefGet(oClient, oCount_type) {
  let parameters='oClient='+oClient+'&oCount_type='+oCount_type;
  return this.http.get(this.hostWebService +"/StockCountRefGet?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_StockCountListLocation_LocPage(oClient, oStockRef, oWarehouse, oLocation) {
  let parameters='oClient='+oClient+'&oStockRef='+oStockRef+'&oWarehouse='+oWarehouse+'&oLocation='+oLocation;
  return this.http.get(this.hostWebService +"/StockCountListLocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_StockCountListLocation(oClient, oStockRef, oWarehouse, oLocation) {
  let parameters='oClient='+oClient+'&oStockRef='+oStockRef+'&oWarehouse='+oWarehouse+'&oLocation='+oLocation;
  return this.http.get(this.hostWebService +"/GetStockCount?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_ConfirmLocationRelocation(oSRCWhse, oSRCLoc, oDestLoc, oMaker) {
  let parameters='oSRCWhse='+oSRCWhse+'&oSRCLoc='+oSRCLoc+'&oDestLoc='+oDestLoc+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/ConfirmLocationRelocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_ConfirmPalletRelocation(oSRCPallet, oDestWhse, oDestLoc, oDestGrade, oMaker) {
  let parameters='oSRCPallet='+oSRCPallet+'&oDestWhse='+oDestWhse+'&oDestLoc='+oDestLoc+'&oDestGrade='+oDestGrade+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/ConfirmPalletRelocation?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//NEW
get_ReservationOrderDetail(oClient, oBranch, oDate) {
  let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oDate='+oDate;
  return this.http.get(this.hostWebService +"/GetReservationOrderDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_SaleReturnDetail(oClient, oBranch, oDoc_no) {
  let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oDoc_no='+oDoc_no;
  return this.http.get(this.hostWebService +"/GetSaleReturnDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_BarcodeMaster_Ekapab(oClient, oBarcode) {
  let parameters='oClient='+oClient+'&oBarcode='+oBarcode;
  return this.http.get(this.hostWebService +"/Get_BarcodeMaster_Ekapab?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
show_StockList_Item(oClient, oBarcode, oItemNo, oUom) {
  let parameters='oClient='+oClient+'&oBarcode='+oBarcode+'&oItemNo='+oItemNo+'&oUom='+oUom;
  return this.http.get(this.hostWebService +"/Show_StockList_Item?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
show_StockList_Location(oClient, oWarehouse, oLocation) {
  let parameters='oClient='+oClient+'&oWarehouse='+oWarehouse+'&oLocation='+oLocation;
  return this.http.get(this.hostWebService +"/Show_StockList_Location?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//NEW
get_Branch(oClient) {
  let parameters='oClient='+oClient;
  return this.http.get(this.hostWebService +"/Get_Branch?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_UserProfile(oClient) {
  let parameters='oClient='+oClient;
  return this.http.get(this.hostWebService +"/Get_UserProfile?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//NEW
get_detail_workorder(oWO) {
  let parameters='oWO='+oWO;
  return this.http.get(this.hostWebService +"/Get_Detail_WorkOrder?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//NEW
get_detail_workorder_by_select(oWO, oTask, oAct, oUser) {
  let parameters='oWO='+oWO+'&oTask='+oTask+'&oAct='+oAct+'&oUser='+oUser;
  return this.http.get(this.hostWebService +"/Get_Detail_WorkOrderBySelect?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

get_detail_pick_sum(oWO, oClient,   oUser) {
  let parameters='oWO='+oWO+'&oClient='+oClient+ '&oUser='+oUser;
  return this.http.get(this.hostWebService +"/Get_Detail_WorkOrderPickSum?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
get_Detail_Tranfer_WorkOrderBySelect(oWO, oTask, oAct) {
  let parameters='oWO='+oWO+'&oTask='+oTask+'&oAct='+oAct;
  return this.http.get(this.hostWebService +"/Get_Detail_Tranfer_WorkOrderBySelect?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
 //NEW
  get_gradeInLocation(oClient, oItem) {
    let parameters='oClient='+oClient+'&oItem='+oItem;
    return this.http.get(this.hostWebService +"/Get_GradeInLocation?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_ItemLocationsGrade(oClient, oItem, oGrade, oUom) {
    let parameters='oClient='+oClient+'&oItem='+oItem+'&oGrade='+oGrade+'&oUom='+oUom;
    return this.http.get(this.hostWebService +"/Get_ItemLocationsGrade?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_ItemListGrade(oClient, oItem) {
    let parameters='oClient='+oClient+'&oItem='+oItem;
    return this.http.get(this.hostWebService +"/Get_ItemListGrade?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_ItemListUOM(oClient, oItem) {
    let parameters='oClient='+oClient+'&oItem='+oItem;
    return this.http.get(this.hostWebService +"/Get_ItemListUOM?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  gen_rec_num(oGr, oItem, oQty, oRec){
    let parameters='oGr='+oGr+'&oItem='+oItem+'&oQty='+oQty+'&oRec='+oRec;
    return this.http.get(this.hostWebService +"/GenRecNew?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  check_pallet_in_location(pallet, warehouse, location){
    let parameters='pallet='+pallet+'&warehouse='+warehouse+'&location='+location;
    return this.http.get(this.hostWebService +"/CheckPalletInLocation?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  putaway(oPallet, oWarehouse, oLocation, oOperation){
    let parameters='oPallet='+oPallet+'&oWarehouse='+oWarehouse+'&oLocation='+oLocation+'&oOperation='+oOperation;
    return this.http.get(this.hostWebService +"/Putaway?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }

  Get_Chk_Confirm_Location_Putaway(oUsername){
    let parameters='oUsername='+oUsername;
    return this.http.get(this.hostWebService +"/Get_Chk_Confirm_Location_Putaway?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }


  check_wo(oWO){
    let parameters='oWO='+oWO;
    return this.http.get(this.hostWebService +"/Check_WO?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  //NEW
  get_detail_workorder_by_item(oWO, oItem, oUser) {
    let parameters='oWO='+oWO+'&oItem='+oItem+'&oUser='+oUser;
    return this.http.get(this.hostWebService +"/Get_Detail_WorkOrder_byItem?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_wo_stockmovement(oClient, oWO, oMaker) {
    let parameters='oClient='+oClient+'&oWO='+oWO+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/GetWoStockMovements?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  check_task(oWO, oPallet, oTask, oActivity, oUom, oQty, oMaker) {
    let parameters='oWO='+oWO+'&oPallet='+oPallet+'&oTask='+oTask+'&oActivity='+oActivity+'&oUom='+oUom+'&oQty='+oQty+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/PreConfirmationTaskCheck?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  close_picktask(oWO, oTaskNo, oActNO, oQtyPick, oReasonCode, oMaker, oUOM, oPalletTo) {
    let parameters='oWO='+oWO+'&oTaskNo='+oTaskNo+'&oActNO='+oActNO+'&oQtyPick='+oQtyPick+'&oReasonCode='+oReasonCode+'&oMaker='+oMaker
    +'&oUOM='+oUOM+'&oPalletTo='+oPalletTo;
    return this.http.get(this.hostWebService +"/ClosePickTaskEkapab?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }

  close_pickSum(oWO, oMaker,oQtyPick, oUOM, oPalletFromConfirm, oLocation_confirm,oItem, oBacth, oExp, oProd) {
    let parameters='oWO='+oWO +'&oQtyPick='+oQtyPick+ '&oMaker='+oMaker
    +'&oUOM='+oUOM+'&oPalletTo='+oPalletFromConfirm+'&oItem_no='+oItem+'&oLocation_confirm='+oLocation_confirm+'&oBacth='+oBacth+'&oExp='+oExp+'&oProd='+oProd  ;
    return this.http.get(this.hostWebService +"/ClosePickSum?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }

  get_ClientWarehouse(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/GetClientWarehouse?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Zone(warehouse, user) {
    let parameters='warehouse='+warehouse+'&user='+user;
    return this.http.get(this.hostWebService +"/Get_ZoneByUser?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Supplier(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Supplier?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:false},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_WarehouseByUser(user) {
    let parameters='user='+user;
    return this.http.get(this.hostWebService +"/Get_WarehouseByUser?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Book() {
    return this.http.get(this.hostWebService +"/showBookGR?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Book_CN() {
    return this.http.get(this.hostWebService +"/showBookCN?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Station(oWarehouse) {
    let parameters='oWarehouse='+oWarehouse;
    return this.http.get(this.hostWebService +"/Get_Station_CheckIN?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Incoming_Header(oClient, oSupplier, oReceiptDate) {
    let parameters='oClient='+oClient+'&oSupplier='+oSupplier+'&oReceiptDate='+oReceiptDate;
    return this.http.get(this.hostWebService +"/GetIncoming_Header?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Pallet_List(oClient, oReceiptNo) {
    let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo;
    return this.http.get(this.hostWebService +"/Get_Pallet_List?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Pallet_List_Detail(oClient, oReceiptNo, oPalletNo) {
    let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo+'&oPalletNo='+oPalletNo;
    return this.http.get(this.hostWebService +"/Get_Pallet_List_Detail?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Receipt_List_Detail_Closed(oClient, oReceiptNo) {
    let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo;
    return this.http.get(this.hostWebService +"/Get_Receipt_List_Detail_Closed?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Barcode_Detail(oClient, oBarcode) {
    let parameters='oClient='+oClient+'&oBarcode='+oBarcode;
    return this.http.get(this.hostWebService +"/Get_Barcode_Detail?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Receipt_Get_Check_Barcode(oClient, oReceiptNo , oBarcode) {
    let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo+'&oBarcode='+oBarcode;
    return this.http.get(this.hostWebService +"/Receipt_Get_Check_Barcode?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  statusLocation(oWarehouseFrom, oZoneFrom, oLocationFrom, oWarehouseDesc, oZoneDesc, oLocationDesc) {
    let parameters='oWarehouseFrom='+oWarehouseFrom+'&oZoneFrom='+oZoneFrom+'&oLocationFrom='+oLocationFrom
    +'&oWarehouseDesc='+oWarehouseDesc+'&oZoneDesc='+oZoneDesc+'&oLocationDesc='+oLocationDesc;
    return this.http.get(this.hostWebService +"/statusLocation?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
              console.log(a);
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.string._
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  closePickTaskTranfer(oWO, oTaskNo, oActNO, oQtyPick, oUOM, oReasonCode, oLocation, oMaker) {
    let parameters='oWO='+oWO+'&oTaskNo='+oTaskNo+'&oActNO='+oActNO+'&oQtyPick='+oQtyPick+'&oUOM='+oUOM
    +'&oReasonCode='+oReasonCode+'&oLocation='+oLocation+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/ClosePickTaskTranfer?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Item_Barcode(oClient, oBarcode) {
    let parameters='oClient='+oClient+'&oBarcode='+oBarcode;
    return this.http.get(this.hostWebService +"/Get_Item_Barcode?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Pallet_For_Replenishment(oClient, oPallet) {
    let parameters='oClient='+oClient+'&oPallet='+oPallet;
    return this.http.get(this.hostWebService +"/Get_Pallet_For_Replenishment?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Data_Pallet_For_Replenishment(oClient, oPallet, oBarcode) {
    let parameters='oClient='+oClient+'&oPallet='+oPallet+'&oBarcode='+oBarcode;
    return this.http.get(this.hostWebService +"/Get_Data_Pallet_For_Replenishment?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Loaction_all(oWarehouse, oLocation) {
    let parameters='oWarehouse='+oWarehouse+'&oLocation='+oLocation;
    return this.http.get(this.hostWebService +"/Get_Loaction_all?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Data_Barcode_For_Replenishment(oClient, oBarcodeFr, oQty, oUom, oBarcodeTo) {
    let parameters='oClient='+oClient+'&oBarcodeFr='+oBarcodeFr+'&oQty='+oQty+'&oUom='+oUom+'&oBarcodeTo='+oBarcodeTo;
    return this.http.get(this.hostWebService +"/Get_Data_Barcode_For_Replenishment?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  closed_Replenishment(oRecNum, oClient, oItem, oWarehouse, oLocationFR, oPallet, oLocationTO, oBarcodeFR, oBarcodeTO, oQtyFR, oUomFR, oQtyTO, oUomTO, oMaker) {
    let parameters='oRecNum='+oRecNum+'&oClient='+oClient+'&oItem='+oItem+'&oWarehouse='+oWarehouse+'&oLocationFR='+oLocationFR+'&oPallet='+oPallet
    +'&oLocationTO='+oLocationTO+'&oBarcodeFR='+oBarcodeFR+'&oBarcodeTO='+oBarcodeTO+'&oQtyFR='+oQtyFR+'&oUomFR='+oUomFR+'&oQtyTO='+oQtyTO
    +'&oUomTO='+oUomTO+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/Closed_Replenishment?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  assign_Manual_Pick_by_Order(oClient, oMaker) {
    let parameters='oClient='+oClient+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/Assign_Manual_Pick_by_Order?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_WO_Pick_by_Order(oClient, oMaker) {
    let parameters='oClient='+oClient+'&oMaker='+oMaker;
    return this.http.get(this.hostWebService +"/Get_WO_Pick_by_Order?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_WO_Pick_by_Order_Detail(oClient, oOrderNo, oWorksOrder) {
    let parameters='oClient='+oClient+'&oOrderNo='+oOrderNo+'&oWorksOrder='+oWorksOrder;
    return this.http.get(this.hostWebService +"/Get_WO_Pick_by_Order_Detail?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Stock_Pick_by_Order(oClient, oItemNo, oUom, oQtyPick, oWarehouse, oZone, oGrade, oPallet) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo+'&oUom='+oUom+'&oQtyPick='+oQtyPick
    +'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oGrade='+oGrade+'&oPallet='+oPallet;
    return this.http.get(this.hostWebService +"/Get_Stock_Pick_by_Order?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  show_Pick_Sales_Detail(oWorkOrder) {
    let parameters='oWorkOrder='+oWorkOrder;
    return this.http.get(this.hostWebService +"/Show_Pick_Sales_Detail?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  getBranchReturnHeader(oClient, oBranch, oDoc_no) {
    let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oDoc_no='+oDoc_no;
    return this.http.get(this.hostWebService +"/getBranchReturnHeader?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  getBranchReturnList(oClient, oBranch, oStartDate, oEndDate) {
    let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oStartDate='+oStartDate+'&oEndDate='+oEndDate;
    return this.http.get(this.hostWebService +"/getBranchReturnList?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  getReasonReturnCode() {
    // let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oStartDate='+oStartDate+'&oEndDate='+oEndDate;
    return this.http.get(this.hostWebService +"/getReasonReturnCode?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_Pallet_To_by_Works(oWorksOrder) {
    let parameters='oWorksOrder='+oWorksOrder;
    return this.http.get(this.hostWebService +"/Get_Pallet_To_by_Works?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  getBranchReturn_Header(oClient, oCustomer) {
    let parameters='oClient='+oClient+'&oCustomer='+oCustomer;
    return this.http.get(this.hostWebService +"/GetBranchReturn_Header?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  rf_get_sale_for_receipt_return(oClient, oCustomer,oDocref) {
    let parameters='oClient='+oClient+'&oCus='+oCustomer+'&oSale='+oDocref;

    return this.http.get(this.hostWebService +"/rf_get_sale_for_receipt_return?"+parameters)

      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }

  get_Receipt_Return_Differ_From_Branch_Return(oClient, oCustomer, oRefNo) {
    let parameters='oClient='+oClient+'&oCustomer='+oCustomer+'&oRefNo='+oRefNo;
    return this.http.get(this.hostWebService +"/Get_Receipt_Return_Differ_From_Branch_Return?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  get_ProductOther(oClient, oItemNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
    return this.http.get(this.hostWebService +"/Get_ProductOther?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Branch_Receipt_Checkin_Detail_In_Packing(oClient, oLoadingSummaryNo, oPackingNo, oBranch) {
    let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo+'&oBranch='+oBranch;
    return this.http.get(this.hostWebService +"/Get_Branch_Receipt_Checkin_Detail_In_Packing?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_List() {
    // let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_List?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_Truck_Type() {
    // let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_Truck_Type?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_Truck_License_Plate() {
    // let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_Truck_License_Plate?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_Truck_Driver() {
    // let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_Truck_Driver?")
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_Detail_Item_List(oLoadingSummaryNo) {
    let parameters='oLoadingSummaryNo='+oLoadingSummaryNo;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_Detail_Item_List?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Summary_Detail(oLoadingSummaryNo, oClient) {
    let parameters='oLoadingSummaryNo='+oLoadingSummaryNo+'&oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Loading_Summary_Detail?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Loading_Sales_Order_Customer_Info(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Loading_Sales_Order_Customer_Info?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_Branch_Receipt_Checkin_Branch_By_User(oUser) {
    let parameters='oUser='+oUser;
    return this.http.get(this.hostWebService +"/Get_Branch_Receipt_Checkin_Branch_By_User?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
  Get_User(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_User?"+parameters)
      .toPromise()
      .then(response =>
         {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
         });
            try {
                // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
         }
      );
  }
//INSERT
Ins_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, oMaker, oItemBarcode, oStatus, oBranch) {
  let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo+'&oMaker='+oMaker+'&oItemBarcode='+oItemBarcode+'&oStatus='+oStatus+'&oBranch='+oBranch;
  return this.http.get(this.hostWebService +"/Ins_Branch_Receipt_Checkin_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Save_Loading_Summary_Header(oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver, oMaker) {
  let parameters='oLoadingSummaryNo='+oLoadingSummaryNo+'&oStatus='+oStatus+'&oDeliveryDate='+oDeliveryDate+'&oVehicle='+oVehicle+'&oVehicleType='+oVehicleType+'&oDriver='+oDriver+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Save_Loading_Summary_Header?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Save_Loading_Summary_Detail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo, oMaker ,oDeliveryNo) {
  let parameters='oLoadingSummaryNo='+oLoadingSummaryNo+'&oClient='+oClient+'&oSalesOrder='+oSalesOrder+'&oCustomer='+oCustomer
  +'&oPackingNo='+oPackingNo+'&oMaker='+oMaker+'&oDeliveryNo='+oDeliveryNo;
  return this.http.get(this.hostWebService +"/Save_Loading_Summary_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Confirm_Loading_Summary_Detail(oLoadingSummaryNo, oMaker) {
  let parameters='oLoadingSummaryNo='+oLoadingSummaryNo+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Confirm_Loading_Summary_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Delete_Loading_Summary_Detail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo, oMaker , oDeliveryNo) {
  let parameters='oLoadingSummaryNo='+oLoadingSummaryNo+'&oClient='+oClient+'&oSalesOrder='+oSalesOrder+'&oCustomer='+oCustomer+'&oPackingNo='+oPackingNo+'&oMaker='+oMaker+'&oDeliveryNo='+oDeliveryNo;
  return this.http.get(this.hostWebService +"/Delete_Loading_Summary_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Summary_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, oMaker, oBranch) {
  let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo+'&oMaker='+oMaker+'&oBranch='+oBranch;
  return this.http.get(this.hostWebService +"/Summary_Branch_Receipt_Checkin_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Del_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, oQty, oMaker, oItemBarcode, oStatus, oBranch) {
  let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo+'&oQty='+oQty+'&oMaker='+oMaker+'&oItemBarcode='+oItemBarcode+'&oStatus='+oStatus+'&oBranch='+oBranch;
  return this.http.get(this.hostWebService +"/Del_Branch_Receipt_Checkin_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Confirm_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, oMaker, oBranch) {
  let parameters='oClient='+oClient+'&oLoadingSummaryNo='+oLoadingSummaryNo+'&oPackingNo='+oPackingNo+'&oMaker='+oMaker+'&oBranch='+oBranch;
  return this.http.get(this.hostWebService +"/Confirm_Branch_Receipt_Checkin_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Closed_Receipt_Master(oClient, oReceiptNo, oMaker) {
  let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Closed_Receipt_Master?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
       });
          try {
              // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
insert_user(oUsername,oName,oPassword,oEmail,otel,oTextAddress,oProvince_Id,oAmphur_Id,oDistricts_Id,oPost_code) {
  let parameters='oUsername='+oUsername+'&oName='+oName+'&oPassword='+oPassword+'&oEmail='+oEmail+'&otel='+otel+'&oTextAddress='+oTextAddress
  +'&oProvince_Id='+oProvince_Id+'&oAmphur_Id='+oAmphur_Id+'&oDistricts_Id='+oDistricts_Id+'&oPost_code='+oPost_code;
  return this.http.get(this.hostWebService +"/Insert_UserProfile?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
          return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
CreateBranchReturnHeader(oClient, oBranch, oMaker) {
  let parameters='oClient='+oClient+'&oBranch='+oBranch+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/CreateBranchReturnHeader?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
          return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
ConfirmWorksOrderbyOrder(oClient, oSalesOrder, oWorkOrder, oMaker) {
  let parameters='oClient='+oClient+'&oSalesOrder='+oSalesOrder+'&oWorkOrder='+oWorkOrder+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Confirm_Works_Order_by_Order?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
          return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Checkin_Receipt_Return_NEW(oClient, oReceiptNo, oMaker) {
  let parameters='oClient='+oClient+'&oReceiptNo='+oReceiptNo+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Checkin_Receipt_Return_NEW?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
          }
          catch (e) {
            return [];
          }
       }
    );
}
receipt_checkin_by_pallet(oClient, oReciptNo, oUser, oPallet) {
  let parameters='oClient='+oClient+'&oReciptNo='+oReciptNo+'&oUser='+oUser+'&oPallet='+oPallet;
  return this.http.get(this.hostWebService +"/receipt_checkin_by_pallet?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_receipt_detail_udf(oClient, oReciptNo, oReceiptDate, oLine, oPallet, oItem, oUOM, oQTY, oGrade, oLocation, oBatch, oLot, oMaker, oBarcode, oRemark,oExpiry,oMfg) {
  let parameters='oClient='+oClient+'&oReciptNo='+oReciptNo+'&oReceiptDate='+oReceiptDate+'&oLine='+oLine+'&oPallet='+oPallet+'&oItem='+oItem+'&oUOM='
  +oUOM+'&oQTY='+oQTY+'&oGrade='+oGrade+'&oLocation='+oLocation+'&oBatch='+oBatch+'&oLot='+oLot+'&oMaker='+oMaker+'&oBarcode='+oBarcode+'&oRemark='+oRemark+'&oExpiry='+oExpiry+'&oMfg='+oMfg;
  return this.http.get(this.hostWebService +"/update_receipt_detail_udf?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_Stock_Count(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oItemBarcode, oUOM, oSQty, oCQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner, oMaker) {
  let parameters='oSttRef='+oSttRef+'&oRecNum='+oRecNum+'&oWh='+oWh+'&OLoc='+OLoc+'&oPallet='+oPallet+'&oClient='+oClient+'&oItem='+oItem
  +'&oItemBarcode='+oItemBarcode+'&oUOM='+oUOM+'&oSQty='+oSQty+'&oCQty='+oCQty+'&oGrade='+oGrade+'&oLotNo='+oLotNo+'&oBatNo='+oBatNo+'&oExpDate='+oExpDate
  +'&oProdDate='+oProdDate+'&oSize='+oSize+'&oColor='+oColor+'&oClass='+oClass+'&oOwner='+oOwner+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Update_Stock_Count?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//UPDATE
//NEW
Pick_Sales_Detail(oClient, oSoNo, oReference, oWoNo, oLineNo, oQtyPick, oUom, oPallet_Fr, oWarehouse_Fr, oLocation_Fr, oItemNo, oBarcodeNo, oPallet_To, oMaker) {
  let parameters="oClient="+oClient+'&oSoNo='+oSoNo+'&oReference='+oReference+'&oWoNo='+oWoNo+'&oLineNo='+oLineNo+'&oQtyPick='+oQtyPick+'&oUom='+oUom+'&oPallet_Fr='+oPallet_Fr
  +'&oWarehouse_Fr='+oWarehouse_Fr+'&oLocation_Fr='+oLocation_Fr+'&oItemNo='+oItemNo+'&oBarcodeNo='+oBarcodeNo+'&oPallet_To='+oPallet_To+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Pick_Sales_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Reverse_Receipt_Pallet(oClient, oReceiptNo, oPallet, oMaker) {
  let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oPallet='+oPallet+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Reverse_Receipt_Pallet?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Reverse_Trx_SIbyOrder_by_Task(oClient, oWorkOrder, oSalesOrder, oTask, oActivity, oMaker) {
  let parameters="oClient="+oClient+'&oSalesOrder='+oSalesOrder+"&oWorkOrder="+oWorkOrder+'&oTask='+oTask+'&oActivity='+oActivity+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Reverse_Trx_SIbyOrder_by_Task?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_reservation_order_detail(oClient, oBranch, oLine_no, oItem_no, oUom, oQty, oRemark, oSource, oMarker, flag) {
  let parameters="oClient="+oClient+'&oBranch='+oBranch+'&oLine_no='+oLine_no+'&oItem_no='+oItem_no+'&oUom='+oUom
  +'&oQty='+oQty+'&oRemark='+oRemark+'&oSource='+oSource+'&oMarker='+oMarker+'&flag='+flag;
  return this.http.get(this.hostWebService +"/UpdateReservationOrderDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_sale_return_detail(oClient, oDoc_no, oBranch, oLine_no, oItem_no, oUom, oQty, oRemark, oSource, oMarker, oReason_code) {
  let parameters="oClient="+oClient+'&oDoc_no='+oDoc_no+'&oBranch='+oBranch+'&oLine_no='+oLine_no+'&oItem_no='+oItem_no+'&oUom='+oUom
  +'&oQty='+oQty+'&oRemark='+oRemark+'&oSource='+oSource+'&oMarker='+oMarker+'&oReason_code='+oReason_code;
  return this.http.get(this.hostWebService +"/UpdateSaleReturnDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_receipt_header(oClient, oReceiptNo, oStation, oWarehouse, oZone, oType, oCarrier, oVehicle, oContainer, oDate, oCustomer, oSupplier, oClientPoNo, oClientSoNo, oRemarks, oRefNo, oStatus, oMaker, oRepl) {
    let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oStation='+oStation+'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oType='+oType+'&oCarrier='+oCarrier+'&oVehicle='+oVehicle+'&oContainer='+oContainer
    +'&oDate='+oDate+'&oCustomer='+oCustomer+'&oSupplier='+oSupplier+'&oClientPoNo='+oClientPoNo+'&oClientSoNo='+oClientSoNo+'&oRemarks='+oRemarks+'&oRefNo='+oRefNo+'&oStatus='+oStatus+'&oMaker='+oMaker+'&oRepl='+oRepl;
  return this.http.get(this.hostWebService +"/Update_Receipt_Header?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_receipt_header_new(oClient, oBook, oReceiptNo, oReceiptDate, oIncoming, oStation, oWarehouse, oZone, oType, oContainer, oSupplier, oClientSoNo, oRemarks, oRefNo, oStatus, oMaker, oInvoice, oInvoice_Date, oAsn_flag) {
    let parameters="oClient="+oClient+'&oBook='+oBook+'&oReceiptNo='+oReceiptNo+'&oReceiptDate='+oReceiptDate
    +'&oIncoming='+oIncoming+'&oStation='+oStation+'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oType='+oType
    +'&oContainer='+oContainer+'&oSupplier='+oSupplier+'&oClientSoNo='+oClientSoNo+'&oRemarks='+oRemarks+'&oRefNo='+oRefNo
    +'&oStatus='+oStatus+'&oMaker='+oMaker+'&oInvoice='+oInvoice+'&oInvoice_Date='+oInvoice_Date;
  return this.http.get(this.hostWebService +"/Update_Receipt_Header_NEW?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_receipt_detail_new(oClient, oReceiptNo, oReceiptDate, oIncoming, oPONO, oLine, oPallet, oItem, oBarcode, oUOM, oQTY, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, oMaker,oAsn_flag,listZone,oLoc) {
    let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oReceiptDate='+oReceiptDate+'&oIncoming='+oIncoming
    +'&oPONO='+oPONO+'&oLine='+oLine+'&oPallet='+oPallet+'&oItem='+oItem+'&oBarcode='+oBarcode
    +'&oUOM='+oUOM+'&oQTY='+oQTY+'&oGrade='+oGrade+'&oLot='+oLot+'&oBatch='+oBatch
    +'&oExpiry='+oExpiry+'&oMfg='+oMfg+'&oSize='+oSize+'&oColor='+oColor+'&oClass='+oClass+'&oMaker='+oMaker+'&oAsn_flag='+oAsn_flag+'&listZone='+listZone+'&oLoc='+oLoc;
  return this.http.get(this.hostWebService +"/Update_Receipt_Detail_NEW?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_receipt_detail_old(oClient, oReceiptNo, oReceiptDate, oPONO, oLine, oPallet, oItem,  oUOM, oQTY, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, oMaker,oPoLine,oAsnLine) {
    let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oReceiptDate='+oReceiptDate
    +'&oPONO='+oPONO+'&oLine='+oLine+'&oPallet='+oPallet+'&oItem='+oItem
    +'&oUOM='+oUOM+'&oQTY='+oQTY+'&oGrade='+oGrade+'&oLot='+oLot+'&oBatch='+oBatch
    +'&oExpiry='+oExpiry+'&oMfg='+oMfg+'&oSize='+oSize+'&oColor='+oColor+'&oClass='+oClass+'&oMaker='+oMaker+'&oPoLine='+oPoLine+'&oAsnLine='+oAsnLine;
  return this.http.get(this.hostWebService +"/Update_Receipt_Detail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}

update_Receipt_Summary_Line(oClient, oReceiptNo, oPallet, oMaker) {
  let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oPallet='+oPallet+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Receipt_Summary_Line?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_Receipt_Check_Barcode(oClient, oReceiptNo , oBarcode, oMaker) {
  let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oBarcode='+oBarcode+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Update_Receipt_Check_Barcode?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
update_Receipt_Return_Header_NEW(oClient, oBook, oReceiptNo, oReceiptDate, oIncoming, oStation, oWarehouse, oZone, oType
  , oContainer, oCustomer, oClientSoNo, oRemarks, oRefNo, oStatus, oMaker) {
    let parameters="oClient="+oClient+'&oBook='+oBook+'&oReceiptNo='+oReceiptNo+'&oReceiptDate='+oReceiptDate
    +'&oIncoming='+oIncoming+'&oStation='+oStation+'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oType='+oType
    +'&oContainer='+oContainer+'&oCustomer='+oCustomer+'&oClientSoNo='+oClientSoNo+'&oRemarks='+oRemarks
    +'&oRefNo='+oRefNo+'&oStatus='+oStatus+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Update_Receipt_Return_Header_NEW?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:false}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
rfCcUpdateCycleCount(oMaker, oWh, OLoc, oPallet, oClient, oItem, oUOM, oSQty, oCQty, oGrade, oSttRef, oRecNum, oLotNo
  , oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner,oRemarks) {
  let parameters="oMaker="+oMaker+'&oWh='+oWh+'&OLoc='+OLoc+'&oPallet='+oPallet+'&oClient='+oClient+'&oItem='+oItem
  +'&oUOM='+oUOM+'&oSQty='+oSQty+'&oCQty='+oCQty+'&oGrade='+oGrade+'&oSttRef='+oSttRef+'&oRecNum='+oRecNum
  +'&oLotNo='+oLotNo+'&oBatNo='+oBatNo+'&oExpDate='+oExpDate+'&oProdDate='+oProdDate+'&oSize='+oSize+'&oColor='+oColor
  +'&oClass='+oClass+'&oOwner='+oOwner+'&oRemarks='+oRemarks;
  return this.http.get(this.hostWebService +"/rfCcUpdateCycleCount?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
Close_Sale_Return(oClient, oBranch, oDoc_No, oMaker) {
  let parameters="oClient="+oClient+'&oBranch='+oBranch+'&oDoc_No='+oDoc_No+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Close_Sale_Return?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
            return [];
          }
       }
    );
}
//DELETE
//NEW
delete_ReceiptLineSerial(oClient, oReciptNo, oLineNo, oMaker) {
  let parameters="oClient="+oClient+'&oReciptNo='+oReciptNo+'&oLineNo='+oLineNo+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/DeleteReceiptLineSerial?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
          }
          catch (e) {
            return [];
          }
       }
    );
}
delete_Receipt_Check_Barcode(oClient, oReceiptNo, oBarcode, oMaker) {
  let parameters="oClient="+oClient+'&oReceiptNo='+oReceiptNo+'&oBarcode='+oBarcode+'&oMaker='+oMaker;
  return this.http.get(this.hostWebService +"/Delete_Receipt_Check_Barcode?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
          }
          catch (e) {
            return [];
          }
       }
    );
}
delete_reservation_order_detail(oClient, oBranch, oLine_no, oItem_no, oUom, oQty, oRemark, oSource, oMarker) {
  let parameters="oClient="+oClient+'&oBranch='+oBranch+'&oLine_no='+oLine_no+'&oItem_no='+oItem_no+'&oUom='+oUom+'&oQty='+oQty+'&oRemark='+oRemark+'&oSource='+oSource+'&oMarker='+oMarker;
  return this.http.get(this.hostWebService +"/DeleteReservationOrderDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
          }
          catch (e) {
            return [];
          }
       }
    );
}
delete_sale_return_detail(oClient, oDoc_no, oBranch, oLine_no, oItem_no, oUom, oQty, oRemark, oSource, oMarker, oReason_code) {
  let parameters="oClient="+oClient+'&oDoc_no='+oDoc_no+'&oBranch='+oBranch+'&oLine_no='+oLine_no+'&oItem_no='+oItem_no+'&oUom='+oUom
  +'&oQty='+oQty+'&oRemark='+oRemark+'&oSource='+oSource+'&oMarker='+oMarker+'&oReason_code='+oReason_code;
  return this.http.get(this.hostWebService +"/DeleteSaleReturnDetail?"+parameters)
    .toPromise()
    .then(response =>
       {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true}, function (err,result) {
          a = result;
       });
          try {
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
          }
          catch (e) {
            return [];
          }
       }
    );
}

}
