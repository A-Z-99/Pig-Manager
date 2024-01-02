import {pigController} from  './pigService.js'
import { pig, category, greyPig,chestnutPig,whitePig,blackPig } from './pig.js'

const categorySelection:HTMLSelectElement|null = document.getElementById("category") as HTMLSelectElement;
categorySelection.addEventListener('change', setRow);

//refreshes the main pigs table. Called whenever a new pig is successfully added
function refreshTable():void{
    //delete the previous entries in the table
    document.querySelectorAll("#all-pigs > table > tr").forEach(row => row.remove());
    if(pc.returnEmpty()){ // don't do anything if there are no pigs
        return;
    }
    for(let pigType in category){
        let pigArr:pig[] = pc.getAllofCategory(Number(pigType));
        pigArr.forEach(pig =>{
            //add a new row into the table
            const newRow:HTMLElement = document.createElement("tr");
            const name:HTMLElement = document.createElement("td");
            const categoryLabel:HTMLElement = document.createElement("td");
            const info:HTMLElement = document.createElement("td");
            const del:HTMLElement = document.createElement("td");
            const infoButton:HTMLButtonElement = document.createElement("button");
            const deleteButton:HTMLButtonElement = document.createElement("button");
            //Give the buttons their properties
            infoButton.textContent = "More Info";
            deleteButton.textContent = "Delete";
            name.textContent = pig.name;
            categoryLabel.textContent = category[pigType];
            info.appendChild(infoButton);
            del.appendChild(deleteButton);
            newRow.appendChild(name);
            newRow.appendChild(categoryLabel);
            newRow.appendChild(info);
            newRow.appendChild(del);
            document.querySelector("#all-pigs > table")?.appendChild(newRow);

            //add event listeners for the info and delete buttons
            infoButton.addEventListener("click", () => loadInfoTable(pig));
            deleteButton.addEventListener("click", () => deleteEntry(pig.id, pig.name))
        })
    }
}

//set the add new table back to its default state
function wipeInsertTable():void{
    const tableElements:NodeListOf<Element> = document.querySelectorAll("#add-pig>table tr td:nth-child(2n");
    tableElements[0].textContent = "";
    tableElements[1].textContent = "";
    tableElements[2].textContent = "";
    tableElements[3].textContent = "";
    tableElements[4].textContent = "";
    (tableElements[5].children[0] as HTMLOptionElement).value = "grey";
    document.querySelector("#add-pig>table tr:last-child td:first-child")!.textContent = "Swimming Score";
    tableElements[6].textContent = "";
    document.getElementById("add-pig")!.style.display = "none";
}

//loads the info of pig into the info table and makes it visible. Called whenever the info button is pressed.
function loadInfoTable(pig:pig):void{
    //read the category and load the appropriate property name into the info table
    const tableElements:NodeListOf<Element> = document.querySelectorAll("#more-info>table tr td:nth-child(2n");
    tableElements[0].textContent = pig.name;
    tableElements[1].textContent = pig.breed;
    tableElements[2].textContent = String(pig.height) + "m";
    tableElements[3].textContent = String(pig.weight) + "kg";
    tableElements[4].textContent = pig.personality;
    switch(pig.getCategory()){
        case category.Black:
            tableElements[5].textContent = "Black";
            document.querySelector("#more-info>table tr:last-child td:first-child")!.textContent = "Strength Score";
            tableElements[6].textContent = String((pig as blackPig).getStrengthScore());
            break;
        case category.Chestnut:
            tableElements[5].textContent = "Chestnut";
            document.querySelector("#more-info>table tr:last-child td:first-child")!.textContent = "Language";
            tableElements[6].textContent = (pig as chestnutPig).language;
            break;
        case category.Grey:
            tableElements[5].textContent = "Grey";
            document.querySelector("#more-info>table tr:last-child td:first-child")!.textContent = "Swimming Score";
            tableElements[6].textContent = String((pig as greyPig).getSwimmingScore());
            break;
        case category.White:
            tableElements[5].textContent = "White";
            document.querySelector("#more-info>table tr:last-child td:first-child")!.textContent = "Running Score";
            tableElements[6].textContent = String((pig as whitePig).getRunningScore());
            break;
    }
    document.getElementById("more-info")!.style.display = "inline-block";
}

