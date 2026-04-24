import battleOutput from './newBattleOutput.js';
import skills from './skills.js';
import entity from './entity.js';

const newBattleSystem = {

    getAllFunctionNamesOfAnObject: (object) => { // Grabs all function names inside an object and returns them in an array
        return Object.getOwnPropertyNames(object).filter(key => typeof object[key] === 'function');
    },
    getAllFunctionsOfAnObject: (object) => { // Grabs all functions from skills.js and stores them in an array
        return Object.values(object).filter(value => typeof value === 'function');
    },

    initiateBattle: () => {
        
        const player = new entity(0, 'player', 'Setsu', 1, 0, 100, 20, 5, 20, [], []); // Create a player entity with default stats
        const enemy = new entity().generateRandomEnemy(1, player);

        let [stringArray, intArray, playerSkillsArray] = newBattleSystem.generatePlayerResources();

        battleOutput.battleStartAnnouncement(player, enemy);
        newBattleSystem.battleStart(player, enemy, stringArray, intArray, playerSkillsArray);
        newBattleSystem.checkIfPlayerLevelsUp(player);
    },

    generatePlayerResources: () => {
        const playerMaxStarterResourcesCount = 5;
        let playerSkillsArray = [];
        let stringArray = skills.alphabetArray.sort(() => 0.5 - Math.random()).slice(0, playerMaxStarterResourcesCount); // Shuffle the alphabet array and take the first 5 letters for the string array starter
        let intArray = Array.from({ length: playerMaxStarterResourcesCount }, () => Math.floor(Math.random() * 4) + 1); //Generate random integers between 1 and 5 for the int array starter
        
        const skillNameList = newBattleSystem.getAllFunctionNamesOfAnObject(skills);

        for (let i = 0; i < playerMaxStarterResourcesCount; i++){
            let randSkill = Math.floor(Math.random() * (skillNameList.length)); // Randomly select a skill from the skills list
            playerSkillsArray.push(randSkill); // Randomly add skills to the player's skill list starter, can contain duplicates
        }
        return [stringArray, intArray, playerSkillsArray];
    },

    checkBattleStatus: ( player, enemy ) => {
        if (player.hp <= 0){
            console.log(`${player.name} has been defeated! Game Over!`);
            return 'defeat';
        } else if (enemy.hp <= 0){
            console.log(`${enemy.name} has been defeated! You Win!`);
            return 'victory';
        }
    },

    checkIfPlayerLevelsUp: ( player ) => {
        let baseExp = 100;
        let expToLevelUp = baseExp * player.level;
        if (player.exp >= expToLevelUp){
            player.level += 1;
            player.exp = player.exp - expToLevelUp;
            player.hp = player.hp + 20; // Increase player's HP by 20 on level up
            player.atk = player.atk + 5; // Increase player's ATK by 5 on level up
            player.def = player.def + 5; // Increase player's DEF by 5 on level up
            player.spd = player.spd + 5; // Increase player's SPD by 5 on level up
            console.log(`${player.name} leveled up to Level ${player.level}! HP, ATK, DEF, and SPD have all increased!`);
        }
    },

    battleStart: ( player, enemy, stringArray, intArray, playerSkillsArray ) => {
        let battleStatus = 'ongoing';
        let turnCount = 0;
        let playerOutput;
        let enemyOutput;
        while ( battleStatus == 'ongoing' ){
            if (enemy.status.length !== 0){
                for (let i = 0; i < enemy.status.length; i++){
                    if (enemy.status[i] === 'enemyIsDefending') {
                        enemy.def = enemy.def - 15;
                        enemy.status.splice(i, 1);
                        console.log(`${enemy.name} is no longer defending and lowers their defense!`);
                    }
                }
            }
            battleOutput.printPlayerAndEnemyStats(player, enemy);
            battleStatus = 'turnStart';
            turnCount += 1;
            [ player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ] = newBattleSystem.turnStart( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput );
            battleStatus = 'ongoing';

        }

    },

    turnStart: ( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ) => {

        [ player, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ] = newBattleSystem.planningPhase( player, stringArray, intArray, playerSkillsArray );
        [ player, enemy, stringArray, intArray, playerSkillsArray ] = newBattleSystem.attackingPhase( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput );
        return [ player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ];

    },

    planningPhase: ( player, stringArray, intArray, playerSkillsArray ) => {
        let playerTurn = true;
        let playerOutput;
        
        let countTest = 0;
        while (playerTurn == true) {
            playerTurn = false;
            console.log(`Count Test: ${countTest}` );
            battleOutput.printPlayerResources( stringArray, intArray, playerSkillsArray );
            [ player, playerOutput, playerTurn, countTest ] = newBattleSystem.playerTurn( player, stringArray, intArray, playerSkillsArray, countTest );
            if (playerOutput !== undefined && playerOutput !== "rest"){
                [ stringArray, intArray, playerSkillsArray, playerOutput, playerTurn ] = newBattleSystem.runIfPlayerMoveIsNotAnAttack( player, stringArray, intArray, playerSkillsArray, playerOutput, playerTurn );
            } else if (playerOutput == "rest"){
                playerTurn = false;
            }
        }
        console.log('Turn Spam Ended');
        const enemyOutput = (Math.floor(Math.random() * 1)); // Randomly determine enemy action (0 = attack, 1 = defend)
        return [ player, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ];
    },

    attackingPhase: ( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput, enemyOutput ) => {
        const turnOrder = newBattleSystem.determineTurnOrder(player, enemy);
        if (turnOrder === 0){
            if (playerOutput !== "rest"){
                [ player, enemy, stringArray, intArray, playerSkillsArray ] = newBattleSystem.runIfPlayerMoveIsAnAttack( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput );
            } else {
                console.log(`${player.name} is resting and skips their turn to gain 2 random skills!`);
                const skillNameList = newBattleSystem.getAllFunctionNamesOfAnObject(skills);
                for (let i = 0; i < 2; i++){
                    let randSkill = Math.floor(Math.random() * (skillNameList.length)); // Randomly select a skill from the skills list
                    playerSkillsArray.push(randSkill); // Randomly add skills to the player's skill list, can contain duplicates
                }
            }
            [ player, enemy ] = newBattleSystem.runEnemyAction( player, enemy, enemyOutput );
        } else if (turnOrder === 1){
            [ player, enemy ] = newBattleSystem.runEnemyAction( player, enemy, enemyOutput );
            if (playerOutput !== "rest"){
                [ player, enemy, stringArray, intArray, playerSkillsArray ] = newBattleSystem.runIfPlayerMoveIsAnAttack( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput );
            } else {
                console.log(`${player.name} is resting and skips their turn to gain 2 random skills!`);
                const skillNameList = newBattleSystem.getAllFunctionNamesOfAnObject(skills);
                for (let i = 0; i < 2; i++){
                    let randSkill = Math.floor(Math.random() * (skillNameList.length)); // Randomly select a skill from the skills list
                    playerSkillsArray.push(randSkill); // Randomly add skills to the player's skill list, can contain duplicates
                }
            }
        }
        return [ player, enemy, stringArray, intArray, playerSkillsArray ];
    },

    playerTurn: ( player, stringArray, intArray, playerSkillsArray, countTest ) => {
        const runSkillWithID = newBattleSystem.getAllFunctionsOfAnObject(skills);
        let skillID = battleOutput.getPlayerInput( playerSkillsArray );
        console.log( skillID );
        
        countTest += 0.1;
        let checking = true
        let checkSkillOutput;
        let playerOutput;
        let playerTurn = true;

        if (skillID == "rest"){
            playerOutput = "rest";
        } else {
            checkSkillOutput = runSkillWithID[ skillID ]( player, stringArray, intArray, checking );
        }
        if (checkSkillOutput !== undefined){
            if (checkSkillOutput[0] === "error"){
                console.log("Player lacks the required resources, Please Choose Another Skill.");
            } else {
                playerOutput = skillID;
            }
        }
        return [ player, playerOutput, playerTurn, countTest ];
    },

    runIfPlayerMoveIsNotAnAttack: ( player, stringArray, intArray, playerSkillsArray, playerOutput, playerTurn ) => {
        const runSkillWithID = newBattleSystem.getAllFunctionsOfAnObject(skills);
        let checking = true;
        console.log(`Running Skill with ID: ${playerOutput}`);
        let skillOutput = runSkillWithID[ playerOutput ]( player, stringArray, intArray, checking );
        console.log(`Skill Output: ${skillOutput}`);
        if (skillOutput[0] !== "attack"){
            checking = false;
            skillOutput = runSkillWithID[ playerOutput ]( player, stringArray, intArray, checking );
            console.log(`Skill Output: ${skillOutput}`);
            console.log(`New String Array: ${stringArray} | New Int Array: ${intArray}\n`);
            playerSkillsArray.splice(playerSkillsArray.indexOf(skillOutput[0]) , 1);
            return [ stringArray, intArray, playerSkillsArray, playerOutput, playerTurn ];
        } else {
            playerTurn = false;
            return [ stringArray, intArray, playerSkillsArray, playerOutput, playerTurn];
        }
    },

    runIfPlayerMoveIsAnAttack: ( player, enemy, stringArray, intArray, playerSkillsArray, playerOutput ) => {
        const runSkillWithID = newBattleSystem.getAllFunctionsOfAnObject(skills);
        let checking = true;
        let skillOutput = runSkillWithID[ playerOutput ]( player, stringArray, intArray, checking );
        console.log(`Skill Output: ${skillOutput}`);
        if (skillOutput[0] === "attack"){
            checking = false;
            skillOutput = runSkillWithID[ playerOutput ]( player, stringArray, intArray, checking );
            console.log(`Skill Output: ${skillOutput}`);
            console.log(`New String Array: ${stringArray} | New Int Array: ${intArray}\n`);
            playerSkillsArray.splice(playerSkillsArray.indexOf(skillOutput[0]) , 1);
            let playerDmg = skillOutput[1] - enemy.def;
            if (playerDmg < 0){
                playerDmg = 1;
            }
            enemy.hp = enemy.hp - playerDmg;
            console.log(`${player.name} used ${newBattleSystem.getAllFunctionNamesOfAnObject(skills)[playerOutput]} and dealt ${playerDmg} damage to ${enemy.name}!`);
            console.log(`${enemy.name} has ${enemy.hp} HP remaining!`);
            return [ player, enemy, stringArray, intArray, playerSkillsArray ];
        }
    },

    runEnemyAction: ( player, enemy, enemyOutput ) => {
        if (enemyOutput === 1 && enemy.status !== 'defending') {
            console.log(`${enemy.name} is defending and raises their defense!`);
            enemy.def = enemy.def + 15;
            enemy.status.push('enemyIsDefending');
            return [player, enemy];
        } else {
            console.log(`${enemy.name} attacks ${player.name}!`);
            let enemyDmg = enemy.atk - player.def;
            if (enemyDmg < 0){
                enemyDmg = 1;
            }
            player.hp = player.hp - enemyDmg;
            console.log(`${enemy.name} dealt ${enemyDmg} damage to ${player.name}!`);
            console.log(`${player.name} has ${player.hp} HP remaining!`);
            return [player, enemy];
        }
    },

    determineTurnOrder: (player, enemy) => { // Return: Turn Order (0 = Player, 1 = Enemy)
        player.spd = player.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the player's speed for turn order calculation
        enemy.spd = enemy.spd + Math.floor(Math.random() * 5) + 1; // Add a random value between 1 and 5 to the enemy's speed for turn order calculation
        let turnOrder;
        if (player.spd > enemy.spd) {
            turnOrder = 0; // Player goes first
            console.log(`${player.name} is faster and will go first!`);
            return turnOrder; // Player goes first
        } else if (enemy.spd > player.spd) {
            turnOrder = 1; // Enemy goes first
            console.log(`${enemy.name} is faster and will go first!`);
            return turnOrder; // Enemy goes first
        } else {
            turnOrder = Math.round(Math.random() * 1); // Randomly select who goes first if speeds are equal
            console.log(`${player.name} and ${enemy.name} have equal speed! But ${turnOrder === 0 ? player.name : enemy.name} got the initiative and goes first!`);
            return turnOrder; // Return randomly selected turn order if speeds are equal
        }
    },
};

export default newBattleSystem;