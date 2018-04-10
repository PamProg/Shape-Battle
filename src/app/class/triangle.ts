import { Pawn } from './pawn'

export class Triangle extends Pawn {
    constructor(owner: number, level: number) {

        // name, type, owner, contactAtk, rangedAtk, defense, currentLife, maxLife, 
        // currentMovement, maxMovement, currentNbAttacks, maxNbAttacks, level, exp, selected
        switch (level) {
            case 1:
                super("triangle", 1, owner, 2, 1, 1, 3, 3, 0, 1, 0, 1, level, 0, false)
                break;
            case 2:
                super("triangle2", 1, owner, 4, 1, 1, 5, 5, 0, 1, 0, 1, level, 0, false)
                break;
            case 3:
                super("triangle3", 1, owner, 7, 2, 2, 8, 8, 0, 1, 0, 1, level, 0, false)
                break;
        }

    }
}
