import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LYRICS } from './mock-songs.service';
import { Song } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class SongsService {
    constructor(private http: HttpClient) { }

    public get(key: string): Promise<Song> {
        return new Promise((resolve, reject) => {
            resolve(LYRICS.find(x => x.key === key));
        });
    }
}
