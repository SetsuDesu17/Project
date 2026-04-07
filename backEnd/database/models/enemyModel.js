import * as SQLite from 'expo-sqlite';
import testModel from '../testDatabase.js';

const db = testModel.db;

const enemyModel = {

    loadAllEnemyID: async () => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT id FROM enemy',
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadEnemyByID: async (enemyID) => {
        return new Promise ((resolve, reject) => {
            db.getFirstAsync('SELECT * FROM enemy WHERE id = ?',
                enemyID,
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    }

}

export default enemyModel;