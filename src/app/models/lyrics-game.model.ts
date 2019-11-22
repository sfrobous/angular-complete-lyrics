import { Song } from './song.model';

export class GameSong {
    public verses: Verse[];
    constructor(public song: Song, public options: GameOptions) { }

}

export class Verse {
    public lines: Line[];
    constructor() {
        this.lines = [];
    }
}

export class Line {
    constructor(public words: Word[]) { }
}

export class Word {
    public word: string;
    public readOnly: boolean;
    public userInput: string;
}

export class GameOptions {
    minWordSize: number;
    difficulty: number;
}