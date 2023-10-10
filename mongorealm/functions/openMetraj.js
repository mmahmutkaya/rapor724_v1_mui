exports = async function ({ projectId, mahalId, pozId }) {

  // gelen verileri ikiye ayırabiliriz, 1-form verisinden önceki ana veriler  2-form verileri

  // 1 de hata varsa hata ile durdurulur
  // 1 tamam - 2 de hata varsa - form hata objesi gönderilir, formun ilgili alanlarında hata gösterilebilir

  // 2 - yukarıda açıklandı

  if (!projectId) throw new Error("MONGO // openMetraj // Proje Id -- sorguya gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")

  let _projectId
  try {
    if (typeof projectId == "string") {
      _projectId = new BSON.ObjectId(projectId)
    } else {
      _projectId = projectId
    }
  } catch (err) {
    throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --projectId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz.")
  }
  if (typeof _projectId != "object") throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --projectId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz. ")



  if (!mahalId) throw new Error("MONGO // openMetraj // Proje Id -- sorguya gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")

  let _mahalId
  try {
    if (typeof mahalId == "string") {
      _mahalId = new BSON.ObjectId(mahalId)
    } else {
      _mahalId = mahalId
    }
  } catch (err) {
    throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --mahalId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz.")
  }
  if (typeof _mahalId != "object") throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --mahalId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz. ")



  if (!pozId) throw new Error("MONGO // openMetraj // Proje Id -- sorguya gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")

  let _pozId
  try {
    if (typeof pozId == "string") {
      _pozId = new BSON.ObjectId(pozId)
    } else {
      _pozId = pozId
    }
  } catch (err) {
    throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --pozId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz.")
  }
  if (typeof _pozId != "object") throw new Error("MONGO // openMetraj --  " + "MONGO // openMetraj -- sorguya gönderilen --pozId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz. ")




  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if (!mailTeyit) throw new Error("MONGO // openMetraj --  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  // poz create
  const currentTime = new Date()

  // let newMetraj
  // newMetraj = {
  //   _projectId,
  //   _mahalId,
  //   _pozId,
  //   open: true,
  //   createdBy: _userId,
  //   createdAt: currentTime,
  //   isDeleted: false
  // }

  const collection_Metrajlar = context.services.get("mongodb-atlas").db("rapor724_v2").collection("metrajlar")

  const result = await collection_Metrajlar.updateOne(
    { _projectId, _mahalId, _pozId }, // Query for the user object of the logged in user
    {
      $set: {
        open: true,
        createdBy: _userId,
        createdAt: currentTime,
      }
    },
    { upsert: true }
  );

  newMetraj._id = result.insertedId

  return ({ newMetraj })

};


