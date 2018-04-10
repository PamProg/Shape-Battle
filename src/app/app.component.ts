import { Component } from '@angular/core';
import { UserInputService } from './service/user-input.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Shape Battle';


    constructor(private userInputService: UserInputService) {

    }

}
