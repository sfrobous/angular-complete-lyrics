import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import { GameSong, GameOptions, Word } from 'src/app/models/lyrics-game.model';
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
  public showValidation: boolean;
  public Math = Math;
  public showAnswer: boolean;

  constructor(
    private songService: SongsService,
    private gameSongService: GameSongService) {
    this.options = {
      minWordSize: 3,
      difficulty: 30
    };
  }

  onSubmit() {
    console.log(this.gameSong);
  }

  ngOnInit() {
    this.songService.get('close_nickjonas').then(song => {
      this.title = `${song.artist} - ${song.title}`;
      this.gameSong = this.gameSongService.buildSong(song, this.options);
      console.log(this.gameSong);
    });
  }

  wordIsCorrect(word: Word) {
    return this.gameSongService.wordIsCorrect(word);
  }

  public get score() {
    return this.gameSongService.getScore(this.gameSong);
  }

  getEditableWords(): Word[] {
    const words = [];

    for (const verse of this.gameSong.verses) {
      for (const line of verse.lines) {
        for (const word of line.words) {
          if (!word.readOnly) {
            words.push(word);
          }
        }
      }
    }

    return words;
  }

}
