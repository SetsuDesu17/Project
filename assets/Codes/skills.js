
const skills = {


    
    concat: (player, stringOne, stringTwo) => {
        output = []
        output.push(`concat( string, string )`)
        output.push(`concat() function combines two strings.`)
        output.push(`${player.name} used concat! Combined ${stringOne} and ${stringTwo}!`)
        output.push(`${stringOne + stringTwo}`)
        return output
    },
    strToInt: (player, string) => {
        output = []
        output.push(`strToInt( string )`)
        output.push(`strToInt function converts string to int.`)
        output.push(`${player.name} used strToInt! Converted ${string} to ${string.parseInt()}!`)
        output.push(`${string.parseInt()}`)
        return output
    },
    strLength: (player, string) => {
        output = []
        output.push(`strLength( string )`)
        output.push(`strLength function creates a new int from the length of the string.`)
        output.push(`${player.name} used strToInt! Created ${string.length} int from ${string}!`)
        output.push(`${string.length}`)
        return output
    },
    intToStr: (player, int) => {
        output = []
        output.push(`intToStr( int )`)
        output.push(`intToStr function converts int to string.`)
        output.push(`${player.name} used intToStr! Converted ${int} to ${int.toString()}!`)
        output.push(`${int.toString()}`)
        return output
    },

    add: (player, intOne, intTwo) => {
        output = []
        output.push(`add( int, int )`)
        output.push(`add function adds two int variables into one.`)
        output.push(`${player.name} used add! Combined ${intOne} and ${intTwo} to create ${intOne+intTwo}!`)
        output.push(`${intOne + intTwo}`)
        return output
    },

    multiply: (intOne, intTwo) => {
        output = []
        output.push(`multiply( int, int )`)
        output.push(`multiply function multiplies two int variables into one.`)
        output.push(`${player.name} used multiply! Multiplied ${intOne} and ${intTwo} to create ${intOne*intTwo}!`)
        output.push(`${intOne * intTwo}`)
        return output
    },

    intDmg: (player, enemy, int) => {
        output = []
        output.push(`intDmg()`)
        output.push(`intDmg function deals dmg based on the int given.`)
        output.push(`${player.name} used intDmg! Dealt ${int} damage to ${enemy}!`)
        output.push(`${int}`)
        return output
    },

    strDmg: (player, enemy, string) => {
        output = []
        output.push(`${player.name} used strDmg! Dealt ${string.length} damage to ${enemy}!`)
        output.push(`${string.length}`)
        return output
    }

}

export default skills;