import * as SQLite from 'expo-sqlite';

const testDatabase = {

    db: await SQLite.openDatabaseAsync('testDB'),

    initDatabase: async () => {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS playerCharacter (
                id INTEGER PRIMARY KEY NOT NULL, 
                username TEXT NOT NULL, 
                level INTEGER NOT NULL,
                exp INTEGER NOT NULL,
                hp INTEGER NOT NULL,
                atk INTEGER NOT NULL,
                def INTEGER NOT NULL,
                spd INTEGER NOT NULL,
            );

            CREATE TABLE IF NOT EXISTS enemy (
                id INTEGER PRIMARY KEY NOT NULL, 
                enemyName TEXT NOT NULL, 
                level INTEGER NOT NULL,
                exp INTEGER NOT NULL,
                hp INTEGER NOT NULL,
                atk INTEGER NOT NULL,
                def INTEGER NOT NULL,
                spd INTEGER NOT NULL,
            );

            CREATE TABLE IF NOT EXISTS playerSkills (
                id INTEGER PRIMARY KEY NOT NULL,
                playerID INTEGER REFERENCES playerCharacter(id),
                skillName TEXT NOT NULL,
                skillDescription TEXT NOT NULL,
                skillLevel INTEGER NOT NULL,
                skillModifier INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS playerInventory (
                id INTEGER PRIMARY KEY NOT NULL,
                playerID INTEGER REFERENCES playerCharacter(id),
                itemID INTEGER REFERENCES items(id),
                amount INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY NOT NULL,
                itemName TEXT NOT NULL,
                itemDescription TEXT NOT NULL
            );
        `)
    }
}

export default testDatabase;