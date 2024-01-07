/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('rapor724_v2');

// // Insert a few documents into the sales collection.
// db.getCollection('sales').insertMany([
//   { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
//   { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
//   { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
//   { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
//   { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
//   { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
//   { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
//   { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
// ]);

// // Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);

// // Here we run an aggregation and open a cursor to the results.
// // Use '.toArray()' to exhaust the cursor to return the whole result set.
// // You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);



const wbsOrjinal = [
  {
    "_id": {
      "$oid": "64cff00d623dfe03ae2298d3"
    },
    "code": "1",
    "name": "İNCE İŞLER",
    "codeName": "INC"
  },
  {
    "_id": {
      "$oid": "64edc35cababd7ee1d8fea1d"
    },
    "code": "1.1.4.1.1",
    "name": "KABA İŞLER",
    "codeName": "KAB",
    "openForPoz": false
  },
  {
    "_id": {
      "$oid": "64ef9accce6801d60eadc044"
    },
    "code": "1.1.4.1",
    "name": "ZEMİN İŞLERİ",
    "codeName": "ZEM"
  },
  {
    "_id": {
      "$oid": "64ef9d6d56c574ec8402992c"
    },
    "code": "1.1",
    "name": "İZOLASYON İŞLERİ",
    "codeName": "İZO",
    "openForPoz": false
  },
  {
    "_id": {
      "$oid": "64f38e010c4b11fecf9c7a42"
    },
    "code": "1.1.2",
    "name": "ÇATI İZOLASYON",
    "codeName": "ÇATİZO",
    "openForPoz": true,
    "includesPoz": true
  },
  {
    "_id": {
      "$oid": "64f38e1fd0485979a55ff872"
    },
    "code": "1.1.4.1.2",
    "name": "PARKE İŞLERİ",
    "codeName": "PARKE",
    "openForPoz": true
  },
  {
    "_id": {
      "$oid": "64f392cafd541a41329ea76a"
    },
    "code": "2",
    "name": "BOYA İŞLERİ",
    "codeName": "BOYA",
    "openForPoz": true,
    "includesPoz": true
  },
  {
    "_id": {
      "$oid": "64f398040c4b11fecf9f9851"
    },
    "code": "1.1.1",
    "name": "BANYO İZOLASYON",
    "codeName": "BANİZO",
    "openForPoz": true
  },
  {
    "_id": {
      "$oid": "64fc294e5182ea221151e2ce"
    },
    "code": "1.1.4",
    "name": "WC İZOLASYON",
    "codeName": "WCİZO"
  },
  {
    "_id": {
      "$oid": "6509caae52db92ac3446007f"
    },
    "code": "1.1.3",
    "name": "TAVAN KAPLAMA İŞLERİ",
    "codeName": "TVNKAP",
    "openForPoz": true
  },
  {
    "_id": {
      "$oid": "651020743ca016b19da9af2b"
    },
    "code": "3.1",
    "name": "KABA İŞLER",
    "codeName": "KAB"
  },
  {
    "_id": {
      "$oid": "651020844c9778c6ed4da244"
    },
    "code": "3",
    "name": "RESTORASYON İŞLERİ",
    "codeName": "REST"
  },
  {
    "_id": {
      "$oid": "651020a6b31bd2b9494de640"
    },
    "code": "3.1.1.1",
    "name": "HAFRİYAT",
    "codeName": "HAF"
  },
  {
    "_id": {
      "$oid": "651020d0b31bd2b9494df781"
    },
    "code": "3.1.1",
    "name": "BWTONARME İŞLERİ",
    "codeName": "BET"
  },
  {
    "_id": {
      "$oid": "651020fe4c9778c6ed4dd18b"
    },
    "code": "3.1.1.1.1",
    "name": "F34F3",
    "codeName": "3F34F3"
  },
  {
    "_id": {
      "$oid": "651021044c9778c6ed4dd426"
    },
    "code": "3.1.1.1.1.1",
    "name": "3F434F3",
    "codeName": "F4334F3"
  },
  {
    "_id": {
      "$oid": "651021083ca016b19da9e658"
    },
    "code": "3.1.1.1.1.1.1",
    "name": "F3F3",
    "codeName": "3F33"
  },
  {
    "_id": {
      "$oid": "6510210db31bd2b9494e0601"
    },
    "code": "3.1.1.1.1.1.1.1",
    "name": "F43F43",
    "codeName": "3F3"
  }
]



db.getCollection('projects').updateMany(
  {},
  { $set: {wbs:{}}}
);


