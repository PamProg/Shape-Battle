import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../service/user-input.service';
import { Pawn } from '../class/pawn'
import { GameInfoService } from '../service/game-info.service';
import { SetupService } from '../service/setup.service';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

    Arr = Array;

    rows;
    columns;

    pawns: Pawn[][];
    selectedPawn: Object;

    constructor(private userInputService: UserInputService,
        private gameInfoService: GameInfoService,
        private setupService: SetupService) {

    }

    ngOnInit() {
        this.rows = this.setupService.getRows();
        this.columns = this.setupService.getColumns();

        this.pawns = [];
        for (let i = 0; i < this.rows; i++) {
            this.pawns[i] = [];
        }

        // https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript
        this.selectedPawn = {
            "pawn": <Pawn>null,
            "i": <number>null,
            "j": <number>null
        };
    }


    onCellClicked(i: number, j: number) {

        this.handleNewPawn(i, j)

        this.handlePawnSelected(i, j);

        this.handlePawnMovement(i, j);

        this.handlePawnAttack(i, j);
    }

    handlePawnAttack(i: number, j: number) {

        if (this.userInputService.isPawnSelected()) {
            let iOld = this.selectedPawn['i'];
            let jOld = this.selectedPawn['j'];

            if (!this.isCurrentPlayerPawn(i, j) && this.isAValidContactAttack(i, j, iOld, jOld)) {
                this.contactAttack(this.selectedPawn['pawn'], this.pawns[i][j], i, j);
                this.gameInfoService.switchPlayer();
            }
        }

    }


    contactAttack(attackingPawn: Pawn, targetPawn: Pawn, i: number, j: number) {
        console.log(attackingPawn);
        console.log(targetPawn);

        const diff = attackingPawn.$contactAtk - targetPawn.$defense;
        const dmg = diff > 0 ? attackingPawn.$contactAtk - targetPawn.$defense : 0;

        this.pawns[i][j].$currentLife -= dmg;

    }

    isAValidContactAttack(i: number, j: number, iOld: number, jOld: number): boolean {
        if (this.pawns[i][j]) {
            return true;
        } else {
            console.log("Error : this.pawns[i][j] undefined");
            return false;
        }
    }

    handlePawnMovement(i: number, j: number) {

        if (this.userInputService.isPawnSelected()) {

            let iOld = this.selectedPawn['i'];
            let jOld = this.selectedPawn['j'];

            if (!this.pawns[i][j] && this.isAValidMovement(i, j, iOld, jOld)) {
                // "move" the pawn
                this.pawns[i][j] = this.selectedPawn['pawn'];
                this.pawns[i][j].$selected = false;

                // remove reference to the "old" pawn
                this.pawns[iOld][jOld] = null;
                this.userInputService.setPawnSelected(false);

                this.gameInfoService.switchPlayer();
            }
        }
    }

    isAValidMovement(i: number, j: number, iOld: number, jOld: number): boolean {
        return (Math.abs(i - iOld) == 1 && Math.abs(j - jOld) == 0) || (Math.abs(i - iOld) == 0 && Math.abs(j - jOld) == 1);
    }

    handlePawnSelected(i: number, j: number) {
        if (this.pawns[i][j] && this.isCurrentPlayerPawn(i, j) && !this.userInputService.isNewPawnSelected()) {

            // If the pawn is already selected
            if (this.userInputService.isPawnSelected()) {
                // deselect it
                this.userInputService.setPawnSelected(false);
                this.selectedPawn = null;
                this.pawns[i][j].$selected = false;

            } else {
                this.selectedPawn = {
                    "pawn": this.pawns[i][j],
                    "i": i,
                    "j": j
                }
                this.pawns[i][j].$selected = true;
                this.userInputService.setPawnSelected(true);
            }

        }
    }

    handleNewPawn(i: number, j: number) {
        // If a new pawn is selected AND the cell is free AND there is no pawn selected...
        if (this.userInputService.isNewPawnSelected() && !this.pawns[i][j] && !this.userInputService.isPawnSelected()) {

            let rightSide = false;

            if (this.gameInfoService.getCurrentPlayer() == 1) {
                // If it's the "right" side (bottom side)
                if (i >= 3) {
                    rightSide = true;
                }
            } else {
                // If it's the "right" side (top side)
                if (i < 3) {
                    rightSide = true;
                }
            }

            if (rightSide) {
                let p = this.userInputService.getSelectedNewPawn();
                // ... place the pawn on that cell
                this.pawns[i][j] = p;
                this.userInputService.setNewPawnSelected(false);
                // Change the current player
                this.gameInfoService.switchPlayer()
            }
        }
    }

    isCurrentPlayerPawn(i: number, j: number): boolean {
        if (this.pawns[i][j]) {
            return this.pawns[i][j].$owner == this.gameInfoService.getCurrentPlayer();
        } else {
            console.log("Error : this.pawns[i][j] undefined");
            return false;
        }
    }

}