//delete the pig of the given id upon confirmation and refresh the pigs table
function deleteEntry(id:number, name:string):void{
    if(window.confirm("Are you sure you want to delete " + name + "?")){
        pc.delete(id);
        refreshTable();
    }
}

//set the more info table back to its default state
/*
function wipeMoreInfoTable():void;
^not needed since we will just overWrite the existing info whenever we load a different pig
*/

//reads values from the insert table, creates a pig and puts it into the pigController. Refreshes the table if successful.
function addPig():void{
    let newPig:pig|undefined = undefined;
    const tableElements:NodeListOf<Element> = document.querySelectorAll("#add-pig>table tr td:nth-child(2n");
    //perform a quick input validation
    //check if any inputs are empty
    //check if NaN was input into any number fields
    let name:string = tableElements[0].textContent as string;
    let breed:string = tableElements[1].textContent as string;
    let height:number = parseFloat(tableElements[2].textContent as string);
    let weight:number = parseFloat(tableElements[3].textContent as string);
    let personality:string = tableElements[4].textContent as string;
    if(name == "" || breed == "" || personality == ""){
        window.alert("You left a field blank");
        return;
    }
    if(isNaN(height) || isNaN(weight)){
        window.alert("Make sure you input a number for the height and weight");
        return;
    }
    //check the variable fields: swimming, running, strength: number; language: string;
    switch(categorySelection?.value){
        case "grey":
            let swimming:number = parseFloat(tableElements[6].textContent as string);
            if(isNaN(swimming) || !Number.isInteger(swimming)){
                window.alert("Make sure you input an integer for the swimming score");
                return;
            }
            if(swimming < 0 || swimming > 100){
                window.alert("Make sure the swimming score is between 0 and 100");
                return;
            }
            newPig = new greyPig(name, breed, height, weight, personality, swimming);
            break;
        case "chestnut":
            let language:string = tableElements[6].textContent as string;
            if(language == ""){
                window.alert("You didn't input a language");
                return;
            }
            newPig = new chestnutPig(name, breed, height, weight, personality, language);
            break;
        case "white":
            let running:number = parseFloat(tableElements[6].textContent as string);
            if(isNaN(running) || !Number.isInteger(running)){
                window.alert("Make sure you input an integer for the running score");
                return;
            }
            if(running < 0 || running > 100){
                window.alert("Make sure the running score is between 0 and 100");
                return;
            }
            newPig = new whitePig(name, breed, height, weight, personality, running);
            break;
        case "black":
            let strength:number = parseFloat(tableElements[6].textContent as string);
            if(isNaN(strength) || !Number.isInteger(strength)){
                window.alert("Make sure you input an integer for the strength score");
                return;
            }
            if(strength < 1 || strength > 10){
                window.alert("Make sure the strength score is between 1 and 10");
                return;
            }
            newPig = new blackPig(name, breed, height, weight, personality, strength);
            break;
    }
    pc.add(newPig as pig);
    //refresh the main table with the new entry
    refreshTable();
    //wipe the add new table when complete
    wipeInsertTable();
}

//modifes last table row of the add table corresponding to the selected category
function setRow():void{
    const lastTableRow:HTMLElement|null = document.querySelector("#add-pig>table tr:last-child td:first-child");
    switch(categorySelection?.value){
        case "grey":
            lastTableRow!.textContent = "Swimming Score";
            break;
        case "chestnut":
            lastTableRow!.textContent = "Language";
            break;
        case "white":
            lastTableRow!.textContent = "Running Score";
            break;
        case "black":
            lastTableRow!.textContent = "Strength Score";
            break;
    }
}

let pc:pigController = new pigController;
refreshTable(); //refresh the table to load entries preserved in localStorage
//set interactions for cancel, confirm, add, and close buttons
let confirmButton:HTMLElement|null = document.getElementById("confirm");
confirmButton?.addEventListener('click', addPig);
let cancelButton:HTMLElement|null = document.getElementById("cancel");
cancelButton?.addEventListener('click', wipeInsertTable)
document.getElementById("add")?.addEventListener('click', ()=>document.getElementById("add-pig")!.style.display = "inline-block");
document.getElementById("close")?.addEventListener('click', ()=>document.getElementById("more-info")!.style.display = "none");