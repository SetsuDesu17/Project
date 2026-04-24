import battleSystem from './newBattleSystem.js';
import skills from './skills.js';
import PromptSync from "prompt-sync";

const prompt = PromptSync({}); 

const newBattleOutput = {

    battleStartAnnouncement: ( player, enemy ) => {
        console.log("-------------------------------");
        console.log(`A wild ${enemy.name} appeared! Prepare for battle!`);
        console.log("-------------------------------");
    },

    printPlayerAndEnemyStats: ( player, enemy ) => {
        console.log("-------------------------------");
        console.log(`Player: Name: ${player.name} | Level: ${player.level} | HP: ${player.hp} | ATK: ${player.atk} | DEF: ${player.def} | SPD: ${player.spd}`);
        console.log(`Enemy: Name: ${enemy.name} | Level: ${enemy.level} | HP: ${enemy.hp} | ATK: ${enemy.atk} | DEF: ${enemy.def} | SPD: ${enemy.spd}`);
        console.log("-------------------------------");
    },

    printPlayerResources: ( stringArray, intArray, playerSkillsArray ) => {
        console.log(`String Array: ${stringArray} | Int Array: ${intArray}\n`);
        newBattleOutput.printPlayerSkills(playerSkillsArray);
    },

    printPlayerSkills: (playerSkillsArray) => {
        console.log("Available Skills: ");
        const skillNames = battleSystem.getAllFunctionNamesOfAnObject(skills);
        if (playerSkillsArray.length == 0){
            console.log("1: rest - type: skip - Skip your turn and gain 2 random skills");
        }
        for (let i = 0; i < playerSkillsArray.length; i++) {
            if (playerSkillsArray[i] !== undefined) {
                console.log(`${i+1}: ${skillNames[playerSkillsArray[i]]} - ${skills.skillDescriptions[playerSkillsArray[i]]}`);
            }
            if ((i+1) == playerSkillsArray.length){
                console.log(`${i+2}: rest - type: skip - Skip your turn and gain 2 random skills`);
            }
        }
        console.log("\n");
    },

    getPlayerInput: ( playerSkillsArray ) => {
        console.log('getPlayerInput is working');

        let playerInputIsValid = false;
        let playerOutput;
        while (playerInputIsValid == false){
            if (playerInputIsValid == true){
                break;
            }
            playerInputIsValid = true;

            let playerInput = prompt("Please Enter Your Chosen Skill: ");
            if (playerInput === null){
                console.log('Invalid Choice, Please Enter A Valid Number.')
                playerInputIsValid = false;
            } else if (playerInput >= 1 && playerInput <= playerSkillsArray.length){
                playerInputIsValid = true;
                playerOutput = playerSkillsArray[playerInput-1]
                return playerOutput;
            } else if (playerInput == playerSkillsArray.length + 1){
                playerOutput = "rest";
                return playerOutput;
            } else {
                console.log('Invalid Choice, Please Enter A Valid Number');
                playerInputIsValid = false;
            }

        }
    },

};

export default newBattleOutput;