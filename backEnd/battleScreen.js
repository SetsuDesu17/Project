import battleSystem from "./battleSystem.js";
import skills from "./skills.js";
import entity from "./entity.js";

const battleScreen = {

    battleStart: () => {
        let [player, enemy, playerSkillsArray, stringArray, intArray] = battleScreen.initiateBattle(); // Generate player and enemy entities, and pre-battle resources such as skill arrays and argument arrays
        let battleStatus = battleScreen.checkBattleOutcome(player, enemy); // Initial check for battle outcome in case the enemy is generated with 0 HP or less, returns "victory", "defeat", or "continue"
        let playerPlan;
        let enemyPlan;
        let battleOutput = [];
        let turnCount = 1;
        let newTurn = true;

        while (battleStatus === "continue" && newTurn === true) { // Turn Handler
            newTurn = false; // Prevents infinite loop, will be set to true at the end of the turn

            console.log(`Turn ${turnCount} Start!\n`);
            console.log(`Player HP: ${player.hp} | Enemy HP: ${enemy.hp}`);
            console.log(`String Array: ${stringArray} | Int Array: ${intArray}\n`);
            console.log("Planning Phase: Choose your skill and prepare your arguments!\n");

            // Planning Phase, Player and Enemy choose their actions for the turn
            battleScreen.printPlayerSkills(playerSkillsArray);
            [ player, enemy, stringArray, intArray, playerPlan, enemyPlan ] = battleSystem.planningPhase(player, enemy, stringArray, intArray);


            // Battle Phase, Player and Enemy actions are executed based on turn order
            let turnOrder = battleSystem.determineTurnOrder(player, enemy); // Calculates turn order based on speed and random initiative, returns [ turnOrder, turnOrderMessage ]
            console.log(turnOrder[1]+ "\n"); // Output who goes first based on turn order calculation
            // Execute the battle phase based on the determined turn order and the plans made by the player and enemy during the planning phase
            [ player, enemy, stringArray, intArray ] = battleSystem.attackPhase(turnOrder[0], player, enemy, stringArray, intArray, playerPlan, enemyPlan);


            battleStatus = battleScreen.checkBattleOutcome(player, enemy); // Check for battle outcome at the end of the turn, returns "victory", "defeat", or "continue"
            if (battleStatus === "continue") { // Check if battle is still ongoing before proceeding to the next turn
                turnCount++; // Increment turn count for the next turn
                // newTurn = true; // Prevents infinite loop and starts the next turn
            } else {
                break; // Exit the loop if the battle has ended with either victory or defeat
            }
        }
        return battleStatus;
    },

    initiateBattle: () => {
        console.log("-------------------------------");
        console.log("A wild enemy appears! Prepare for battle!");
        console.log("-------------------------------");

        // Entity Structure: [   id,  type,     name, level,hp,atk,def,spd,status]
        const player = new entity(0, "Player", "Setsu", 1, 100, 20, 10, 15, null);
        const enemy = new entity().generateRandomEnemy(player, 1);

        console.log("-------------------------------");
        console.log(`Enemy Name: ${enemy.name} | Level: ${enemy.level} | HP: ${enemy.hp} | ATK: ${enemy.atk} | DEF: ${enemy.def} | SPD: ${enemy.spd}`);
        console.log(`Player Name: ${player.name} | Level: ${player.level} | HP: ${player.hp} | ATK: ${player.atk} | DEF: ${player.def} | SPD: ${player.spd}`);
        console.log("-------------------------------");

        const battleSystemResources = [player, enemy];
        battleSystemResources.push(...battleSystem.preBattle());
        return battleSystemResources;
    },

    printPlayerSkills: (playerSkillsArray) => {
        console.log("Available Skills: ");
        for (let i = 0; i < playerSkillsArray.length; i++) {
            if (playerSkillsArray[i] !== undefined) {
                console.log(`${i+1}: ${skills.skillNames[playerSkillsArray[i]]} - ${skills.skillDescriptions[playerSkillsArray[i]]}`);
            }
        }
        console.log("\n");
    },

    checkBattleOutcome: (player, enemy) => {
        if (player.hp <= 0) {
            console.log("You have been defeated!");
            return "defeat";
        } else if (enemy.hp <= 0) {
            console.log("You have defeated the enemy!");
            return "victory";
        } else {
            return "continue";
        }
    },

    

    


    
}

export default battleScreen;