import {Incalculable} from "./incalculable";

export class Money<A, B> {
    public first: A;
    public second: B;

    constructor(first: A, second: B) {
        this.first = first;
        this.second = second;
    }
}

export class Takehomecalculator {
    private percent: number

    constructor(percent: number) {
        this.percent = percent;
    }

    netAmount(first: Money<number, string>, ...rest : Money<number, string>[] ): Money<number, string> {

        const pairs: Array<Money<number, string>> = Array.from(rest);
        let total: Money<number, string> = first

        for (let next of pairs) {
            if (next.second !== total.second) {
                throw new Incalculable()
            }
        }

        for (const next of pairs) {
            total = new Money<number, string>(total.first + next.first, next.second)
        }

        const amount:number = total.first * (this.percent / 100.0 );
        const tax: Money<number, string> = new Money(Math.trunc(amount), first.second);

        if (total.second !== tax.second) {
            throw new Incalculable()
        }
        return new Money(total.first - tax.first, first.second)
    }

}