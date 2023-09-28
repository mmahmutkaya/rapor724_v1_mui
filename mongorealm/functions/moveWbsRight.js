exports = async function({projectId,wbsId}){
  
  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if(!mailTeyit) throw new Error("MONGO // moveWbsRight // Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  // const _projectId = new BSON.ObjectId(projectId)
  let _projectId
  try {
    _projectId = new BSON.ObjectId(projectId)
  } catch(err){
    _projectId = projectId
  }
  
  const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects")
  const project = await collection_Projects.findOne({_id:_projectId, members:_userId, isDeleted:false})
  
  if(!project) throw new Error("MONGO // moveWbsRight // Proje bulunamadı")
  if(!project.wbs) throw new Error("MONGO // moveWbsRight // Projeye ait WBS bulunamadı")


  let wbsOne = project.wbs.find(item => item._id.toString() == wbsId.toString())
  
  if(!wbsOne) {
    throw new Error("MONGO // moveWbsRight // wbsId sistemde bulunamadı, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
  }

  let _wbs = project.wbs
  let _selectedWbs = wbsOne


  let leftPart = _selectedWbs.code.substring(0, _selectedWbs.code.lastIndexOf("."))
  let level = _selectedWbs.code.split(".").length - 1
  let sortNumber = Number(_selectedWbs.code.split(".")[level])
  let longText = _selectedWbs.code

  let leftPartB = leftPart.substring(0, leftPart.lastIndexOf("."))
  let levelB = leftPart.split(".").length - 1
  let sortNumberB = Number(leftPart.split(".")[levelB])
  let longTextB = leftPart
  
  
  let name_Match = false
  let codeName_Match = false
  let codeName_Match_name

  // zaten en üst seviyede ise daha fazla sağa alınamaz
  if(sortNumber == 1) {
    throw new Error("MONGO // moveWbsRight // __mesajBaslangic__ deneme -- bu başlık zaten bir üstteki başlığın alt başlığı, daha fazla sağa alınamaz __mesajBitis__")
  }


  // seçilen başlığın en alt seviyede alt başlığı varsa daha fazla sağa kaydırma yapılamaz - işlem iptal
  let maxLevel = level
  _wbs.map(item => {
    let leftPart2 = item.code.substring(0, item.code.lastIndexOf("."))
    let level2 = item.code.split(".").length - 1
    let sortNumber2 = Number(item.code.split(".")[level2])
    let longText2 = item.code
    if(longText2.indexOf(longText + ".") === 0 && level2 > maxLevel ){
      maxLevel = level2
    }
  })
  if(maxLevel == 7) {
    throw new Error("MONGO // moveWbsRight // __mesajBaslangic__ maksimum seviyede alt başlık oluşturulmuş __mesajBitis__")
  }


  // seçilen başlığın üst başlığını tespit etme
  let upWbs = {}
  _wbs.map(item => {
    let leftPart2 = item.code.substring(0, item.code.lastIndexOf("."))
    let level2 = item.code.split(".").length - 1
    let sortNumber2 = Number(item.code.split(".")[level2])
    let longText2 = item.code
    if (leftPart2 === leftPart && sortNumber2 === sortNumber - 1) {
      upWbs = item
    }
  })

  // isim benzerliği kontrol - taşınacak seviyede
  _wbs.map(item => {
    let leftPart2 = item.code.substring(0, item.code.lastIndexOf("."))
    let level2 = item.code.split(".").length - 1
    let sortNumber2 = Number(item.code.split(".")[level2])
    let longText2 = item.code
    if (leftPart2 === upWbs.code) {
      if(item.name === _selectedWbs.name) {
        name_Match = true
      }
      if(item.codeName === _selectedWbs.codeName) {
        codeName_Match = true
        codeName_Match_name = item.name
      }
    }
  })
  
  
  if(name_Match){
    throw new Error("MONGO // moveWbsRight // __mesajBaslangic__ Taşınmak istenen seviyede --" + _selectedWbs.name + "-- ismi mevcut, aynı seviyede iki aynı başlık kullanılamaz. __mesajBitis__")
  }

  if(codeName_Match){
    throw new Error("MONGO // moveWbsRight // __mesajBaslangic__ Taşınmak istenen seviyede --" + codeName_Match_name + "-- isimli başlığın kod ismi --" + _selectedWbs.codeName + "-- ve taşınmak istenen başlığın kod ismi ile aynı. Aynı seviyede iki aynı kod ismi kullanılamaz. __mesajBitis__")
  }



  // üst başlık poza açıksa iptal
  if (upWbs.openForPoz) {
    throw new Error("MONGO // moveWbsRight // __mesajBaslangic__ poza açık başlıkların alt başlığı olamaz. __mesajBitis__")
  }

  // tespit edilen üst başlığın mevcut alt başlıkları varsa en sonuncusunu bulma
  let maxNumber = 0
  _wbs.map(item => {
    let leftPart2 = item.code.substring(0, item.code.lastIndexOf("."))
    let level2 = item.code.split(".").length - 1
    let sortNumber2 = Number(item.code.split(".")[level2])
    let longText2 = item.code

    if (longText2.indexOf((upWbs.code + ".")) === 0 && level2 === level + 1) {
      if (maxNumber < sortNumber2) {
        maxNumber = sortNumber2
      }
    }
  })
  
  
  // 1 artırıp newCode numaramızı bulma
  const newCode = upWbs.code + "." + (maxNumber + 1)


  // _wbs içinde kullanıcı tarafından seçilen başlığın kodunu değiştirerek yeni yerine taşıyoruz
  _wbs = _wbs.map(item => {
    if (item._id.toString() === _selectedWbs._id.toString()) {
      return { ...item, code: newCode }
    } else {
      return item
    }
  })


  // seçilen başlığın varsa alt başlıklarının da kodunu değiştirerek onları da beraberinde taşıyoruz
  _wbs = _wbs.map(item => {
    if (item.code.indexOf(_selectedWbs.code + ".") === 0) {
      let rightPartWithTheNumber = item.code.substring(_selectedWbs.code.length + 1, item.code.length)
      // console.log("rightPartWithTheNumber", rightPartWithTheNumber)
      return { ...item, code: newCode + "." + rightPartWithTheNumber }
    } else {
      return item
    }
  })


  // seçilen başlık taşındıığ için altındaki başlıkların numaralarını bir azaltıyoruz
  _wbs = _wbs.map(item => {


    // taşınmak istenen, seçilen başlık - en üst seviyede ise
    if (!leftPart) {
      let rightPartWithTheNumber = item.code
      let theNumberText = rightPartWithTheNumber.split(".")[0]
      let theNumber = parseInt(theNumberText)
      // rightPart 11.23.45 --> 23.45
      let rightPart = rightPartWithTheNumber.substring(theNumberText.length + 1, rightPartWithTheNumber.length)

      if (theNumber > sortNumber) {
        let newCode = rightPart ? (theNumber - 1) + "." + rightPart : (theNumber - 1).toString()
        return { ...item, code: newCode }
      }
    }

    // taşınmak istenen, seçilen başlık - en üst seviyede değilse
    if (leftPart) {
      let rightPartWithTheNumber = item.code.substring(leftPart.length + 1, item.code.length)
      let theNumberText = rightPartWithTheNumber.split(".")[0]
      let theNumber = parseInt(theNumberText)
      // rightPart 11.23.45 --> 23.45
      let rightPart = rightPartWithTheNumber.substring(theNumberText.length + 1, rightPartWithTheNumber.length)

      if (leftPart && item.code.indexOf(leftPart + ".") === 0 && theNumber > sortNumber) {
        let newCode = rightPart ? leftPart + "." + (theNumber - 1) + "." + rightPart : leftPart + "." + (theNumber - 1).toString()
        return { ...item, code: newCode }
      }
    }

    // yukarıdaki hiç bir if den dönmediyse burada değişiklik yapmadan item gönderiyoruz
    return item


  })

  
  await collection_Projects.updateOne(
    { _id:_projectId }, // Query for the user object of the logged in user
    { $set: {wbs:_wbs} }, // Set the logged in user's favorite color to purple
    // { "$push": { "wbs": newWbsItem  } }
    // { upsert: true }
  );
  
  return {project:{...project, wbs:_wbs}}


};