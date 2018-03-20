import { Injectable } from '@angular/core';

@Injectable()
export class SetupService {

    rows;
    columns;

    constructor() {
        this.rows = 6;
        this.columns = 3;
    }

    getRows() {
        return this.rows;
    }

    getColumns() {
        return this.columns;
    }

}
