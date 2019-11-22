import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import { GameSong, GameOptions } from 'src/app/models/lyrics-game.model';
import { GameSongService } from 'src/app/services/game-song.service';

@Component({
  selector: 'app-complete-lyrics',
  templateUrl: './complete-lyrics.component.html',
  styleUrls: ['./complete-lyrics.component.css']
})
export class CompleteLyricsComponent implements OnInit {
  public title: string;
  public gameSong: GameSong;
  public options: GameOptions;

  constructor(
    private songService: SongsService,
    private gameSongService: GameSongService) {
    this.options = {
      minWordSize: 3,
      difficulty: 30
    };
  }

  ngOnInit() {
    this.songService.get('close_nickjonas').then(song => {
      this.title = `${song.artist} - ${song.title}`;
      this.gameSong = this.gameSongService.buildSong(song, this.options);
    });
  }

}
