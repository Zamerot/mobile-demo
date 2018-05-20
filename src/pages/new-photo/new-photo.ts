import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { PhotoLibrary } from '@ionic-native/photo-library';

import { AlbumViewPage } from '../album-view/album-view'
import { Photo } from '../../providers/album/photo'

/**
 * A page for the purpose of creating/modifying photo entires within a slide show
 */
@IonicPage()
@Component({
  selector: 'page-new-photo',
  templateUrl: 'new-photo.html',
})
export class NewPhotoPage {

  pageTitle: string

  base64Image: any;

  title: string

  duration: string

  /**
   * Constructor
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public ngZone: NgZone) {


  }

  /**
   * Initializes the page once displayed for createing a new photo
   * or modifying an existing photo depending on the parameters provided
   * when displaying htis page
   */
  ionViewDidLoad() {
    let durationDate = new Date();
    const photo = this.navParams.get('photo')

    this.ngZone.run(() => {

      if (photo) {
        this.title = photo.title
        this.base64Image = photo.imageBase64
        this.pageTitle = "Edit Photo"
        durationDate = photo.duration
      } else {
        this.pageTitle = "New Photo"
        durationDate.setMinutes(0);
        durationDate.setSeconds(0);
      }

      // IONIC requires dates within an ISO string format
      this.duration = durationDate.toISOString();
    })

  }

  /**
   * Accesses the phones photo gallery allowing the user to select
   * a photo to display
   */
  accessGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Submits all changes made within the form and closes this page
   */
  submit() {

    const date = new Date(this.duration);

    const photo = {
      title: this.title,
      imageBase64: this.base64Image,
      duration: date
    }

    this.navCtrl.getPrevious().data.newPhoto = photo
    this.navCtrl.pop()
  }
}
