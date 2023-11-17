exports = async function (newMahalBilgi) {


  // veri düzeltme


  const errorObj = {}

  // form validation - backend
  // hata varsa "isFormError" true olacak ve form verileri işlemi duracak
  let isFormError = false

  // form alanına değil - direkt ekrana uyarı veren hata - (fonksiyon da durduruluyor)
  if (typeof newMahalBilgi.projectId !== "object") {
    throw new Error("Mahal kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }

  // form alanına uyarı veren hatalar

  if (typeof newMahalBilgi.name !== "string") {
    errorObj.name = "Zorunlu"
  }

  if (typeof newMahalBilgi.name === "string") {
    if (newMahalBilgi.name.length === 0) {
      errorObj.name = "Zorunlu"
    }
  }

  if (typeof newMahalBilgi.name === "string") {
    let minimumHaneSayisi = 3
    if (newMahalBilgi.name.length > 0 && newMahalBilgi.name.length < minimumHaneSayisi) {
      errorObj.name = `${minimumHaneSayisi} haneden az olamaz`
    }
  }


  // verilerde hata varsa
  if (Object.keys(errorObj).length) return ({ errorObj })



  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if (!mailTeyit) throw new Error("MONGO // createMahal --  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects")

  let project = await collection_Projects.findOne({ _id: newMahalBilgi.projectId, members: _userId, isDeleted: false })
  if (!project) throw new Error("MONGO // createMahal // Mahal eklemek istediğiniz proje sistemde bulunamadı, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")

  // mahal create
  const currentTime = new Date()

  // let newMahalBilgi
  newMahalBilgi = {
    _projectId: newMahalBilgi.projectId,
    name: newMahalBilgi.name,
    createdBy: _userId,
    createdAt: currentTime,
    isDeleted: false
  }

  const collection_Mahaller = context.services.get("mongodb-atlas").db("rapor724_v2").collection("mahaller")
  const result = await collection_Mahaller.insertOne(newMahalBilgi)

  newMahalBilgi._id = result.insertedId

  // lbs / mahal başlığı "includesMahal:true" key.value değerine sahip değilse gerekli işlemi yapıyoruz


  let newProject = project

  if (!theWbs.includesMahal) {

    await collection_Projects.updateOne(
      { _id: newMahalBilgi._projectId, "lbs._id": newMahalBilgi._lbsId },
      { $set: { "lbs.$.includesMahal": true } },
    );

    let newWbsArray = project.lbs.map(oneWbs => {

      if (oneWbs._id.toString() === newMahal._lbsId.toString()) {
        return { ...oneWbs, includesMahal: true }
      } else {
        return oneWbs
      }

    })

    newProject = { ...project, lbs: newLbsArray }

  }

  return ({ newMahal, newProject })

};


