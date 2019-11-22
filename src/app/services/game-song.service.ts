import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';
import { GameOptions, GameSong, Verse, Line, Word } from '../models/lyrics-game.model';

@Injectable({ providedIn: 'root' })
export class GameSongService {
    constructor() { }

    public buildSong(song: Song, options: GameOptions): GameSong {
        const gameSong = new GameSong(song, options);
        gameSong.verses = this.getVerses(song, options);
        return gameSong;
    }


    private getVerses(song: Song, options: GameOptions): Verse[] {
        const verses: Verse[] = [new Verse()];
        const lines = this.getLyricsLines(song);
        while (lines.length && !lines[0].trim()) {
            lines.splice(0, 1);
        }

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
                verses.push(new Verse());
            }

            verses[verses.length - 1].lines.push(new Line(this.getWords(line, options)));
        }

        return verses;
    }

    private getLyricsLines(song: Song): string[] {
        return song.lyrics ? song.lyrics.split('\n') : null;
    }

    private getWords(line: string, options: GameOptions): Word[] {
        const allWords = line.split(' ');

        const words = allWords.map(word => {
            const minSize = word.length >= options.minWordSize;
            const difficultyTest = Math.random() * 100 > options.difficulty;
            const readOnly = minSize && difficultyTest;

            return {
                readOnly,
                word,
                userInput: null
            };
        });

        return words;
    }
}