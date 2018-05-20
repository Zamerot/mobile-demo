import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Album } from '../../providers/album/album'
import { Photo } from '../../providers/album/photo'
import { AlbumProvider } from '../../providers/album/album.provider'
import { NewPhotoPage } from '../new-photo/new-photo'
import { SlideshowPage } from '../slideshow/slideshow'
/**
 * Generated class for the AlbumViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-album-view',
  templateUrl: 'album-view.html',
})
export class AlbumViewPage {

  album: Album

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngZone: NgZone) {

    this.album = navParams.get('album')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumViewPage ' + this.album);
   
  }

  ionViewWillEnter() {
    const newPhoto = this.navParams.get('newPhoto')

    if(newPhoto) {
      this.ngZone.run(()=> {

        const index = this.album.photos.findIndex(photo => photo.title === newPhoto.title)

        if(index >= 0) {
          // If the item exists. Then its an edit so we must replace the photo
          this.album.photos[index] = newPhoto
        } else {
          this.album.photos.push(newPhoto)
        }


        this.navCtrl.getActive().data.newPhoto = undefined

      })
      
    }

  
    

    
    console.log('new Photo', this.navParams.get('newPhoto') || null)
  }

  addPhoto() {
    this.navCtrl.push(NewPhotoPage, {photo: undefined})
  }


  editPhoto(photo: Photo) {
    console.log('edit photo', photo)
    this.navCtrl.push(NewPhotoPage, {photo: photo})
  }


  getDurationStr(photo: Photo): string {
    return photo.duration.getMinutes() + ":" + photo.duration.getSeconds()
  }

  play() {
    this.navCtrl.push(SlideshowPage, {photos: this.album.photos})
  }

  canPlay(): boolean {
    return this.album.photos.length == 0
  }


  deletePhoto(photo: Photo) {
    this.album.photos = this.album.photos.filter(albumPhoto => albumPhoto.title !== photo.title)
  }


  moveUp(photo: Photo) {
    if(this.album.photos.length > 1) {
      const index = this.album.photos.findIndex(albumPhoto => albumPhoto.title === photo.title)

      this.swapPhotos(index, index - 1)
    }
  }
 

  moveDown(photo: Photo) {
    if(this.album.photos.length > 1) {
      const index = this.album.photos.findIndex(albumPhoto => albumPhoto.title === photo.title)

      this.swapPhotos(index, index + 1)
    }
  }

  private swapPhotos(index1: number, index2: number) {
      const tmpPhoto = this.album.photos[index1]

      this.album.photos[index1] = this.album.photos[index2]
      this.album.photos[index2] = tmpPhoto 
  }


}
