import {pig, category, greyPig, chestnutPig, whitePig, blackPig} from './pig.js';

interface pigServices {
    add(pig:pig):void;
    getAllStr:() => string;
    getAll:() =>pig[];
    getById:(id:number) => pig;
    getAllofCategory:(cat:category) => pig[]; //returns all pigs of the category sorted alphabetically by name
    delete(id: number):void;
    returnEmpty():boolean; //return true if empty
}

export class pigController implements pigServices{
    pigs:pig[];
    constructor(){
        this.pigs = [];
        if (localStorage.getItem("pigs")){ //load any pigs from localStorage
            let objects:pig[] = JSON.parse(localStorage.pigs);
            objects.forEach(object => { //wrap each object as a new instance of pig
                switch(object["category"]){
                    case category.Black:
                        this.pigs.push(new blackPig(object.name, object.breed, 
                            object.height, object.weight, object.personality, (object as blackPig)["strength"]));
                        break;
                    case category.Chestnut:
                        this.pigs.push(new chestnutPig(object.name, object.breed, 
                            object.height, object.weight, object.personality, (object as chestnutPig)["language"]));
                        break;
                    case category.Grey:
                        this.pigs.push(new greyPig(object.name, object.breed, 
                            object.height, object.weight, object.personality, (object as greyPig)["swimming"]));
                        break;
                    case category.White:
                        this.pigs.push(new whitePig(object.name, object.breed, 
                            object.height, object.weight, object.personality, (object as whitePig)["running"]));
                        break;
                }
                
            });     
        }
    }
    add(pig:pig){
        this.pigs.push(pig);
        localStorage.pigs = JSON.stringify(this.pigs)
    }
    getAllStr(): string{
        return JSON.stringify(this.pigs);
    }
    getAll(): pig[]{
        return this.pigs;
    }
    getById(id:number):pig{
        return this.pigs.find((pig) => pig.id == id) as pig;
    }
    getAllofCategory(cat:category): pig[] {  
        return this.pigs.filter((pig) => pig.getCategory() == cat)
            .sort((pig1, pig2) => pig1.name.localeCompare(pig2.name));;
    }
    delete(id:number):void{
        this.pigs = this.pigs.filter((pig) => pig.id != id);
        localStorage.pigs = JSON.stringify(this.pigs);
    }
    returnEmpty(): boolean {
        return this.pigs.length == 0;
    }
}