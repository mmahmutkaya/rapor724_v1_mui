

// Select the database to use.
use('rapor724_v2');


// db.getCollection('metrajlar').updateMany(
//   {},
//   { $set: {wbs:{}}}
// );

db.getCollection('metrajlar').deleteMany({});

