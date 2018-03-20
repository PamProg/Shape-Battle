import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../service/user-input.service';

@Component({
    selector: 'app-option-board',
    templateUrl: './option-board.component.html',
    styleUrls: ['./option-board.component.scss']
})
export class OptionBoardComponent implements OnInit {

    pawnSelected: boolean;

    constructor(private userInputService: UserInputService) {
        this.userInputService.pawnSelectedObservable.subscribe(pawnSelected => {
            this.pawnSelected = pawnSelected;
        })
    }

    ngOnInit() {
        this.pawnSelected = this.userInputService.isPawnSelected();
    }

    shapeSelected(shape: string) {
        if (!this.pawnSelected) {
            this.userInputService.setSelectedNewPawn(shape);

        }
    }

}
