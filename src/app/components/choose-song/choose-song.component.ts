import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { LYRICS } from 'src/app/services/mock-songs.service';


@Component({
  selector: 'app-choose-song',
  templateUrl: './choose-song.component.html',
  styleUrls: ['./choose-song.component.css']
})
export class ChooseSongComponent implements OnInit {
  @Output() songSelected: EventEmitter<Song> = new EventEmitter<Song>();
  public song: Song = LYRICS[0];
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.song);
    this.songSelected.emit(this.song);
  }
}
