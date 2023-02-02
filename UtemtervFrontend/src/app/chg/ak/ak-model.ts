export class Ak {
    public chg_line: string;
    public chg_from: number;
    public chg_to: number;
    public chg_time: string

    constructor(chg_line: string, chg_from: number, chg_to: number, chg_time: string) {
        this.chg_line = chg_line
        this.chg_from = chg_from
        this.chg_to = chg_to
        this.chg_time = chg_time
    }
}
