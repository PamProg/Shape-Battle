import { Injectable } from '@angular/core';
import { GameInfoService } from './game-info.service';
import { Pawn } from '../class/pawn'
import { Triangle } from '../class/triangle'
import { Circle } from '../class/circle'
import { Square } from '../class/square'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserInputService {

    selectedNewPawn: Pawn;
    private newPawnSelected: boolean;

    private pawnSelected: boolean;
    private pawnSelectedSubject = new Subject<boolean>();
    public pawnSelectedObservable = this.pawnSelectedSubject.asObservable();

    constructor(private gameInfoService: GameInfoService) {
        this.selectedNewPawn = null;
        this.newPawnSelected = false;
        this.pawnSelected = false;
    }

    isPawnSelected() {
        return this.pawnSelected;
    }

    setPawnSelected(value: boolean) {
        this.pawnSelected = value;
    }

    isNewPawnSelected() {
        return this.newPawnSelected;
    }

    setNewPawnSelected(value: boolean) {
        this.newPawnSelected = value;
    }


    getSelectedNewPawn() {
        return this.selectedNewPawn;
    }

    setSelectedNewPawn(type: string) {
        this.newPawnSelected = true;
        switch (type) {
            case 'triangle':
                this.selectedNewPawn = new Triangle(this.gameInfoService.getCurrentPlayer(), 1);
                break;
            case 'circle':
                this.selectedNewPawn = new Circle(this.gameInfoService.getCurrentPlayer(), 1);
                break;
            case 'square':
                this.selectedNewPawn = new Square(this.gameInfoService.getCurrentPlayer(), 1);
                break;
        }
    }



}
