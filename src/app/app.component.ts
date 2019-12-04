import { Component } from '@angular/core';
import { Song } from './models/song.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lyrics-game';
  public songSelected = false;
  public song: Song;

  onSongSelected(song: Song) {
    this.songSelected = true;
    this.song = song;
  }

  onSongChanged() {
    this.song = null;
    this.songSelected = false;
  }
}
