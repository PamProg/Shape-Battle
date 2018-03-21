import { Pawn } from './pawn'

export class Square extends Pawn {
    constructor(owner: number, level: number) {

        switch (level) {
            case 1:
                super("square", 3, owner, 1, 0, 1, 5, 5, 1, 1, level, 0, false)
                break;
            case 2:
                super("square2", 3, owner, 2, 1, 2, 8, 8, 1, 1, level, 0, false)
                break;
            case 3:
                super("square3", 3, owner, 2, 1, 4, 12, 12, 1, 1, level, 0, false)
                break;
        }

    }
}
