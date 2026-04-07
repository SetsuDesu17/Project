import * as SQLite from 'expo-sqlite';
import testModel from '../testDatabase.js';

const db = testModel.db;

const itemsModel = {

    loadAllItemID: async () => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT id FROM items',
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadItemByID: async (itemID) => {
        return new Promise ((resolve, reject) => {
            db.getFirstAsync('SELECT * FROM items WHERE id = ?',
                itemID,
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },
}

export default itemsModel;