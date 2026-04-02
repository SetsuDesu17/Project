
const skills = {
    skillNames: ["concat", "strToInt", "strLength", "intToStr", "add", "multiply", "intDmg", "strDmg"],
    skillDescriptions: [
        "concat( string, string ) - Combines two strings into one.",
        "strToInt( string ) - Converts a string to an integer (if possible).",
        "strLength( string ) - Returns the length of a string and adds it to the int array.",
        "intToStr( int ) - Converts an integer to a string and adds it to the string array.",
        "add( int, int ) - Adds two integers into one.",
        "multiply( int, int ) - Multiplies two integers into one.",
        "intDmg( int ) - Deals damage based on an integer value.",
        "strDmg( string ) - Deals damage based on the length of a string."
    ],

    concat: (player, enemy, stringArray, intArray) => {
        const output = [];
        output.push(`concat( string, string )`);
        output.push(`concat() function combines two strings.`);
        output.push(`${player.name} used concat! Combined ${stringArray[0]} and ${stringArray[1]}!`);
        output.push(`${stringArray[0] + stringArray[1]}`);
        output.push('generate');
        return output;
    },
    strToInt: (player, enemy, stringArray, intArray) => {
        const output = [];
        output.push(`strToInt( string )`);
        output.push(`strToInt function converts string to int.`);
        output.push(`${player.name} used strToInt! Converted ${stringArray[0]} to ${parseInt(stringArray[0])}!`);
        output.push(`${parseInt(stringArray[0])}`);
        output.push('generate');
        return output;
    },
    strLength: (player, enemy, stringArray, intArray) => {
        const output = [];
        output.push(`strLength( string )`);
        output.push(`strLength function creates a new int from the length of the string.`);
        output.push(`${player.name} used strToInt! Created ${stringArray[0].length} int from ${stringArray[0]}!`);
        output.push(`${stringArray[0].length}`);
        output.push('generate');
        return output;
    },
    intToStr: (player, enemy, stringArray, intArray) => {
        const output = []
        output.push(`intToStr( int )`);
        output.push(`intToStr function converts int to string.`);
        output.push(`${player.name} used intToStr! Converted ${intArray[0]} to ${intArray[0].toString()}!`);
        output.push(`${intArray[0].toString()}`);
        output.push('generate');
        return output;
    },

    add: (player, enemy, stringArray, intArray) => {
        const output = [];
        output.push(`add( int, int )`);
        output.push(`add function adds two int variables into one.`);
        output.push(`${player.name} used add! Combined ${intArray[0]} and ${intArray[1]} to create ${intArray[0]+intArray[1]}!`);
        output.push(`${intArray[0] + intArray[1]}`);
        output.push('generate');
        return output;
    },

    multiply: (player, enemy, stringArray, intArray) => {
        const output = [];
        output.push(`multiply( int, int )`);
        output.push(`multiply function multiplies two int variables into one.`);
        output.push(`${player.name} used multiply! Multiplied ${intArray[0]} and ${intArray[1]} to create ${intArray[0]*intArray[1]}!`);
        output.push(`${intArray[0] * intArray[1]}`);
        output.push('generate');
        return output;
    },

    intDmg: (player, enemy, stringArray, intArray) => {
        const output = []
        output.push(`intDmg()`)
        output.push(`intDmg function deals dmg based on the int given.`)
        output.push(`${player.name} used intDmg! Dealt ${intArray[0]} damage to ${enemy.name}!`)
        output.push(`${intArray[0]}`)
        output.push('attack')
        return output
    },

    strDmg: (player, enemy, stringArray, intArray) => {
        const output = []
        output.push(`strDmg()`)
        output.push(`strDmg function deals dmg based on the length of the string given.`)
        output.push(`${player.name} used strDmg! Dealt ${stringArray[0].length} damage to ${enemy.name}!`)
        output.push(`${stringArray[0].length}`)
        output.push('attack')
        return output
    }

}

export default skills;