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

    private removeFirstLinesIfEmpty(lines: string[]) {
        while (lines.length && !lines[0].trim()) {
            console.log(lines.splice(0, 1));
        }

        return lines;
    }

    private getVerses(song: Song, options: GameOptions): Verse[] {
        const lines = this.removeFirstLinesIfEmpty(this.getLyricsLines(song));

        const verses: Verse[] = [new Verse()];

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
                verses.push(new Verse());
            } else {
                verses[verses.length - 1].lines.push(new Line(this.getWords(line, options)));
            }
        }

        return verses;
    }

    private getLyricsLines(song: Song): string[] {
        return song.lyrics ? song.lyrics.split('\n') : null;
    }

    private splitLine(line: string): string[] {
        let splitted = this.splitBy(line, ' ');
        splitted = this.spreadArray(splitted.map(x => this.splitBy(x, ',')));
        splitted = this.spreadArray(splitted.map(x => this.splitBy(x, '.')));

        return splitted;
    }

    private spreadArray(input: any[]): string[] {
        let result = [];

        for (const segment of input) {
            if (segment instanceof Array) {
                result = result.concat(segment);
            } else {
                result.push(segment);
            }
        }

        return result;
    }

    private splitBy(input: string, separator: string): string[] {
        const splitted = input.split(separator);
        const result = [];
        for (let i = 0; i < splitted.length; i++) {
            const element = splitted[i];
            if (i > 0) {
                result.push(separator);
            }
            result.push(element);
        }
        return result;
    }

    private getWords(line: string, options: GameOptions): Word[] {
        // const allWords = line.match(/\w+|\s+|[^\s\w]+/g);
        const allWords = this.splitLine(line);

        if (allWords) {
            const words = this.mapWords(allWords, options);
            const normalizedWords = this.normalizeWords(words);
            return normalizedWords;
        }
        return [];
    }

    private mapWords(line: string[], options: GameOptions) {
        return line.map(word => {
            const failsMinSize = word.length < options.minWordSize;
            const failsDifficultyTest = Math.random() * 100 > options.difficulty;
            const readOnly = failsMinSize || failsDifficultyTest;

            return {
                readOnly,
                word,
                userInput: null
            } as Word;
        });
    }

    private normalizeWords(words: Word[]): Word[] {
        return words.reduce((accumulated, word) => {
            const lastWord = accumulated.length ? accumulated[accumulated.length - 1] : null;
            if (word.readOnly && lastWord && lastWord.readOnly) {
                lastWord.word += word.word;
            } else {
                accumulated.push(word);
            }

            return accumulated;
        }, [] as Word[]);
    }

    public getScore(song: GameSong): {
        correct: number,
        wrong: number,
        total: number,
        score: number
    } {
        const words = this.getEditableWords(song);
        const correct = words.filter(x => this.wordIsCorrect(x)).length;
        const wrong = words.length - correct;
        const total = words.length;
        const score = correct / total;

        return {
            correct,
            wrong,
            total,
            score
        };
    }

    public wordIsCorrect(word: Word): boolean {

        return (word.userInput || '').toUpperCase() === (word.word || '').toUpperCase();
    }

    public getEditableWords(gameSong: GameSong): Word[] {
        const words = [];

        for (const verse of gameSong.verses) {
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

