import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

//the vodeoPlayer import
// import { VideoPlayer } from '@ionic-native/video-player/ngx';
//update popup

@NgModule({
  //and declare in declarations
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    IonicStorageModule.forRoot(),
  ], //Ng2SearchPipeModule
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    //  VideoPlayer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
