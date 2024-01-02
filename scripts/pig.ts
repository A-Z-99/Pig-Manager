interface Pig {
    id: number;
    name: string;
    getCategory():category;
    breed: string;
    height: number;
    weight: number;
    personality: string;
    //swimming invariant: 0<=x<=100
    getSwimmingScore?(): number;
    setSwimmingScore?(swimming: number): void;
    //language has no invariant
    language?:string;
    //running invariant: 0<=x<=100
    getRunningScore?(): number;
    setRunningScore?(running: number): void;
    //strength invariant: 1<=x<=10
    getStrengthScore?(): number;
    setStrengthScore?(strength: number): void;
}

export enum category{
    Black,
    Chestnut,
    Grey,
    White
}

export abstract class pig implements Pig{
    static numPigs:number = 0;
    id:number;
    private category:category;
    constructor(public name:string, category:category, public breed:string, public height:number, 
        public weight:number, public personality:string){
            this.id = pig.numPigs;
            this.category = category;
            pig.numPigs++;
    }
    getCategory():category{
        return this.category;
    }
}

export class greyPig extends pig{
    static numGreyPigs:number = 0;
    private swimming:number;
    constructor(name:string, breed:string, height:number, weight:number, personality:string, swimmingScore:number){
        super(name, category.Grey, breed, height, weight, personality);
        //swimmingScore = swimmingScore < 0 ? 0 : swimmingScore > 100 ? 100 : swimmingScore;
        this.setSwimmingScore(swimmingScore);
        this.swimming = swimmingScore;
        greyPig.numGreyPigs++;
    }


    getSwimmingScore(): number{
        return this.swimming;
    }
    setSwimmingScore(swimming: number): void{
        if(swimming > 100){
            this.swimming = 100;
        }
        else if(swimming < 0){
            this.swimming = 0;
        }
        else{
            this.swimming = swimming;
        }
    }
}

export class chestnutPig extends pig{
    static numChestnutPigs:number;
    constructor(name:string, breed:string, height:number, weight:number, personality:string, public language:string){
        super(name, category.Chestnut, breed, height, weight, personality);
        this.language = language;
        chestnutPig.numChestnutPigs++;
    }
}

export class whitePig extends pig{
    static numWhitePigs:number = 0;
    private running:number;
    constructor(name:string, breed:string, height:number, weight:number, personality:string, runningScore:number){
        super(name, category.White, breed, height, weight, personality);
        //runningScore = runningScore < 0 ? 0 : runningScore > 100 ? 100 : runningScore;
        this.setRunningScore(runningScore);
        this.running = runningScore;
        whitePig.numWhitePigs++;
    }


    getRunningScore(): number{
        return this.running;
    }
    setRunningScore(running: number): void{
        if(running > 100){
            this.running = 100;
        }
        else if(running < 0){
            this.running = 0;
        }
        else{
            this.running = running;
        }
    }
}

export class blackPig extends pig{
    static numBlackPigs:number = 0;
    private strength:number;
    constructor(name:string, breed:string, height:number, weight:number, personality:string, strengthScore:number){
        super(name, category.Black, breed, height, weight, personality);
        //strengthScore = strengthScore < 1 ? 1 : strengthScore > 10 ? 10 : strengthScore;
        this.setStrengthScore(strengthScore);
        this.strength = strengthScore;
        blackPig.numBlackPigs++;
    }


    getStrengthScore(): number{
        return this.strength;
    }
    setStrengthScore(strength: number): void{
        if(strength > 10){
            this.strength = 10;
        }
        else if(strength < 1){
            this.strength = 1;
        }
        else{
            this.strength = strength;
        }
    }
}

/*
let myPig:blackPig= new blackPig("bob", "york", 11, 23, "tough", -1)
console.log(myPig);
console.log(greyPig.numGreyPigs);
console.log(blackPig.numBlackPigs);
console.log(pig.numPigs);
console.log("test getCategory" + myPig.getCategory()); 
*/