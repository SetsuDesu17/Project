import * as SQLite from 'expo-sqlite';
import testModel from '../testDatabase.js';

const db = testModel.db;

const skillsModel = {

    loadAllSkillID: () => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT id FROM skills',
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadSkillByID: (skillID) => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT * FROM skills',
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    }

}

export default skillsModel;