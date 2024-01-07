

// Select the database to use.
use('rapor724_v2');


db.getCollection('projects').updateMany(
  {},
  { $unset: { mahalBilgiBirimleri: "" } }
);


const mahalBirimleri = [
  { id: "mt", name: "mt" },
  { id: "m2", name: "m2" },
  { id: "m3", name: "m3" },
  { id: "ad", name: "ad" },
  { id: "set", name: "set" },
  { id: "tl", name: "TL" },
  { id: "usd", name: "USD" },
  { id: "eur", name: "EUR" },
  { id: "tarih", name: "TARİH" },
]


db.getCollection('projects').updateMany(
  {},
  { $set: { mahalBirimleri } }
);





// db.getCollection('pozlar').deleteMany({});

// db.getCollection('projects').updateMany(
//   {},
//   { $set: { "wbs.$[elem].includesPoz": false } },
//   { arrayFilters: [{ "elem.includesPoz": { $ne: false } }] }
// );
