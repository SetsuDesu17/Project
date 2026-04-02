import battleSystem from "./battleSystem.js";
import entity from "./entity.js";

const BattleScreen = {
    print: (message) => {
        console.log(message);
    },

    initiateBattle: () => {
        BattleScreen.print("A wild enemy appears!");
        const player = new entity(0, "Player", "Setsu", 1, 100, 20, 10, 15, null);
        const enemy = new entity().generateRandomEnemy(player, 1);
        console.log(`Enemy Name: ${enemy.name} | Level: ${enemy.level} | HP: ${enemy.hp} | ATK: ${enemy.atk} | DEF: ${enemy.def} | SPD: ${enemy.spd}`);
        console.log(`Player Name: ${player.name} | Level: ${player.level} | HP: ${player.hp} | ATK: ${player.atk} | DEF: ${player.def} | SPD: ${player.spd}`);

        const battleSystemResources = [player, enemy];
        battleSystemResources.push(...battleSystem.preBattle(player.spd, enemy.spd));
        return battleSystemResources;
    },

    checkBattleOutcome: (player, enemy) => {
        if (player.hp <= 0) {
            BattleScreen.print("You have been defeated!");
            return "defeat";
        } else if (enemy.hp <= 0) {
            BattleScreen.print("You have defeated the enemy!");
            return "victory";
        } else {
            return "continue";
        }
    },

    turnStart: () => {
        let [player, enemy, turnOrder, stringArray, intArray] = BattleScreen.initiateBattle();
        let playerSkillOutput = [];
        let enemySkillOutput = [];
        let turnCount = 1;

        while (player.hp > 0 && enemy.hp > 0) {
            BattleScreen.print(`Turn ${turnCount} Start!`);
            BattleScreen.print(`Player HP: ${player.hp} | Enemy HP: ${enemy.hp}`);
            BattleScreen.print(`Player String Array: ${stringArray} | Player Int Array: ${intArray}`);
            while (playerSkillOutput[5] != 'attack') {
                playerSkillOutput = battleSystem.playerTurn(player, enemy, stringArray, intArray);
                let error;
                [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput, error);
                while (error === 'invalid') {
                    BattleScreen.print("Please choose a valid skill.");
                    playerSkillOutput = battleSystem.playerTurn(player, enemy, stringArray, intArray);
                    [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput);
                }
                BattleScreen.print(`Player HP: ${player.hp} | Enemy HP: ${enemy.hp}`);
                BattleScreen.print(`Player String Array: ${stringArray} | Player Int Array: ${intArray}`);
            }
            BattleScreen.battleStart(player, enemy, turnOrder, stringArray, intArray, playerSkillOutput, enemySkillOutput);
            if (BattleScreen.checkBattleOutcome(player, enemy) != "continue") {
                break;
            }
            if (enemy.status === "defending") {
                enemy.def -= 5*enemy.level;
                enemy.status = null;
            }
            turnCount++;
        }
    },

    battleStart: (player, enemy, turnOrder, stringArray, intArray, playerSkillOutput, enemySkillOutput) => {

        if (turnOrder[0] === player) {
            [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput);
            while (error === 'invalid') {
                BattleScreen.print("Please choose a valid skill.");
                playerSkillOutput = battleSystem.playerTurn(player, enemy, stringArray, intArray);
                [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput);
            }
            [ player, enemy ] = battleSystem.enemyTurn(enemy, player);
        } else {
            [ player, enemy ] = battleSystem.enemyTurn(enemy, player);
            [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput);
            while (error === 'invalid') {
                BattleScreen.print("Please choose a valid skill.");
                playerSkillOutput = battleSystem.playerTurn(player, enemy, stringArray, intArray);
                [player, enemy, stringArray, intArray, error] = BattleScreen.processSkillOutput(player, enemy, stringArray, intArray, playerSkillOutput);
            }
        }
    },

        processSkillOutput: (player, enemy, stringArray, intArray, skillOutput, error) => {
        if (skillOutput[0] === "concat( string, string )" && stringArray.length >= 2) {
            stringArray.shift();
            stringArray.shift();
            stringArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "strToInt( string )" && stringArray.length >= 1) {
            stringArray.shift();
            intArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "strLength( string )" && stringArray.length >= 1) {
            stringArray.shift();
            intArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "intToStr( int )" && intArray.length >= 1) {
            intArray.shift();
            stringArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "add( int, int )" && intArray.length >= 2) {
            intArray.shift();
            intArray.shift();
            intArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "multiply( int, int )" && intArray.length >= 2) {
            intArray.shift();
            intArray.shift();
            intArray.push(skillOutput[3]);
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "intDmg( int )" && intArray.length >= 1) {
            intArray.shift();
            enemy.hp -= skillOutput[3];
            error = null;
            console.log(skillOutput[2]);
        } else if (skillOutput[0] === "strDmg( string )" && stringArray.length >= 1) {
            stringArray.shift();
            enemy.hp -= skillOutput[3].length;
            error = null;
            console.log(skillOutput[2]);
        } else {
            BattleScreen.print("Skill failed! Player lacks the required arguments!");
            error = 'invalid';
            return [player, enemy, stringArray, intArray, error];
        }
        return [player, enemy, stringArray, intArray, error];
    },
}

export default BattleScreen;