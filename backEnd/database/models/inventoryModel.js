import * as SQLite from 'expo-sqlite';
import testModel from '../testDatabase.js';

const db = testModel.db;

const inventoryModel = {

    loadAllItemIDFromInventory: async (playerID) => {
        return new Promise ((resolve, reject) => {
            db.getAllAsync('SELECT itemID FROM playerInventory WHERE playerID = ?',
                playerID,
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    loadItemByID: async (playerID, itemID) => {
        return new Promise ((resolve, reject) => {
            db.getFirstAsync('SELECT * FROM items WHERE playerID = ? AND itemID = ?',
                [playerID,
                itemID
                ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    saveItemToInventory: async (itemData) => {
        [ playerID, itemID, amount ] = itemData;
        return new Promise ((resolve, reject) => {
            db.runAsync('INSERT INTO items (playerID, itemID, amount) VALUES (?,?,?)',
                [playerID,
                itemID,
                amount
                ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    updateItemInInventory: async (itemData) => {
        [ playerID, itemID, amount ] = itemData;
        return new Promise ((resolve, reject) => {
            db.runAsync('UPDATE playerInventory SET amount = ? WHERE playerID = ? AND itemID = ? VALUES (?,?,?)',
                [amount,
                playerID,
                itemID
                ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    },

    removeItemFromInventory: async (playerID, itemID) => {
        return new Promise ((resolve, reject) => {
            db.runAsync('DELETE FROM playerInventory WHERE playerID = ? AND itemID = ?',
                [playerID,
                itemID
                ],
                (error, results) => {
                    if (error) reject (error);
                    resolve(results);
                }
            );
        });
    }

}

export default inventoryModel;