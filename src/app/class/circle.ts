import { Pawn } from './pawn'

export class Circle extends Pawn {

    constructor(owner: number, level: number) {

        // name, type, owner, contactAtk, rangedAtk, defense, currentLife, maxLife, 
        // currentMovement, maxMovement, currentNbAttacks, maxNbAttacks, level, exp, selected
        switch (level) {
            case 1:
                super("circle", 2, owner, 1, 2, 1, 3, 3, 1, 1, 1, 1, level, 0, false)
                break;
            case 2:
                super("circle2", 2, owner, 1, 3, 1, 5, 5, 1, 1, 1, 1, level, 0, false)
                break;
            case 3:
                super("circle3", 2, owner, 2, 5, 2, 8, 8, 1, 1, 1, 1, level, 0, false)
                break;
        }

    }

}
