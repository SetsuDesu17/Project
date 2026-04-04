

export default class entity {
    constructor(id, type, name, level,  hp, atk, def, spd, status){
        this.id = id;
        this.type = type;
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.atk = atk;
        this.def = def; 
        this.spd = spd;
        this.status = status;
        this.state = "idle";
    }
    getName(){
        return this.name;
    }
    getHP(){
        return this.hp
    }
    generateRandomEnemy(player, id){
        const enemyNames = ["Goblin", "Orc", "Troll", "Skeleton", "Bandit"];
        const randomName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        const randomLevel = Math.max(1, player.level + Math.floor(Math.random() * 3));
        const baseHP = 50*randomLevel;
        const baseATK = 5*randomLevel;
        const baseDEF = 5*randomLevel;
        const randomHP = Math.floor(baseHP + ((Math.random() * 10) * 5));
        const randomATK = Math.floor(baseATK + Math.random() * 5);
        const randomDEF = Math.floor(baseDEF + Math.random() * 5);
        const randomSPD = 15;
        return new entity(id, "Enemy", randomName, randomLevel, randomHP, randomATK, randomDEF, randomSPD, null);
    }

}