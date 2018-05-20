import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Album } from '../../providers/album/album'
import { AlbumProvider } from '../../providers/album/album.provider'

/**
 * Generated class for the NewAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-album',
  templateUrl: 'new-album.html',
})
export class NewAlbumPage {

  albumName: string;

  albumDesc: string;

  private photoLibrary

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private albumProvider: AlbumProvider) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAlbumPage');

  }

  submit() {
    const album: Album = {
      name: this.albumName,
      description: this.albumDesc,
      photos: []
    }

    this.albumProvider.addAlbum(album);

    this.navCtrl.pop();

  }

}
