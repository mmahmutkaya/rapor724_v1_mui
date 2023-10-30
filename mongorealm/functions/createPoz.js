exports = async function (newPoz) {


  const newPozError = {}

  // form validation - backend
  // hata varsa "isFormError" true olacak ve form verileri işlemi duracak
  let isFormError = false

  // form alanına değil - direkt ekrana uyarı veren hata - (fonksiyon da durduruluyor)
  if (typeof newPoz.projectId !== "object") {
    throw new Error("Poz kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }

  // form alanına uyarı veren hatalar

  if (typeof newPoz.wbsId !== "object") {
    newPozError.wbsId = "Zorunlu"
  }


  if (typeof newPoz.pozName !== "string") {
    newPozError.pozName = "Zorunlu"
  }

  if (typeof newPoz.pozName === "string") {
    if (newPoz.pozName.length === 0) {
      newPozError.pozName = "Zorunlu"
    }
  }

  if (typeof newPoz.pozName === "string") {
    let minimumHaneSayisi = 3
    if (newPoz.pozName.length > 0 && newPoz.pozName.length < minimumHaneSayisi) {
      newPozError.pozName =`${minimumHaneSayisi} haneden az olamaz`
    }
  }


  if (typeof newPoz.pozTipId !== "string") {
    newPozError.pozTipId = "Zorunlu"
  }

  if (typeof newPoz.pozBirimId !== "string") {
    newPozError.pozBirimId = "Zorunlu"
  }


  if (Object.keys(newPozError).length) return ({ newPozError })

  return "ok"


  // !wbsId && !errorFormObj.wbsId ? errorFormObj.wbsId = "Zorunlu" : null

  // let _wbsId
  // try {
  //   if (typeof wbsId == "string") {
  //     _wbsId = new BSON.ObjectId(wbsId)
  //   } else {
  //     _wbsId = wbsId
  //   }
  // } catch (err) {
  //   throw new Error("MONGO // createPoz -- sorguya gönderilen --wbsId--  türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz.")
  // }

  // if (typeof _wbsId !== "object") throw new Error("MONGO // createPoz -- sorguya gönderilen --wbsId-- türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz.")

  // if (typeof newPozName != "string") errorFormObj.newPozName === null ? errorFormObj.newPozName = "MONGO // createPoz --  newPozName -- sorguya, string formatında gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. " : null
  // newPozName = await context.functions.execute("functions_deleteLastSpace", newPozName)
  // // if(!newPozName.length) throw new Error("MONGO // createPoz --  newPozName sorguya, gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")
  // if (!newPozName.length) !errorFormObj.newPozName ? errorFormObj.newPozName = "MONGO // createPoz --  newPozName -- sorguya, gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz." : null
  // if (newPozName.length && newPozName.length < 3) !errorFormObj.newPozName ? errorFormObj.newPozName = "MONGO // createPoz --  newPozName -- 3 haneden az" : null

  // if (typeof newPozUnit != "string") !errorFormObj.newPozUnit ? errorFormObj.newPozUnit = "MONGO // createPoz -- newPozUnit -- sorguya, string formatında gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. " : null
  // newPozUnit = await context.functions.execute("functions_deleteLastSpace", newPozUnit)
  // // if(!newPozUnit.length) throw new Error("MONGO // createPoz -- newPozUnit sorguya, gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")
  // if (!newPozUnit.length) !errorFormObj.newPozUnit ? errorFormObj.newPozUnit = "MONGO // createPoz -- newPozUnit -- sorguya, gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz." : null

  // if (Object.keys(errorFormObj).length) return ({ errorFormObj })


  // const user = context.user
  // const _userId = new BSON.ObjectId(user.id)
  // const mailTeyit = user.custom_data.mailTeyit
  // if (!mailTeyit) throw new Error("MONGO // createPoz --  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  // const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects")

  // let project = await collection_Projects.findOne({ _id: _projectId, members: _userId, isDeleted: false })
  // if (!project) throw new Error("MONGO // createPoz // Poz eklemek istediğiniz proje sistemde bulunamadı, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")

  // let theWbs = project.wbs.find(item => item._id.toString() === _wbsId.toString())
  // if (!theWbs) throw new Error("MONGO // createPoz // Poz eklemek istediğiniz poz başlığı sistemde bulunamadı, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")
  // if (!theWbs.openForPoz) throw new Error("MONGO // createPoz // Poz eklemek istediğiniz poz başlığı poz eklemeye açık değil, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")


  // // poz create
  // const currentTime = new Date()

  // let newPoz
  // newPoz = {
  //   _projectId,
  //   _wbsId,
  //   name: newPozName,
  //   unit: newPozUnit,
  //   createdBy: _userId,
  //   createdAt: currentTime,
  //   isDeleted: false
  // }

  // const collection_Pozlar = context.services.get("mongodb-atlas").db("rapor724_v2").collection("pozlar")
  // const result = await collection_Pozlar.insertOne(newPoz)

  // newPoz._id = result.insertedId

  // // wbs / poz başlığı "includesPoz:true" key.value değerine sahip değilse gerekli işlemi yapıyoruz

  // let newProject = project

  // if (!theWbs.includesPoz) {

  //   let newWbsArray = project.wbs.map(item => {

  //     if (item._id.toString() === _wbsId.toString()) {
  //       return { ...item, includesPoz: true }
  //     } else {
  //       return item
  //     }

  //   })

  //   newProject = { ...project, wbs: newWbsArray }

  //   await collection_Projects.updateOne(
  //     { _id: _projectId }, // Query for the user object of the logged in user
  //     { $set: { wbs: newWbsArray } },
  //   );

  //   // await collection_Projects.updateOne(
  //   //   { _id:_projectId }, // Query for the user object of the logged in user
  //   //   { $set: {"wbs.$[elem].includesPoz":true} },
  //   //   { arrayFilters: [ { "elem.wbs": _wbsId } ] , upsert:true }
  //   // );


  // }

  // return ({ newPoz, newProject })


};


