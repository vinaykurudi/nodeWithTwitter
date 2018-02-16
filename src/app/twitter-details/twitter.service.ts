import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class TwitterService {

  socket:any;
  url:string = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }
  getTweets(qry:string='modi#india'):Observable<any>{
    console.log("get tweets called")
    let param:HttpParams = new HttpParams();
    param.set("query",qry);
    return this.http.get('api/search/tweets',{params:new HttpParams().set("query",qry )});
  }

  getStreamTweets(){
    let observable = new Observable(observer => {
          this.socket = io(this.url);
          this.socket.on('searchTweets', (data) => {
            console.log(data);
            observer.next(data);    
          });
          return () => {
            this.socket.disconnect();
          };  
        })     
    return observable;
  }

}
