System.register(["./pig.js"], function (exports_1, context_1) {
    "use strict";
    var pig_js_1, pigController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pig_js_1_1) {
                pig_js_1 = pig_js_1_1;
            }
        ],
        execute: function () {
            pigController = class pigController {
                constructor() {
                    this.pigs = [];
                    if (localStorage.getItem("pigs")) { //load any pigs from localStorage
                        let objects = JSON.parse(localStorage.pigs);
                        objects.forEach(object => {
                            switch (object["category"]) {
                                case pig_js_1.category.Black:
                                    this.pigs.push(new pig_js_1.blackPig(object.name, object.breed, object.height, object.weight, object.personality, object["strength"]));
                                    break;
                                case pig_js_1.category.Chestnut:
                                    this.pigs.push(new pig_js_1.chestnutPig(object.name, object.breed, object.height, object.weight, object.personality, object["language"]));
                                    break;
                                case pig_js_1.category.Grey:
                                    this.pigs.push(new pig_js_1.greyPig(object.name, object.breed, object.height, object.weight, object.personality, object["swimming"]));
                                    break;
                                case pig_js_1.category.White:
                                    this.pigs.push(new pig_js_1.whitePig(object.name, object.breed, object.height, object.weight, object.personality, object["running"]));
                                    break;
                            }
                        });
                    }
                }
                add(pig) {
                    this.pigs.push(pig);
                    localStorage.pigs = JSON.stringify(this.pigs);
                }
                getAllStr() {
                    return JSON.stringify(this.pigs);
                }
                getAll() {
                    return this.pigs;
                }
                getById(id) {
                    return this.pigs.find((pig) => pig.id == id);
                }
                getAllofCategory(cat) {
                    return this.pigs.filter((pig) => pig.getCategory() == cat)
                        .sort((pig1, pig2) => pig1.name.localeCompare(pig2.name));
                    ;
                }
                delete(id) {
                    this.pigs = this.pigs.filter((pig) => pig.id != id);
                    localStorage.pigs = JSON.stringify(this.pigs);
                }
                returnEmpty() {
                    return this.pigs.length == 0;
                }
            };
            exports_1("pigController", pigController);
        }
    };
});
