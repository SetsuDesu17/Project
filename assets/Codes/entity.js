

export default class entity {
    constructor(id, name, hp, atk, def, spd, status){
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def; 
        this.spd = spd;
        this.status = status;
    }
    getName(){
        return this.name;
    }
    getHP(){
        return this.hp
    }
    generateRandomEnemy(){
        const enemyNames = ["Goblin", "Orc", "Troll", "Skeleton", "Bandit"];
        const randomName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        const randomHP = Math.floor(Math.random() * 50) + 50;
        const randomATK = Math.floor(Math.random() * 20) + 10;
        const randomDEF = Math.floor(Math.random() * 15) + 5;
        const randomSPD = Math.floor(Math.random() * 20) + 10;
        return new entity(null, randomName, randomHP, randomATK, randomDEF, randomSPD, null);
    }

}
