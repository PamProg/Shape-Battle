import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist/angular-font-awesome';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { OptionBoardComponent } from './option-board/option-board.component';

import { UserInputService } from './service/user-input.service'
import { GameInfoService } from './service/game-info.service';
import { GameInfoComponent } from './game-info/game-info.component'
import { SetupService } from './service/setup.service';

@NgModule({
    declarations: [
        AppComponent,
        GameboardComponent,
        OptionBoardComponent,
        GameInfoComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        AngularFontAwesomeModule
    ],
    providers: [
        UserInputService,
        GameInfoService,
        SetupService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
