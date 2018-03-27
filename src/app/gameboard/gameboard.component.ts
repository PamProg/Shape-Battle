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
            for (let j = 0; j < this.columns; j++) {
                this.pawns[i][j] = null;
            }
        }

        // https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript
        this.selectedPawn = {
            "pawn": <Pawn>null,
            "i": <number>null,
            "j": <number>null
        };
    }


    onCellClicked(i: number, j: number) {

        this.handlePawnSelected(i, j);

        this.handleNewPawn(i, j)

        this.handlePawnMovement(i, j);

        this.handlePawnAttack(i, j);
    }

    handlePawnAttack(i: number, j: number) {

        if (this.userInputService.isPawnSelected()) {
            let iOld = this.selectedPawn['i'];
            let jOld = this.selectedPawn['j'];

            // TODO : refactor this ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️

            // If the target pawn is "enemy"
            if (!this.isCurrentPlayerPawn(i, j)) {

                if (this.isAValidContactAttack(i, j, iOld, jOld)) {
                    this.contactAttack(this.selectedPawn['pawn'], this.pawns[i][j], i, j);
    
                    if (this.pawns[i][j].$currentLife <= 0) {
                        this.pawns[i][j] = null;
                    }
    
                    this.pawns[iOld][jOld].$selected = false;
                    this.userInputService.setPawnSelected(false);
                } else if (this.isAValidRangedAttack(i, j, iOld, jOld)) {
                    this.rangedAttack(this.selectedPawn['pawn'], this.pawns[i][j], i, j);
    
                    if (this.pawns[i][j].$currentLife <= 0) {
                        this.pawns[i][j] = null;
                    }
    
                    this.pawns[iOld][jOld].$selected = false;
                    this.userInputService.setPawnSelected(false);
                }
            }

        }

    }


    contactAttack(attackingPawn: Pawn, targetPawn: Pawn, i: number, j: number) {
        if (attackingPawn && targetPawn) {
            const diff = attackingPawn.$contactAtk - targetPawn.$defense;
            const dmg = diff > 0 ? attackingPawn.$contactAtk - targetPawn.$defense : 0;

            this.pawns[i][j].$currentLife -= dmg;

            this.selectedPawn = this.resetSelectedPawn();
        } else {
            // console.log("Error : attackingPawn or targetPawn undefined");
        }
    }

    rangedAttack(attackingPawn: Pawn, targetPawn: Pawn, i: number, j: number) {
        if (attackingPawn && targetPawn) {
            const diff = attackingPawn.$rangedAtk - targetPawn.$defense;
            const dmg = diff > 0 ? attackingPawn.$rangedAtk - targetPawn.$defense : 0;

            this.pawns[i][j].$currentLife -= dmg;

            this.selectedPawn = this.resetSelectedPawn();
        } else {
            // console.log("Error : attackingPawn or targetPawn undefined");
        }
    }

    isAValidContactAttack(i: number, j: number, iOld: number, jOld: number): boolean {
        if (this.pawns[i][j] &&
            ((Math.abs(i - iOld) == 1 && Math.abs(j - jOld) == 0) || (Math.abs(i - iOld) == 0 && Math.abs(j - jOld) == 1))) {
            return true;
        } else {
            // console.log("Error : this.pawns[i][j] undefined");
            return false;
        }
    }

    isAValidRangedAttack(i: number, j: number, iOld: number, jOld: number): boolean {
        if (this.pawns[i][j] &&
            ((Math.abs(i - iOld) == 2 && Math.abs(j - jOld) == 0) || (Math.abs(i - iOld) == 0 && Math.abs(j - jOld) == 2))) {
            return true;
        } else {
            // console.log("Error : this.pawns[i][j] undefined");
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

                // TODO : CHECK THIS
                this.pawns[i][j].$currentMovement--;
                // this.pawns[iOld][jOld].$currentMovement--; 
                this.pawns[i][j].$selected = false;

                // remove reference to the "old" pawn
                this.pawns[iOld][jOld] = null;
                this.selectedPawn = this.resetSelectedPawn();
                this.userInputService.setPawnSelected(false);
            }
        }
    }

    isAValidMovement(i: number, j: number, iOld: number, jOld: number): boolean {
        return ((Math.abs(i - iOld) == 1 && Math.abs(j - jOld) == 0) || (Math.abs(i - iOld) == 0 && Math.abs(j - jOld) == 1))
            && this.pawns[iOld][jOld].$currentMovement > 0;
    }

    handlePawnSelected(i: number, j: number) {

        // If the pawn exists AND it's a "current player" pawn AND there is no new pawn selected
        if (this.pawns[i][j] && this.isCurrentPlayerPawn(i, j) && !this.userInputService.isNewPawnSelected()) {

            // If the pawn is already selected
            if (this.pawns[i][j].$selected) {
                // deselect it
                this.selectedPawn = this.resetSelectedPawn();
                this.pawns[i][j].$selected = false;
                this.userInputService.setPawnSelected(false);

                // If another pawn is not already selected
            } else if (this.selectedPawn['pawn'] == null) {
                // selected it
                this.selectedPawn = {
                    "pawn": this.pawns[i][j],
                    "i": i,
                    "j": j
                }
                this.pawns[i][j].$selected = true;
                this.userInputService.setPawnSelected(true);
            } // else : do nothing

        }
    }

    handleNewPawn(i: number, j: number) {
        // If a new pawn is selected AND the cell is free AND there is no pawn selected...
        if (this.userInputService.isNewPawnSelected() && !this.pawns[i][j] && !this.userInputService.isPawnSelected()) {

            let rightSide = false;

            if (this.gameInfoService.getCurrentPlayer() == 1) {
                // If it's the "right" side (bottom side)
                if (i >= (this.setupService.getRows() / 2)) {
                    rightSide = true;
                }
            } else {
                // If it's the "right" side (top side)
                if (i < (this.setupService.getRows() / 2)) {
                    rightSide = true;
                }
            }

            if (rightSide) {
                let p = this.userInputService.getSelectedNewPawn();
                // ... place the pawn on that cell
                this.pawns[i][j] = p;
                this.userInputService.setNewPawnSelected(false);
            }
        }
    }

    isCurrentPlayerPawn(i: number, j: number): boolean {
        if (this.pawns[i][j]) {
            return this.pawns[i][j].$owner == this.gameInfoService.getCurrentPlayer();
        } else {
            // console.log("Error : this.pawns[i][j] undefined");
            return false;
        }
    }

    resetSelectedPawn() {
        return {
            "pawn": null,
            "i": null,
            "j": null
        }
    }

}
