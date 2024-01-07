

// Select the database to use.
use('rapor724_v2');


// db.getCollection('projects').updateMany(
//   {},
//   { $unset: { pozTipleri: "" } }
// );


db.getCollection('pozlar').updateMany(
  {},
  { $unset: { tip: "" } }
);



// db.getCollection('pozlar').deleteMany({});

// db.getCollection('projects').updateMany(
//   {},
//   { $set: { "wbs.$[elem].includesPoz": false } },
//   { arrayFilters: [{ "elem.includesPoz": { $ne: false } }] }
// );
