import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewAlbumPage } from '../pages/new-album/new-album'
import { AlbumViewPage } from '../pages/album-view/album-view'
import { NewPhotoPage } from '../pages/new-photo/new-photo'
import { SlideshowPage } from '../pages/slideshow/slideshow'

import { Camera } from '@ionic-native/camera';
import { AlbumProvider } from '../providers/album/album.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewAlbumPage,
    AlbumViewPage,
    NewPhotoPage,
    SlideshowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewAlbumPage,
    AlbumViewPage,
    NewPhotoPage,
    SlideshowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlbumProvider,
    PhotoLibrary,
    Camera
  ]
})
export class AppModule {}
