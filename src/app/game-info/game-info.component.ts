import { Component, OnInit } from '@angular/core';
import { GameInfoService } from '../service/game-info.service';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

    currentPlayer: number;

    constructor(private gameInfoService: GameInfoService) {
        this.gameInfoService.currentPlayerObservable.subscribe(player => {
            this.currentPlayer = player;
        })

    }

    ngOnInit() {
        this.currentPlayer = this.gameInfoService.getCurrentPlayer();
    }

    endTurn() {
        this.gameInfoService.switchPlayer();
    }

}
