

// Select the database to use.
use('rapor724_v2');


// db.getCollection('projects').updateMany(
//   {},
//   { $unset: { bilgiTurleri: "" } }
// );


// const haneSayilari = [
//   { id: "0", name: "0" },
//   { id: "0,0", name: "0,0" },
//   { id: "0,00", name: "0,00" },
//   { id: "0,000", name: "0,000" },
//   { id: "0,0000", name: "0,0000" },
// ]


const mahalBasliklari = [
  { id: 1, sira: 1, referans: "kod", goster: true, sabit: true, genislik: 7, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "end", name: "Mahal kod", dataType: "metin" },
  { id: 2, sira: 2, referans: "name", goster: true, sabit: true, genislik: 20, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "end", name: "Mahal İsmi", dataType: "metin" },
]

const pozBasliklari = [
  { id: 1, sira: 1, referans: "kod", goster: true, sabit: true, genislik: 7, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "end", name: "Poz No", dataType: "metin" },
  { id: 2, sira: 2, referans: "name", goster: true, sabit: true, genislik: 20, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "end", name: "Poz İsmi", dataType: "metin" },
]


db.getCollection('projects').updateMany(
  {},
  { $set: { mahalBasliklari, pozBasliklari } }
);





// db.getCollection('pozlar').deleteMany({});

// db.getCollection('projects').updateMany(
//   {},
//   { $set: { "wbs.$[elem].includesPoz": false } },
//   { arrayFilters: [{ "elem.includesPoz": { $ne: false } }] }
// );
