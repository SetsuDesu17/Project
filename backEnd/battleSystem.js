import skills from "./skills.js";
import BattleScreen from "./battleScreen.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({}); 

const battleSystem = {
    alphabetArray: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    preBattle: (playerSpeed, enemySpeed) => {

        let turnOrder;
        let maxStringCount = 5;
        let maxIntCount = 5;
        let randomStringArrayStarter = battleSystem.alphabetArray.sort(() => 0.5 - Math.random()).slice(0, maxStringCount);
        let randomIntArrayStarter = Array.from({ length: maxIntCount }, () => Math.floor(Math.random() * 100));
        if (playerSpeed > enemySpeed) {
            turnOrder = ['player', 'enemy'];
        } else {
            turnOrder = ['enemy', 'player'];
        }
        const stringArray = randomStringArrayStarter;
        const intArray = randomIntArrayStarter;
        return [turnOrder, stringArray, intArray];
    },

    playerTurn: (player, enemy, stringArray, intArray) => {
        let output = [];
        const playerSkills = [
            skills.concat(player, enemy, stringArray, intArray), 
            skills.strToInt(player, enemy, stringArray, intArray), 
            skills.strLength(player, enemy, stringArray, intArray), 
            skills.intToStr(player, enemy, stringArray, intArray), 
            skills.add(player, enemy, stringArray, intArray), 
            skills.multiply(player, enemy, stringArray, intArray), 
            skills.intDmg(player, enemy, stringArray, intArray), 
            skills.strDmg(player, enemy, stringArray, intArray)
        ];
        const playerSkillNames = skills.skillNames;

        for (let i = 0; i < playerSkills.length; i++) {
            BattleScreen.print(`${i + 1}. ${playerSkillNames[i]}`);
        }
        var skillChoice = prompt('Choose a skill by entering the corresponding number: ');
        while (skillChoice < 1 || skillChoice > playerSkills.length) {
            skillChoice = prompt('Invalid choice. Please enter a number corresponding to a skill: ');
        };
        output = playerSkills[skillChoice - 1];
        return output;

    },

    enemyTurn: (enemy, player) => {
        let output = [player, enemy];

        let enemyAction = Math.round(Math.random() * 1) < 1 ? "attack" : "defend";
        if (enemyAction === "attack") {
            BattleScreen.print(`${enemy.name} attacks ${player.name}!`);
            const damage = Math.max(0, enemy.atk - player.def);
            player.hp -= damage;
            BattleScreen.print(`${player.name} takes ${damage} damage! Remaining HP: ${player.hp}`);
        } else {
            BattleScreen.print(`${enemy.name} defends! Increased defense for this turn!`);
            enemy.status = "defending";
            enemy.def += 5*enemy.level; // Temporary defense boost for the turn
        }

        return output;
    },
}

export default battleSystem;