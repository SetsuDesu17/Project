import skills from "./skills.js";
import battleScreen from "./battleScreen.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({}); 

const battleSystem = {

    getAllFunctionNamesOfAnObject: (object) => { // Grabs all function names inside an object and returns them in an array
        return Object.getOwnPropertyNames(object).filter(key => typeof object[key] === 'function');
    },

    getAllFunctionsOfAnObject: (object) => { // Grabs all functions from skills.js and stores them in an array
        return Object.values(object).filter(value => typeof value === 'function');
    },

    preBattle: () => {
        let maxStarterSkillCount = 5; // Maximum number of skills in the player's skill list starter
        let playerSkillsArray = [];
        const skillNames = battleSystem.getAllFunctionNamesOfAnObject(skills);
        for(let i = 0; i < maxStarterSkillCount; i++) {
            let randSkill = Math.floor(Math.random() * (skillNames.length)); // Randomly select a skill from the skills list
            playerSkillsArray.push(randSkill); // Randomly add skills to the player's skill list starter, can contain duplicates
        }
        let maxStringCount = 5; // Maximum number of strings in the string array starter
        let maxIntCount = 5; // Maximum number of integers in the int array starter
        let stringArray = skills.alphabetArray.sort(() => 0.5 - Math.random()).slice(0, maxStringCount); // Shuffle the alphabet array and take the first 5 letters for the string array starter
        let intArray = Array.from({ length: maxIntCount }, () => Math.floor(Math.random() * 4) + 1); //Generate random integers between 1 and 5 for the int array starter

        return [stringArray, intArray, playerSkillsArray];
    },

    determineTurnOrder: (player, enemy) => { // Return Structure: [ turnOrder, turnOrderMessage ]
        player.spd = player.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the player's speed for turn order calculation
        enemy.spd = enemy.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the enemy's speed for turn order calculation
        let turnOrder;
        if (player.spd > enemy.spd) {
            turnOrder = 0; // Player goes first
            return [turnOrder, `${player.name} is faster and will go first!`]; // Player goes first
        } else if (enemy.spd > player.spd) {
            turnOrder = 1; // Enemy goes first
            return [turnOrder, `${enemy.name} is faster and will go first!`]; // Enemy goes first
        } else {
            turnOrder = Math.round(Math.random() * 1); // Randomly select who goes first if speeds are equal
            return [turnOrder, `${player.name} and ${enemy.name} have equal speed! But ${turnOrder === 0 ? player.name : enemy.name} got the initiative and goes first!`];
        }
    },

    planningPhase: (player, enemy, stringArray, intArray, playerSkillsArray) => { // Returns [ player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex, enemyPlan ]
        let playerSkillIndex;
        [player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex] = battleSystem.getPlayerPlan(player, enemy, stringArray, intArray, playerSkillsArray);
        [enemy] = battleSystem.getEnemyPlan(enemy);

        return [player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex]; 
    },

    
    attackPhase: (turnOrder, player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex, enemyPlan) => {
        
    },

    getPlayerPlan: (player, enemy, stringArray, intArray, playerSkillsArray) => {
        const skillList = battleSystem.getAllFunctionsOfAnObject(skills);
        let playerTurn = true;
        let validUserInput = false;
        while (playerTurn == true){
            playerTurn = false; //Disable Loop
            let playerInput = prompt("Please Enter Your Chosen Skill: ");
            if (playerInput === null){
                console.log('Invalid Choice, Please Enter A Number.')
                playerTurn = true;
            } else if (playerInput >= 1 && playerInput <= playerSkillsArray.length){
                validUserInput = true;
            } else {
                console.log('Invalid Choise, Please Enter A Number');
                playerTurn = true;
            }

            if (validUserInput == true){
                let skillOutput = skillList[playerInput](player, enemy, stringArray, intArray);
                if (skillOutput[0] === 'error'){
                    console.log('Player Lacks The Valid Arguments');
                    playerTurn = true;
                } 
                let playerSkillIndex = skillOutput[0];
                return [player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex];
            }
        }
    },

    getEnemyPlan: (enemy) => {
        const randomAction = Math.floor(Math.random() * 2) == 0 ? 'attack' : 'defend'; // FIX ME
        console.log(randomAction);
        if (randomAction === 'defend'){
            enemy.status = 'defending';
            return [enemy];
        } else {
            enemy.status = 'attacking'
            return [enemy];
        }
    },

    activateSkill: (player, enemy, stringArray, intArray, playerSkillsArray, playerSkillIndex) => {
        
    },

}

export default battleSystem;