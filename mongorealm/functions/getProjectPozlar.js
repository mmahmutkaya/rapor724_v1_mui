exports = async function({projectId}){
  
  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if(!mailTeyit) throw new Error("MONGO // getProjectPozlar -->  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  if(!projectId) throw new Error("MONGO // getProjectPozlar -->  \"projectId\" sorguya, gönderilmemiş, lütfen Rapor7/24 ile irtibata geçiniz. ")
  let _projectId
  try {
    if(typeof projectId == "string"){
      _projectId = new BSON.ObjectId(projectId)
    } else {
      _projectId = projectId
    }
  } catch(err){
    throw new Error("MONGO // getProjectPozlar -->  " + "MONGO // getProjectPozlar --> sorguya gönderilen \"projectId\" türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz. ") 
  }
  if(typeof _projectId != "object") throw new Error("MONGO // getProjectPozlar -->  " + "MONGO // getProjectPozlar --> sorguya gönderilen \"projectId\" türü doğru değil, lütfen Rapor7/24 ile irtibata geçiniz. ") 


  try {
    
    const collection_Pozlar = context.services.get("mongodb-atlas").db("rapor724_v2").collection("pozlar")
    
    const pozlar = await collection_Pozlar.find({_projectId, isDeleted:false}).toArray()

    return pozlar
    
  } catch(err) {

    throw new Error("MONGO // getprojectWbs // " + err.message)
  }

};



