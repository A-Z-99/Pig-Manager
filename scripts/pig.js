System.register([], function (exports_1, context_1) {
    "use strict";
    var category, pig, greyPig, chestnutPig, whitePig, blackPig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (category) {
                category[category["Black"] = 0] = "Black";
                category[category["Chestnut"] = 1] = "Chestnut";
                category[category["Grey"] = 2] = "Grey";
                category[category["White"] = 3] = "White";
            })(category || (exports_1("category", category = {})));
            pig = class pig {
                constructor(name, category, breed, height, weight, personality) {
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.id = pig.numPigs;
                    this.category = category;
                    pig.numPigs++;
                }
                getCategory() {
                    return this.category;
                }
            };
            exports_1("pig", pig);
            pig.numPigs = 0;
            greyPig = class greyPig extends pig {
                constructor(name, breed, height, weight, personality, swimmingScore) {
                    super(name, category.Grey, breed, height, weight, personality);
                    //swimmingScore = swimmingScore < 0 ? 0 : swimmingScore > 100 ? 100 : swimmingScore;
                    this.setSwimmingScore(swimmingScore);
                    this.swimming = swimmingScore;
                    greyPig.numGreyPigs++;
                }
                getSwimmingScore() {
                    return this.swimming;
                }
                setSwimmingScore(swimming) {
                    if (swimming > 100) {
                        this.swimming = 100;
                    }
                    else if (swimming < 0) {
                        this.swimming = 0;
                    }
                    else {
                        this.swimming = swimming;
                    }
                }
            };
            exports_1("greyPig", greyPig);
            greyPig.numGreyPigs = 0;
            chestnutPig = class chestnutPig extends pig {
                constructor(name, breed, height, weight, personality, language) {
                    super(name, category.Chestnut, breed, height, weight, personality);
                    this.language = language;
                    this.language = language;
                    chestnutPig.numChestnutPigs++;
                }
            };
            exports_1("chestnutPig", chestnutPig);
            whitePig = class whitePig extends pig {
                constructor(name, breed, height, weight, personality, runningScore) {
                    super(name, category.White, breed, height, weight, personality);
                    //runningScore = runningScore < 0 ? 0 : runningScore > 100 ? 100 : runningScore;
                    this.setRunningScore(runningScore);
                    this.running = runningScore;
                    whitePig.numWhitePigs++;
                }
                getRunningScore() {
                    return this.running;
                }
                setRunningScore(running) {
                    if (running > 100) {
                        this.running = 100;
                    }
                    else if (running < 0) {
                        this.running = 0;
                    }
                    else {
                        this.running = running;
                    }
                }
            };
            exports_1("whitePig", whitePig);
            whitePig.numWhitePigs = 0;
            blackPig = class blackPig extends pig {
                constructor(name, breed, height, weight, personality, strengthScore) {
                    super(name, category.Black, breed, height, weight, personality);
                    //strengthScore = strengthScore < 1 ? 1 : strengthScore > 10 ? 10 : strengthScore;
                    this.setStrengthScore(strengthScore);
                    this.strength = strengthScore;
                    blackPig.numBlackPigs++;
                }
                getStrengthScore() {
                    return this.strength;
                }
                setStrengthScore(strength) {
                    if (strength > 10) {
                        this.strength = 10;
                    }
                    else if (strength < 1) {
                        this.strength = 1;
                    }
                    else {
                        this.strength = strength;
                    }
                }
            };
            exports_1("blackPig", blackPig);
            blackPig.numBlackPigs = 0;
        }
    };
});
