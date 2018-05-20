import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject' 
import { withLatestFrom, map, take} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import {Album} from './album'

/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

  private albumSubject: BehaviorSubject<Album[]>  = new BehaviorSubject<Album[]>([])

  constructor() {
    console.log('Hello AlbumProvider Provider');
  }

  /**
   * @returns the Album list observable
   */
  getAlbums():  Observable<Album[]> {
    return this.albumSubject.asObservable()
  }

  /**
   *
   * @param album the album to add
   */
  addAlbum(album: Album) {

    Observable.of(album).pipe(
      withLatestFrom(this.albumSubject),
      map(([album, albums]) => {
         albums.push(album)
         return albums;
      })
    ).subscribe( albums => {
      this.albumSubject.next(albums);
    })
  }

  /**
   * 
   * @param album the album to delete
   */
  deleteAlbum(album: Album) {
    Observable.of(album).pipe(
      withLatestFrom(this.albumSubject),
      map(([album, albums]) => albums.filter(inAlbums => inAlbums.name !== album.name))
    ).subscribe( albums => {
      this.albumSubject.next(albums);
    })
  }


}
