import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAlbumPage } from './new-album';

@NgModule({
  declarations: [
    NewAlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAlbumPage),
  ],
})
export class NewAlbumPageModule {}
