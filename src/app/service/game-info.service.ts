import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameInfoService {

    private currentPlayer;
    private currentPlayerSubject = new Subject<number>();
    public currentPlayerObservable = this.currentPlayerSubject.asObservable();

    constructor() {
        this.currentPlayer = 1;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentPlayer(player: number) {
        this.currentPlayer = player;
        this.currentPlayerSubject.next(player);
    }

    switchPlayer() {
        this.setCurrentPlayer(this.getCurrentPlayer() == 1 ? 2 : 1)
    }
}
