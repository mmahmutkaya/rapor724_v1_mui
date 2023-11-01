

// Select the database to use.
use('rapor724_v2');



// db.getCollection('metrajlar').updateMany(
//   {},
//   { $set: {metrajTur:"standart"}}
// );


db.getCollection('projects').updateMany(
  {},
  {
    $set: {
      pozTipleri: [
        { id: "direktMahalListesi", name: "Mahal Listesi Üzerinden (Direkt)", birimId: "" },
        { id: "standartMetrajSayfasi", name: "Standart Metraj Sayfası", birimId: "" },
        { id: "insaatDemiri", name: "İnşaat Demiri", birimId: "ton" },
      ],
      pozBirimleri: [
        { id: "mt", name: "mt" },
        { id: "m2", name: "m2" },
        { id: "m3", name: "m3" },
        { id: "kg", name: "kg" },
        { id: "ton", name: "ton" },
        { id: "ad", name: "ad" },
        { id: "set", name: "set" },
        { id: "sa", name: "sa" },
        { id: "gun", name: "gün" },
        { id: "hafta", name: "hafta" },
        { id: "ay", name: "ay" },
        { id: "yil", name: "yıl" },
      ]
    }
  }
);


// db.getCollection('metrajlar').updateMany(
//   {},
//   { $unset: { metrajTur: "" } }
// );

// db.getCollection('metrajlar').deleteMany({});

