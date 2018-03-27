
export class Pawn {

    private name: string;
    private type: number;
    private owner: number;

    private contactAtk: number;
    private rangedAtk: number;
    private defense: number;
    private currentLife: number;
    private maxLife: number;
    private currentMovement: number;
    private maxMovement: number;

    private level: number;
    private exp: number;

    private selected: boolean;


    constructor($name: string, $type: number, $owner: number, $contactAtk: number, $rangedAtk: number, $defense: number,
        $currentLife: number, $maxLife: number, $currentMovement: number, $maxMovement: number, $level: number, $exp: number,
        $selected: boolean) {

        this.name = $name;
        this.type = $type;
        this.owner = $owner;
        this.contactAtk = $contactAtk;
        this.rangedAtk = $rangedAtk;
        this.defense = $defense;
        this.currentLife = $currentLife;
        this.maxLife = $maxLife;
        this.currentMovement = $currentMovement;
        this.maxMovement = $maxMovement;
        this.level = $level;
        this.exp = $exp;
        this.selected = $selected;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    public get $type(): number {
        return this.type;
    }

    public set $type(value: number) {
        this.type = value;
    }


    public get $owner(): number {
        return this.owner;
    }

    public set $owner(value: number) {
        this.owner = value;
    }


    public get $contactAtk(): number {
        return this.contactAtk;
    }

    public set $contactAtk(value: number) {
        this.contactAtk = value;
    }


    public get $rangedAtk(): number {
        return this.rangedAtk;
    }

    public set $rangedAtk(value: number) {
        this.rangedAtk = value;
    }


    public get $defense(): number {
        return this.defense;
    }

    public set $defense(value: number) {
        this.defense = value;
    }


    public get $currentLife(): number {
        return this.currentLife;
    }

    public set $currentLife(value: number) {
        this.currentLife = value;
    }


    public get $maxLife(): number {
        return this.maxLife;
    }

    public set $maxLife(value: number) {
        this.maxLife = value;
    }


    public get $currentMovement(): number {
        return this.currentMovement;
    }

    public set $currentMovement(value: number) {
        this.currentMovement = value;
    }


    public get $maxMovement(): number {
        return this.maxMovement;
    }

    public set $maxMovement(value: number) {
        this.maxMovement = value;
    }


    public get $level(): number {
        return this.level;
    }

    public set $level(value: number) {
        this.level = value;
    }


    public get $exp(): number {
        return this.exp;
    }

    public set $exp(value: number) {
        this.exp = value;
    }


    public get $selected(): boolean {
        return this.selected;
    }

    public set $selected(value: boolean) {
        this.selected = value;
    }

}
