import skills from "./skills.js";
import battleScreen from "./battleScreen.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({}); 

const battleSystem = {
    

    skillList: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ], // USELESS ASF
    // 0 = skills.randStr(player, enemy, stringArray, intArray),
    // 1 = skills.randInt1To5(player, enemy, stringArray, intArray),
    // 2 = skills.strConcat( player, enemy, stringArray, intArray ),
    // 3 = skills.strLength( player, enemy, stringArray, intArray ),
    // 4 = skills.intToStr( player, enemy, stringArray, intArray ),
    // 5 = skills.add( player, enemy, stringArray, intArray ),
    // 6 = skills.multiply( player, enemy, stringArray, intArray ),
    // 7 = skills.intDmg( player, enemy, stringArray, intArray ),
    // 8 = skills.strDmg( player, enemy, stringArray, intArray ),


    preBattle: () => {
        let maxStarterSkillCount = 5; // Maximum number of skills in the player's skill list starter
        let playerSkillsArray = [];
        for(let i = 0; i < maxStarterSkillCount; i++) {
            let randSkill = Math.floor(Math.random() * (skills.skillNames.length)); // Randomly select a skill from the skills list
            playerSkillsArray.push(randSkill); // Randomly add skills to the player's skill list starter, can contain duplicates
        }
        let maxStringCount = 5; // Maximum number of strings in the string array starter
        let maxIntCount = 5; // Maximum number of integers in the int array starter
        let stringArray = skills.alphabetArray.sort(() => 0.5 - Math.random()).slice(0, maxStringCount); // Shuffle the alphabet array and take the first 5 letters for the string array starter
        let intArray = Array.from({ length: maxIntCount }, () => Math.floor(Math.random() * 4) + 1); //Generate random integers between 1 and 5 for the int array starter
        return [playerSkillsArray, stringArray, intArray];
    },

    determineTurnOrder: (player, enemy) => { // Return Structure: [ turnOrder, turnOrderMessage ]
        player.spd = player.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the player's speed for turn order calculation
        enemy.spd = enemy.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the enemy's speed for turn order calculation
        if (player.spd > enemy.spd) {
            return [0, `${player.name} is faster and will go first!`]; // Player goes first
        } else if (enemy.spd > player.spd) {
            return [1, `${enemy.name} is faster and will go first!`]; // Enemy goes first
        } else {
            const randomTurn = Math.round(Math.random()); // Randomly select who goes first if speeds are equal
            return [randomTurn, `${player.name} and ${enemy.name} have equal speed! But ${randomTurn === 0 ? player.name : enemy.name} got the initiative and goes first!`];
        }
    },

    planningPhase: (player, enemy, stringArray, intArray, playerSkillsArray) => { // Returns [ player, enemy, stringArray, intArray, playerSkillsArray, playerPlan, enemyPlan ]
        let playerPlan;
        let enemyPlan;
        playerTurn(player, enemy, stringArray, intArray, playerSkillsArray);
        return [player, enemy, stringArray, intArray, playerPlan, enemyPlan]; 
    },

    
    attackPhase: (turnOrder, player, enemy, stringArray, intArray, playerSkillOutput, enemySkillOutput) => {
        let enemyAction = Math.round(Math.random() * 1);
        if (enemyAction === 0) {
            battleSystem.enemyTurn(0, player, enemy);
        }
        if (turnOrder === 0) {
            if (enemyAction === 1) {
               [ player, enemy ] = battleSystem.enemyTurn(1, player, enemy);
            }
        } else if (turnOrder === 1) {
            if (enemyAction === 1) {
               [ player, enemy ] = battleSystem.enemyTurn(1, player, enemy);
            }
    
        }
        return [player, enemy, stringArray, intArray];
    },

    playerTurn: (player, enemy, stringArray, intArray, playerSkillsArray) => {
        const skillList = [
            skills.randStr( player, enemy, stringArray, intArray ),
            skills.randInt1To5( player, enemy, stringArray, intArray ),
            skills.strConcat( player, enemy, stringArray, intArray ),
            skills.strLength( player, enemy, stringArray, intArray )
        ];
        const skillNames = skills.skillNames;
        const skillDescriptions = skills.skillDescriptions;


    },

    enemyTurn: (moveID, player, enemy) => {
        if (parseInt(moveID) === 1) {
            console.log(`${enemy.name} attacks ${player.name}!`);
            const damage = Math.max(0, enemy.atk - player.def);
            player.hp -= damage;
            console.log(`${player.name} takes ${damage} damage! Remaining HP: ${player.hp}`);
        } else {
            enemy.status = "defending";
            enemy.def += 5*enemy.level; // Temporary defense boost for the turn
            console.log(`${enemy.name} defends! Increased defense for this turn!`);
        }
        return [player, enemy];
    },

    activateSkill: (player, enemy, stringArray, intArray, skillOutput) => {
        
    },
}

export default battleSystem;