import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { withLatestFrom, map, take} from 'rxjs/operators';
import { Photo } from '../../providers/album/photo'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { timer } from 'rxjs/observable/timer';

/**
 * Displays a slide show of images
 */
@IonicPage()
@Component({
  selector: 'page-slideshow',
  templateUrl: 'slideshow.html',
})
export class SlideshowPage {


  private currentPhoto  = new BehaviorSubject<Photo>({title: 'unknown',
                                                      imageBase64: '',
                                                      duration: new Date()})

  currentPhotoObs$ = this.currentPhoto.asObservable();

  activeSubscription: Subscription = undefined

  /**
   * Constructor
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  /**
  * Performs processing after the page has been rendered 
  */
  ionViewDidLoad() {
    const photos = this.navParams.get('photos')

    this.startTimer(0, photos)

    this.currentPhotoObs$.subscribe((photo) => console.log('currentPhotoChanged', photo))
  }

/**
 * Starts a timer to display a photo for its duration. This method
 * is called recursively to display the remaining photos within the provided array
 * 
 * @param index The index of the photo to display first
 * @param photos the photos to display
 */
  startTimer(index: number, photos: Photo[]) {
    
    if(index < photos.length) {
      const photo = photos[index]

      this.currentPhoto.next(photo)

      const duration = (photo.duration.getMinutes() * 60 + 
                       photo.duration.getSeconds()) * 1000

      // timer exists for duration as durations can change for each photo              
      this.activeSubscription =timer(duration).pipe(
        take(1)
      ).subscribe(() => {
        // Call recursive
        index++
        this.startTimer(index, photos)
      })
    }
    else
    {

      // slide show finished
      this.navCtrl.pop()
    }
  } 

  /**
  * Cancels any active timers when the slide show page is left 
  */
  ionViewDidLeave() {
    if(this.activeSubscription) {
      // We have left the page whilst a slideshow is running
      // so cancel the subscription
      this.activeSubscription.unsubscribe()
    }
  }

}
