import mongodb, { MongoClient } from 'mongodb';

let _db;

export const mongoConnect = () => {
  return mongodb.MongoClient.connect('<DB-CONNECTION-STRING>', { useUnifiedTopology: true })
    .then((client: MongoClient) => {
      _db = client.db();
    })
    .catch((err: any) => {
      console.log(`DB error: ${err}`);
    });
};

export const getDb = () => {
  if (_db) {
    return _db;
  }

  console.log('Db not found!');
};
