import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumViewPage } from './album-view';

@NgModule({
  declarations: [
    AlbumViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumViewPage),
  ],
})
export class AlbumViewPageModule {}
