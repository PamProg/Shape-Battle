import { Pawn } from '../class/pawn';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SetupService } from './setup.service';

@Injectable()
export class GameInfoService {

    private currentPlayer: number;
    private currentPlayerSubject = new Subject<number>();
    public currentPlayerObservable = this.currentPlayerSubject.asObservable();

    private pawns: Pawn[][];
    private pawnsSubject = new Subject<Pawn[][]>();
    public pawnsObservable = this.pawnsSubject.asObservable();

    constructor(private setupService: SetupService) {
        this.currentPlayer = 1;

        this.pawns = [];
        for (let i = 0; i < this.setupService.getRows(); i++) {
            this.pawns[i] = [];
            for (let j = 0; j < this.setupService.getColumns(); j++) {
                this.pawns[i][j] = null;
            }
        }
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentPlayer(player: number) {
        this.currentPlayer = player;
        this.currentPlayerSubject.next(player);
    }

    getPawns() {
        return this.pawns;
    }

    setPawns(pawns: Pawn[][]) {
        this.pawns = pawns;
        this.pawnsSubject.next(pawns);
    }

    switchPlayer() {
        this.setCurrentPlayer(this.getCurrentPlayer() == 1 ? 2 : 1)
    }

    resetPawns() {
        for (let i = 0; i < this.setupService.getRows(); i++) {
            for (let j = 0; j < this.setupService.getColumns(); j++) {
                if (this.pawns[i][j] != null) {
                    this.pawns[i][j].$currentMovement = this.pawns[i][j].$maxMovement;
                }
            }
        }

        // TODO : add reset nb atks
    }

}
