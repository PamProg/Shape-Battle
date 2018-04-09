import { Component, OnInit } from '@angular/core';
import { GameInfoService } from '../service/game-info.service';
import { UserInputService } from '../service/user-input.service';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

    currentPlayer: number;

    constructor(private gameInfoService: GameInfoService,
        private userInputService: UserInputService) {
        this.gameInfoService.currentPlayerObservable.subscribe(player => {
            this.currentPlayer = player;
        })

    }

    ngOnInit() {
        this.currentPlayer = this.gameInfoService.getCurrentPlayer();
    }

    endTurn() {
        if (!this.userInputService.isPawnSelected() && !this.userInputService.isNewPawnSelected()) {

            this.gameInfoService.resetPawns();

            this.gameInfoService.switchPlayer();
        }
    }

}
