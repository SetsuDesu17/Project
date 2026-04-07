import * as SQLite from 'expo-sqlite';
import testModel from '../testDatabase.js';

const db = testModel.db;

const playerModel = {

    createNewCharacter: async (playerData) => {
        [ player.name, player.level, player.exp, player.hp, player.atk, player.def, player.spd ] = playerData;
        return new Promise ((resolve, reject) => {
            db.runAsync('INSERT INTO playerCharacter (username, level, exp, hp, atk, def, spd) VALUES (?,?,?,?,?,?,?)',
                [player.name,
                player.level,
                player.exp,
                player.hp,
                player.atk,
                player.def,
                player.spd],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadAllCharacterID: async () => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT id FROM playerCharacter',
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadCharacterByID: async (playerID) => {
        return new Promise ((resolve, reject) => {
            db.getFirstAsync('SELECT * FROM playerCharacter WHERE id = ?',
                playerID,
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    saveCharacter: async (playerData) => {
        [ player.id, player.name, player.level, player.exp, player.hp, player.atk, player.def, player.spd ] = playerData;
        return new Promise ((resolve, reject) => {
            db.runAsync('UPDATE playerCharacter SET username = ?, level = ?, exp = ?, hp = ?, atk = ?, def = ?, spd = ? WHERE id = ? VALUES (?,?,?,?,?,?,?,?)',
                [player.name,
                player.level,
                player.exp,
                player.hp,
                player.atk,
                player.def,
                player.spd,
                player.id
            ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    deleteCharacter: async (playerID) => {
        return new Promise ((resolve, reject) => {
            db.runAsync('DELETE FROM playerCharacter WHERE id = ?',
                [playerID
                ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    }

}

export default characterModels;