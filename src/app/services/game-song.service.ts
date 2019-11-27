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
            console.log(lines.splice(0, 1));
        }

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

    private getWords(line: string, options: GameOptions): Word[] {
        const allWords = line.match(/\w+|\s+|[^\s\w]+/g);

        if (!allWords) {
            console.log(line);
        } else {
            const words = allWords.map(word => {
                const failsMinSize = word.length < options.minWordSize;
                const failsDifficultyTest = Math.random() * 100 > options.difficulty;
                const readOnly = failsMinSize || failsDifficultyTest;

                return {
                    readOnly,
                    word,
                    userInput: null
                } as Word;
            });

            const normalizedWords = words.reduce((accumulated, word) => {
                const lastWord = accumulated.length ? accumulated[accumulated.length - 1] : null;
                if (word.readOnly && lastWord && lastWord.readOnly) {
                    lastWord.word += word.word;
                } else {
                    accumulated.push(word);
                }

                return accumulated;
            }, [] as Word[]);

            // let readOnlySegment = '';
            // for (const word of words) {
            //     if (!word.readOnly) {
            //         if (readOnlySegment) {
            //             normalizedWords.push({
            //                 readOnly: true,
            //                 word: readOnlySegment,
            //                 userInput: null
            //             } as Word);
            //         }
            //         normalizedWords.push(word);
            //         readOnlySegment = '';
            //     } else {
            //         readOnlySegment += word.word;
            //     }
            // }

            console.log(normalizedWords);

            return normalizedWords;
        }
        return [];
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

    public wordIsCorrect(word: Word) {
        return word.userInput === word.word;
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

