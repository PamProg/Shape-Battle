
export class Pawn {

    private name: string;
    private type: number;
    private owner: number;

    private meleeAtk: number;
    private rangeAtk: number;
    private defense: number;
    private currentLife: number;
    private maxLife: number;

    private level: number;
    private exp: number;

    private selected: boolean;


    constructor($name: string, $type: number, $owner: number, $meleeAtk: number, $rangeAtk: number, $defense: number,
                $currentLife: number, $maxLife: number, $level: number, $exp: number, $selected: boolean) {
        this.name = $name;
        this.type = $type;
        this.owner = $owner;
        this.meleeAtk = $meleeAtk;
        this.rangeAtk = $rangeAtk;
        this.defense = $defense;
        this.currentLife = $currentLife;
        this.maxLife = $maxLife;
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


    public get $meleeAtk(): number {
        return this.meleeAtk;
    }

    public set $meleeAtk(value: number) {
        this.meleeAtk = value;
    }


    public get $rangeAtk(): number {
        return this.rangeAtk;
    }

    public set $rangeAtk(value: number) {
        this.rangeAtk = value;
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