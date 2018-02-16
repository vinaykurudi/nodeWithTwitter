import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TwitterDetailsComponent } from './twitter-details/twitter-details.component';
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from '@angular/common/http';
import {TwitterService} from './twitter-details/twitter.service';
//import {}
@NgModule({
  declarations: [
    AppComponent,
    TwitterDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
            
        ])
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
