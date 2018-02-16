import { Component, OnInit, OnDestroy } from '@angular/core';
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";

import {TwitterService} from './twitter.service';
@Component({
  selector: 'twitter-details',
  templateUrl: './twitter-details.component.html',
  styleUrls: ['./twitter-details.component.css']
})
export class TwitterDetailsComponent implements OnInit, OnDestroy {

  constructor( private service:TwitterService) {
    this.columnDefs =[{
      headerName:'tweet',
      field:'tweet'
    },
    {
      headerName:'Re Tweet Count',
      field:'retweetCount'
    }];
    this.gridOptions = <GridOptions>{
      rowData:[]
    };
   }

  gridOptions:GridOptions;
  columnDefs: any[];
  rowCount: string;
  api: GridApi;
  columnApi: ColumnApi;
  statuses:Array<any>;
  searchText:string;
  subscriber:any;
  searchBtnInprogress:boolean = false;
  showAlert:boolean = false;
  alertMsg:string = "";
  ngOnInit() {
  }
  ngOnDestroy(){
     this.subscriber.unsubscribe();
  }
  search(){
    if(!this.searchBtnInprogress){
        this.searchBtnInprogress = true;
        this.statuses = [];
        this.subscriber = this.service.getTweets(this.searchText).subscribe(response=>{
          console.log(response);
          this.searchBtnInprogress=false;
          this.showAlert = false;
          this.statuses = (response.statuses) ? response.statuses : [];
        },err=>{
          this.searchBtnInprogress=false;
          console.log(err);
          this.alertMsg = "Unable to get Twitter data!";
          this.showAlert = true;
        });
        this.service.getStreamTweets().subscribe(stream=>{
          console.log(stream);
          this.statuses.push(stream);
        },err=>{
          console.log(err);
        })
    }else{
      this.alertMsg = "Searching is Inprogress!";
      this.showAlert = true;
    }
   
  }
   onReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }
}
