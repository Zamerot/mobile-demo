import {Photo} from './photo'

export interface Album {
    name: string;
    description: string;

    photos: Photo[]
}