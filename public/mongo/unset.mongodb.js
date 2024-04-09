

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


// const mahalBasliklari = [
//   { id: 1, sira: 1, referans: "kod", goster: true, sabit: true, genislik: 7, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "center", name: "Mahal kod", veriTuruId: "metin" },
//   { id: 2, sira: 2, referans: "name", goster: true, sabit: true, genislik: 20, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "center", name: "Mahal İsmi", veriTuruId: "metin" },
// ]


// const pozBasliklari = [
//   { id: 1, sira: 1, referans: "kod", goster: true, sabit: true, genislik: 7, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "center", name: "Poz No", veriTuruId: "metin" },
//   { id: 2, sira: 2, referans: "name", goster: true, sabit: true, genislik: 20, paddingInfo: "0px 1rem 0px 0px", yatayHiza: "center", name: "Poz İsmi", veriTuruId: "metin" },
// ]


// db.getCollection('pozlar').updateMany(
//   {},
//   { $set: { ilaveBilgiler: [] } }
// );





db.getCollection('metrajlar').deleteMany({});

// db.getCollection('projects').updateMany(
//   {},
//   { $set: { "wbs.$[elem].includesPoz": false } },
//   { arrayFilters: [{ "elem.includesPoz": { $ne: false } }] }
// );
