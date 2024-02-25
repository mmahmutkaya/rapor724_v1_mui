exports = async function (newMahalBaslik) {


  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if (!mailTeyit) throw new Error("MONGO // createMahalBaslik --  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects")

  let isProject = await collection_Projects.findOne({ _id: newMahalBaslik._projectId, members: _userId, isDeleted: false })
  isProject = { ...isProject }
  if (!isProject) throw new Error("MONGO // createMahalBaslik // Mahal başlığı eklemek istediğiniz proje sistemde bulunamadı, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")



  // veri düzeltme
  if (newMahalBaslik.veriTuruId !== "sayi") {
    delete newMahalBaslik["haneSayisiId"]
    delete newMahalBaslik["birim"]
  }


  // form validation - backend

  const errorObj = {}


  // validation control - mahal başlık - projeId bilgisi
  // form alanına değil - direkt ekrana uyarı veren hata - (fonksiyon da durduruluyor)
  if (typeof newMahalBaslik._projectId !== "object") {
    throw new Error("Mahal kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }



  // validation control - mahal başlık - isim

  if (typeof newMahalBaslik.name !== "string") {
    errorObj.name = "Zorunlu"
  }

  if (typeof newMahalBaslik.name === "string") {
    if (newMahalBaslik.name.length === 0) {
      errorObj.name = "Zorunlu"
    }
  }

  if (typeof newMahalBaslik.name === "string") {
    let minimumHaneSayisi = 3
    if (newMahalBaslik.name.length > 0 && newMahalBaslik.name.length < minimumHaneSayisi) {
      errorObj.name = `${minimumHaneSayisi} haneden az olamaz`
    }
  }

  if (typeof newMahalBaslik.name === "string") {
    if (isProject.mahalbasliklari.find(item => item.name == newMahalBaslik.name)) {
      errorObj.name = `Bu başlık kullanılmış`
    }
  }





  // validation control - mahal başlık - veriTuruId

  if (typeof newMahalBaslik.veriTuruId !== "string") {
    throw new Error("Mahal başlık kaydı için gerekli olan 'veriTuruId' 'metin' ('string') değil, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }

  // validation control - mahal başlık - veriTuruId
  if (!isProject.veriTurleri.find(item => item.id == newMahalBaslik.veriTuruId)) {
    throw new Error("Mahal başlık kaydı için gerekli olan 'veriTuruId' projede kayıtlı bulunamadı, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }




  // validation control - mahal başlık - birim

  if (!(!newMahalBaslik.birim || typeof newMahalBaslik.birim == "string")) {
    throw new Error("Mahal başlık kaydı için gerekli olan 'birim' verisi 'tanımsız' ('undefined') veya 'metin' ('string') değil, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }
  //
  if (typeof newMahalBaslik.birim === "string") {
    let maksimumHaneSayisi = 10
    if (newMahalBaslik.haneSayisiId.length > 0 && newMahalBaslik.haneSayisiId.length > maksimumHaneSayisi) {
      errorObj.birim = `${maksimumHaneSayisi} haneden fazla olamaz`
    }
  }





  // validation control - mahal başlık - haneSayisiId

  if (!(!newMahalBaslik.haneSayisiId || typeof newMahalBaslik.haneSayisiId == "string")) {
    throw new Error("Mahal başlık kaydı için gerekli olan 'haneSayisiId' verisi 'tanımsız' ('undefined') olmalı veya 'metin' ('string') olmalı, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }

  if (typeof newMahalBaslik.haneSayisiId === "string") {
    if (newMahalBaslik.haneSayisiId.length > 0) {
      if (!isProject.haneSayilari.find(item => item.id == newMahalBaslik.haneSayisiId)) {
        throw new Error("Mahal başlık kaydı için gerekli olan 'haneSayisiId' projede kayıtlı bulunamadı, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
      }
    }
  }




  // gelen form verilerinde hata varsa durdur ve error object gönder - frontend tarafında formun ilgili alanında hata göstermek için
  if (Object.keys(errorObj).length) return ({ errorObj })



  // mahal create
  const currentTime = new Date()

  // let newMahalBaslik
  newMahalBaslik = {
    ...newMahalBaslik,
    createdBy: _userId,
    createdAt: currentTime,
    isDeleted: false
  }



  // const result = await collection_Projects.updateOne(
  //   { _id: newMahalBaslik._projectId },
  //   { $push: { mahalBasliklari: newMahalBaslik } }
  // )

  return newMahalBaslik

  // newMahalBaslik._id = result.insertedId

  // // lbs / mahal başlığı "includesMahal:true" key.value değerine sahip değilse gerekli işlemi yapıyoruz


  // let newProject = project

  // if (!theWbs.includesMahal) {

  //   await collection_Projects.updateOne(
  //     { _id: newMahalBaslik._projectId, "lbs._id": newMahalBaslik._lbsId },
  //     { $set: { "lbs.$.includesMahal": true } },
  //   );

  //   let newWbsArray = project.lbs.map(oneWbs => {

  //     if (oneWbs._id.toString() === newMahal._lbsId.toString()) {
  //       return { ...oneWbs, includesMahal: true }
  //     } else {
  //       return oneWbs
  //     }

  //   })

  //   newProject = { ...project, lbs: newLbsArray }

  // }

  return ({ newMahal, newProject })

};


