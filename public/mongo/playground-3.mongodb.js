

// Select the database to use.
use('rapor724_v2');



// db.getCollection('projects').updateMany(
//   {},
//   {
//     $set: {
//       pozMetrajTipleri: [
//         { id: "standartMetrajSayfasi", name: "Standart Metraj Sayfası", birimId: "" },
//         { id: "insaatDemiri", name: "İnşaat Demiri", birimId: "ton" },
//       ],
//     }
//   }
// );


db.getCollection('pozlar').updateMany(
  {},
  {
    $set: {
      metrajTipId: "standartMetrajSayfasi"
    }
  }
);




// db.getCollection('metrajlar').updateMany(
//   {},
//   { $unset: { metrajTur: "" } }
// );



// db.getCollection('pozlar').deleteMany({});

// db.getCollection('projects').updateMany(
//   {},
//   { $set: { "wbs.$[elem].includesPoz": false } },
//   { arrayFilters: [{ "elem.includesPoz": { $ne: false } }] }
// );
