System.register(["./pigService.js", "./pig.js"], function (exports_1, context_1) {
    "use strict";
    var _a, _b, pigService_js_1, pig_js_1, categorySelection, pc, confirmButton, cancelButton;
    var __moduleName = context_1 && context_1.id;
    //refreshes the main pigs table. Called whenever a new pig is successfully added
    function refreshTable() {
        //delete the previous entries in the table
        document.querySelectorAll("#all-pigs > table > tr").forEach(row => row.remove());
        if (pc.returnEmpty()) { // don't do anything if there are no pigs
            return;
        }
        for (let pigType in pig_js_1.category) {
            let pigArr = pc.getAllofCategory(Number(pigType));
            pigArr.forEach(pig => {
                var _a;
                //add a new row into the table
                const newRow = document.createElement("tr");
                const name = document.createElement("td");
                const categoryLabel = document.createElement("td");
                const info = document.createElement("td");
                const del = document.createElement("td");
                const infoButton = document.createElement("button");
                const deleteButton = document.createElement("button");
                //Give the buttons their properties
                infoButton.textContent = "More Info";
                deleteButton.textContent = "Delete";
                name.textContent = pig.name;
                categoryLabel.textContent = pig_js_1.category[pigType];
                info.appendChild(infoButton);
                del.appendChild(deleteButton);
                newRow.appendChild(name);
                newRow.appendChild(categoryLabel);
                newRow.appendChild(info);
                newRow.appendChild(del);
                (_a = document.querySelector("#all-pigs > table")) === null || _a === void 0 ? void 0 : _a.appendChild(newRow);
                //add event listeners for the info and delete buttons
                infoButton.addEventListener("click", () => loadInfoTable(pig));
                deleteButton.addEventListener("click", () => deleteEntry(pig.id, pig.name));
            });
        }
    }
    //set the add new table back to its default state
    function wipeInsertTable() {
        const tableElements = document.querySelectorAll("#add-pig>table tr td:nth-child(2n");
        tableElements[0].textContent = "";
        tableElements[1].textContent = "";
        tableElements[2].textContent = "";
        tableElements[3].textContent = "";
        tableElements[4].textContent = "";
        tableElements[5].children[0].value = "grey";
        document.querySelector("#add-pig>table tr:last-child td:first-child").textContent = "Swimming Score";
        tableElements[6].textContent = "";
        document.getElementById("add-pig").style.display = "none";
    }
    //loads the info of pig into the info table and makes it visible. Called whenever the info button is pressed.
    function loadInfoTable(pig) {
        //read the category and load the appropriate property name into the info table
        const tableElements = document.querySelectorAll("#more-info>table tr td:nth-child(2n");
        tableElements[0].textContent = pig.name;
        tableElements[1].textContent = pig.breed;
        tableElements[2].textContent = String(pig.height) + "m";
        tableElements[3].textContent = String(pig.weight) + "kg";
        tableElements[4].textContent = pig.personality;
        switch (pig.getCategory()) {
            case pig_js_1.category.Black:
                tableElements[5].textContent = "Black";
                document.querySelector("#more-info>table tr:last-child td:first-child").textContent = "Strength Score";
                tableElements[6].textContent = String(pig.getStrengthScore());
                break;
            case pig_js_1.category.Chestnut:
                tableElements[5].textContent = "Chestnut";
                document.querySelector("#more-info>table tr:last-child td:first-child").textContent = "Language";
                tableElements[6].textContent = pig.language;
                break;
            case pig_js_1.category.Grey:
                tableElements[5].textContent = "Grey";
                document.querySelector("#more-info>table tr:last-child td:first-child").textContent = "Swimming Score";
                tableElements[6].textContent = String(pig.getSwimmingScore());
                break;
            case pig_js_1.category.White:
                tableElements[5].textContent = "White";
                document.querySelector("#more-info>table tr:last-child td:first-child").textContent = "Running Score";
                tableElements[6].textContent = String(pig.getRunningScore());
                break;
        }
        document.getElementById("more-info").style.display = "inline-block";
    }
    //delete the pig of the given id upon confirmation and refresh the pigs table
    function deleteEntry(id, name) {
        if (window.confirm("Are you sure you want to delete " + name + "?")) {
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
    function addPig() {
        let newPig = undefined;
        const tableElements = document.querySelectorAll("#add-pig>table tr td:nth-child(2n");
        //perform a quick input validation
        //check if any inputs are empty
        //check if NaN was input into any number fields
        let name = tableElements[0].textContent;
        let breed = tableElements[1].textContent;
        let height = parseFloat(tableElements[2].textContent);
        let weight = parseFloat(tableElements[3].textContent);
        let personality = tableElements[4].textContent;
        if (name == "" || breed == "" || personality == "") {
            window.alert("You left a field blank");
            return;
        }
        if (isNaN(height) || isNaN(weight)) {
            window.alert("Make sure you input a number for the height and weight");
            return;
        }
        //check the variable fields: swimming, running, strength: number; language: string;
        switch (categorySelection === null || categorySelection === void 0 ? void 0 : categorySelection.value) {
            case "grey":
                let swimming = parseFloat(tableElements[6].textContent);
                if (isNaN(swimming) || !Number.isInteger(swimming)) {
                    window.alert("Make sure you input an integer for the swimming score");
                    return;
                }
                if (swimming < 0 || swimming > 100) {
                    window.alert("Make sure the swimming score is between 0 and 100");
                    return;
                }
                newPig = new pig_js_1.greyPig(name, breed, height, weight, personality, swimming);
                break;
            case "chestnut":
                let language = tableElements[6].textContent;
                if (language == "") {
                    window.alert("You didn't input a language");
                    return;
                }
                newPig = new pig_js_1.chestnutPig(name, breed, height, weight, personality, language);
                break;
            case "white":
                let running = parseFloat(tableElements[6].textContent);
                if (isNaN(running) || !Number.isInteger(running)) {
                    window.alert("Make sure you input an integer for the running score");
                    return;
                }
                if (running < 0 || running > 100) {
                    window.alert("Make sure the running score is between 0 and 100");
                    return;
                }
                newPig = new pig_js_1.whitePig(name, breed, height, weight, personality, running);
                break;
            case "black":
                let strength = parseFloat(tableElements[6].textContent);
                if (isNaN(strength) || !Number.isInteger(strength)) {
                    window.alert("Make sure you input an integer for the strength score");
                    return;
                }
                if (strength < 1 || strength > 10) {
                    window.alert("Make sure the strength score is between 1 and 10");
                    return;
                }
                newPig = new pig_js_1.blackPig(name, breed, height, weight, personality, strength);
                break;
        }
        pc.add(newPig);
        //refresh the main table with the new entry
        refreshTable();
        //wipe the add new table when complete
        wipeInsertTable();
    }
    //modifes last table row of the add table corresponding to the selected category
    function setRow() {
        const lastTableRow = document.querySelector("#add-pig>table tr:last-child td:first-child");
        switch (categorySelection === null || categorySelection === void 0 ? void 0 : categorySelection.value) {
            case "grey":
                lastTableRow.textContent = "Swimming Score";
                break;
            case "chestnut":
                lastTableRow.textContent = "Language";
                break;
            case "white":
                lastTableRow.textContent = "Running Score";
                break;
            case "black":
                lastTableRow.textContent = "Strength Score";
                break;
        }
    }
    return {
        setters: [
            function (pigService_js_1_1) {
                pigService_js_1 = pigService_js_1_1;
            },
            function (pig_js_1_1) {
                pig_js_1 = pig_js_1_1;
            }
        ],
        execute: function () {
            categorySelection = document.getElementById("category");
            categorySelection.addEventListener('change', setRow);
            pc = new pigService_js_1.pigController;
            refreshTable(); //refresh the table to load entries preserved in localStorage
            //set interactions for cancel, confirm, add, and close buttons
            confirmButton = document.getElementById("confirm");
            confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.addEventListener('click', addPig);
            cancelButton = document.getElementById("cancel");
            cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.addEventListener('click', wipeInsertTable);
            (_a = document.getElementById("add")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => document.getElementById("add-pig").style.display = "inline-block");
            (_b = document.getElementById("close")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => document.getElementById("more-info").style.display = "none");
        }
    };
});
