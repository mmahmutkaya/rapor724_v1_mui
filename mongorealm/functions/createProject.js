exports = async function({name}){
  
  const user = context.user
  
  const _userId = new BSON.ObjectId(user.id)
  
  const mailTeyit = user.custom_data.mailTeyit
  if(!mailTeyit) throw new Error("MONGO // createProject // Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")

  
  const currentTime = new Date()
  
  if(typeof name != "string") throw new Error("MONGO // createProject // Proje adı yazılmamış")
  
  if(name.length < 3) throw new Error("MONGO // createProject // Proje adı çok kısa")
  
  
  const project = {
    name,
    wbs:[], // henüz herhangi bir başlık yok fakat yok ama bu property şimdi olmazsa ilk wbs kaydında bir hata yaşıyoruz
    members:[_userId],
    membersA:[_userId],
    createdBy:_userId,
    createdAt:currentTime,
    isDeleted:false
  }
  
  try {

    const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects");
    
    const result = collection_Projects.insertOne(project)
    
    return result

  } catch(err) {

    return { error: err.message };
  }

};