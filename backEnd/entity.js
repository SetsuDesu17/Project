

export default class entity {
    //         int, str, str,   int,  int, int, int, int, int, array,  array
    constructor(id, type, name, level, exp, hp, atk, def, spd, status, skillLevels){
        this.id = id;
        this.type = type;
        this.name = name;
        this.level = level;
        this.exp = exp;
        this.hp = hp;
        this.atk = atk;
        this.def = def; 
        this.spd = spd;
        this.status = status;
        this.state = "idle";
        this.skillLevels = skillLevels;
    }

    generateRandomEnemy(id, player){
        const enemyNames = ["Goblin", "Orc", "Troll", "Skeleton", "Bandit"];
        const entityType = 'enemy';
        const randomName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        const randomLevel = Math.max(1, player.level + Math.floor(Math.random() * 3));
        const exp = 0;
        const baseHP = 50*randomLevel;
        const baseATK = 5*randomLevel;
        const baseDEF = 5*randomLevel;
        const randomHP = Math.floor(baseHP + ((Math.random() * 10) * 5));
        const randomATK = Math.floor(baseATK + Math.random() * 15)+1;
        const randomDEF = Math.floor(baseDEF + Math.random() * 5);
        const randomSPD = 15;
        let status = [];
        return new entity(id, entityType, randomName, randomLevel, exp, randomHP, randomATK, randomDEF, randomSPD, status);
    }

}