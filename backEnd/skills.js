
const skills = {
    
    alphabetArray: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    vowelArray: ["a", "e", "i", "o", "u"],

    skillDescriptions: [
        "type: create - Generates a random single letter string and adds it to the string array.",
        "type: create - Generates a random integer (1-5) and adds it to the int array.",
        "type: create - Combines two strings into one.",
        "type: create - Returns the length of a string and adds it to the int array.",
        "type: create - Converts an integer to a string and adds it to the string array.",
        "type: create - Adds two integers into one.",
        "type: create - Multiplies two integers into one.",
        "type: attack - Deals damage based on an integer value + attack stat.",
        "type: attack - Deals damage for each int in the int array multiplied by (40% of player's attack stat). (Warning: Consumes all int values)",
        "type: attack - Deals true damage based on the length of a string * player's attack stat.",
        "type: attack - Deals 40% of the length of the string array x attack stat as true damage. (Does not consume the string array or its contents)",
    ],

    // Skill Structure: [ skillID, skillOutput, newStringArray, newIntArray ]
    randStr: (player, stringArray, intArray, checking) => {
        if (checking == false){
            const randomString = skills.alphabetArray[Math.floor(Math.random() * skills.alphabetArray.length)-1];
            return [ 
                0, 
                stringArray.push(randomString), 
                stringArray,
                intArray
            ];
        } else {
            return ["create"];
        }
    },
    randInt1To5: (player, stringArray, intArray, checking) => {
        if (checking == false){
            const randomInt = Math.floor(Math.random() * 4) + 1;
            return [ 
                1, 
                intArray.push(randomInt),
                stringArray,
                intArray
            ];
        } else {
            return ["create"];
        }
    },
    strConcat: (player, stringArray, intArray, checking) => {
        if (stringArray.length > 1) {
            if (checking == false){
                let stringOne = stringArray.shift();
                let stringTwo = stringArray.shift();
                return [
                    2, 
                    stringArray.push(stringOne + stringTwo),
                    stringArray,
                    intArray
                ];
            } else {
                return ["create"];
            }
        } else {
            return ["error"];
        }
    },
    strLength: (player, stringArray, intArray, checking) => {
        if (stringArray.length > 0) {
            if (checking == false){
                return [ 
                    3, 
                    intArray.push(parseInt(stringArray[0].length)),
                    stringArray,
                    intArray
                ];
            } else {
                return ["create"];
            }
        } else {
            return ["error"];
        }
    },
    intToStr: (player, stringArray, intArray, checking) => {
        if (intArray.length > 0) {
            if (checking == false){
                let convertedInt = intArray.shift();
                return [ 
                    4, 
                    stringArray.push(convertedInt.toString()),
                    stringArray,
                    intArray
                ];
            } else {
                return ["create"];
            }
        } else {
            return ["error"];
        }
    },
    add: (player, stringArray, intArray, checking) => {
        if (intArray.length > 1) {
            if (checking == false){
                let intOne = intArray.shift();
                let intTwo = intArray.shift();
                return [ 
                    5, 
                    intArray.push(parseInt(intOne) + parseInt(intTwo)),
                    stringArray,
                    intArray
                ];
            } else {
                return ["create"];
            }

        } else {
            return ["error"];
        }
    },

    multiply: (player, stringArray, intArray, checking) => {
        if (intArray.length > 1) {
            if (checking == false){
                let intOne = intArray.shift();
                let intTwo = intArray.shift();
                return [ 
                    6, 
                    intArray.push(parseInt(intOne) * parseInt(intTwo)),
                    stringArray,
                    intArray
                ];
            } else {
                return ["create"];
            }

        } else {
            return ["error"];
        }
    },

    intDmg: (player, stringArray, intArray, checking) => {
        if (intArray.length > 0) {
            if (checking == false){
                let intOne = intArray.shift();
                return [ 
                    7, 
                    parseInt(intOne) + parseInt(player.atk), 
                    stringArray,
                    intArray
                ];
            } else {
                return ["attack"];
            }

        } else {
            return ["error"];
        }
    },

    forEachIntDmg: (player, stringArray, intArray, checking) => {
        if (intArray.length > 0) {
            if (checking == false){
                let totalDmg = 0;
                while (intArray.length > 0){ 
                    totalDmg += (parseInt(intArray.shift())*0.5) + parseInt(player.atk*0.5);
                }
                return [ 

                    8, 
                    totalDmg,
                    stringArray,
                    intArray
                    
                ];
            } else {
                return ["attack"];
            }
        } else {
            return ["error"];
        }
    },


    strDmg: ( player, stringArray, intArray, checking ) => {
        if (stringArray.length > 0) {
            if (checking == false){
                return [ 
                    9, 
                    parseInt(stringArray.shift().length)*parseInt(player.atk),
                    stringArray,
                    intArray
                ];
            } else {
                return ["attack"];
            }
        } else {
            return ["error"];
        }
    },

    strArrayDmg: (player, stringArray, intArray, checking) => {
        if (stringArray.length > 0) {
            if (checking == false){
                return [ 
                    10, 
                    0.4 * (parseInt(stringArray.length)*parseInt(player.atk)),
                    stringArray,
                    intArray
                ];
            } else {
                return ["attack"];
            }
        } else {
            return ["error"];
        }
    },

}

export default skills;