import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { NewAlbumPage } from '../new-album/new-album'
import { AlbumViewPage } from '../album-view/album-view'

import { Album } from '../../providers/album/album'
import { AlbumProvider } from '../../providers/album/album.provider'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newAlbumPage = NewAlbumPage

  albums: Observable<Album[]>;

  constructor(public navCtrl: NavController, private albumProvider: AlbumProvider) {
    this.albums = this.albumProvider.getAlbums();
  }

  /**
   * Deletes an album from the system
   * 
   * @param album the album to delete
   */
  deleteAlbum(album: Album) {
    this.albumProvider.deleteAlbum(album);
  }

  displayAlbum(album: Album) {
    this.navCtrl.push(AlbumViewPage, { album: album })
  }

  duration(album: Album): string {

    const photos = album.photos

    if (photos.length > 0) {
      const totalDate = photos.map(photo => photo.duration).
        reduce((acc, cur) => {
          const result = new Date()
          result.setHours(0, 0, 0, 0)
          result.setMinutes(cur.getMinutes() + acc.getMinutes())
          result.setSeconds(cur.getSeconds() + acc.getSeconds())

          return result
        })
      return totalDate.getMinutes() + ':' + totalDate.getSeconds()
    } else {
      return "00:00"
    }
  }
}
