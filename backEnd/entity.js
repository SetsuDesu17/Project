

export default class entity {
    constructor(id, type, name, level,  hp, atk, def, spd, status){
        this.id = id;
        this.type = type;
        this.level = level;
        this.name = name;
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
        const randomLevel = Math.max(1, player.level + Math.floor(Math.random() * 3) - 1);
        const randomHP = Math.floor(Math.random() * 50) * randomLevel;
        const randomATK = Math.floor(Math.random() * 20) * randomLevel;
        const randomDEF = Math.floor(Math.random() * 15) * randomLevel;
        const randomSPD = Math.floor(Math.random() * 20) * randomLevel;
        return new entity(id, "Enemy", randomName, randomLevel, randomHP, randomATK, randomDEF, randomSPD, null);
    }

}