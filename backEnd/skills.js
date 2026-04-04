
const skills = {
    
    alphabetArray: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    vowelArray: ["a", "e", "i", "o", "u"],

    skillNames: [
        "randStr()",
        "randInt1To5()", 
        "strConcat( string, string )", 
        "strLength( string )", 
        "intToStr( int )", 
        "add( int, int )", 
        "multiply( int, int )", 
        "intDmg( int )",
        "forEachInt( int[] )",
        "strDmg( string )", 
        "strArrayDmg( string[] )",
        "forEachVowel( string[] )"
    ],

    skillDescriptions: [
        "type: Generate - Generates a random single letter string and adds it to the string array.",
        "type: Generate - Generates a random integer (1-5) and adds it to the int array.",
        "type: Generate - Combines two strings into one.",
        "type: Generate - Returns the length of a string and adds it to the int array.",
        "type: Generate - Converts an integer to a string and adds it to the string array.",
        "type: Generate - Adds two integers into one.",
        "type: Generate - Multiplies two integers into one.",
        "type: AttackInt - Deals damage based on an integer value + attack stat.",
        "type: AttackInt - Deals damage for each int in the int array multiplied by (40% of player's attack stat). (Warning: Consumes all int values)",
        "type: AttackStr - Deals true damage based on the length of a string * player's attack stat.",
        "type: AttackStr - Deals 40% of the length of the string array x attack stat as true damage. (Does not consume the string array or its contents)",
        "type: AttackStr - Deals 150% of player's attack stat per vowel count inside the string array as true damage."
    ],

    // Skill Structure: [ skillID, skillType, skillOutputMessage, skillOutput ]
    randStr: (player, enemy, stringArray, intArray) => {
        const randomString = skills.alphabetArray[Math.floor(Math.random() * skills.alphabetArray.length-1)];
        return [ 0, "Generate", `${player.name} used randStr! Generated a random string: ${randomString} and added it to the string array!`, randomString ];
    },
    randInt1To5: (player, enemy, stringArray, intArray) => {
        const randomInt = Math.floor(Math.random() * 4) + 1;
        return [ 1, "Generate", `${player.name} used randInt! Generated a random integer: ${randomInt} and added it to the int array!`, randomInt ];
    },
    strConcat: (player, enemy, stringArray, intArray) => {
        if (stringArray.length > 2) {
            return [ 2, "Generate", `${player.name} used strConcat! Combined ${stringArray[0]} and ${stringArray[1]} to create ${stringArray[0] + stringArray[1]}!`, stringArray[0] + stringArray[1] ];
        }
    },
    strLength: (player, enemy, stringArray, intArray) => {
        if (stringArray.length > 0) {
            return [ 3, "Generate", `${player.name} used strLength! Added the length of ${stringArray[0]} which is: ${stringArray[0].length} to Int Array!`, parseInt(stringArray[0].length) ];
        }
    },
    intToStr: (player, enemy, stringArray, intArray) => {
        if (intArray.length > 0) {
            return [ 4, "Generate", `${player.name} used intToStr! Converted "${intArray[0]}" to a string and added it to String Array!`, intArray[0].toString() ];
        }
    },
    add: (player, enemy, stringArray, intArray) => {
        if (intArray.length > 1) {
            return [ 5, "Generate", `${player.name} used add! Combined ${intArray[0]} and ${intArray[1]} to create ${parseInt(intArray[0]) + parseInt(intArray[1])}!`, parseInt(intArray[0]) + parseInt(intArray[1]) ];
        }
    },

    multiply: (player, enemy, stringArray, intArray) => {
        if (intArray.length > 1) {
            return [ 6, "Generate", `${player.name} used multiply! Multiplied ${intArray[0]} and ${intArray[1]} to create ${parseInt(intArray[0]) * parseInt(intArray[1])}!`, parseInt(intArray[0]) * parseInt(intArray[1]) ];
        }
    },

    intDmg: (player, enemy, stringArray, intArray) => {
        if (intArray.length > 0) {
            return [ 7, "Attack", `${player.name} used intDmg! Dealt ${intArray[0]} damage to ${enemy.name}!`, parseInt(intArray[0]) + parseInt(player.atk) ];
        }
    },

    forEachIntDmg: (player, enemy, stringArray, intArray) => {
        if (intArray.length > 0) {
            let totalDmg = 0;
            for (let i = 0; i < intArray.length; i++) {
                totalDmg += (parseInt(intArray[i])*0.3) + parseInt(player.atk);
            }
            return [ 8, "Attack", `${player.name} used forEachInt! Dealt ${totalDmg} true damage to ${enemy.name}!`, totalDmg ];
        }
    },


    strDmg: (player, enemy, stringArray, intArray) => {
        if (stringArray.length > 0) {
            return [ 9, "Attack", `${player.name} used strDmg! Dealt ${parseInt(stringArray[0].length)*parseInt(player.atk)} true damage to ${enemy.name}!`, parseInt(stringArray[0].length)*parseInt(player.atk) ];
        }
    },

    strArrayDmg: (player, enemy, stringArray, intArray) => {
        if (stringArray.length > 0) {
            return [ 10, "Attack", `${player.name} used strArrayDmg! Dealt ${0.4 * (parseInt(stringArray.length)*parseInt(player.atk))} true damage to ${enemy.name}!`, 0.4 * (parseInt(stringArray.length)*parseInt(player.atk)) ];
        }
    },

    forEachVowelDmg: (player, enemy, stringArray, intArray) => {
        if (stringArray.length > 0) {
            let totalDmg = 0;
            for (let i = 0; i < stringArray.length; i++) {
                if (skills.vowelArray.includes(stringArray[i].toLowerCase())) {
                    totalDmg += 1.5 * player.atk;
                }
            }
            return [ 11, "Attack", `${player.name} used forEachVowel! Dealt ${totalDmg} true damage to ${enemy.name}!`, totalDmg ];
        }
        
    },
}

export default skills;