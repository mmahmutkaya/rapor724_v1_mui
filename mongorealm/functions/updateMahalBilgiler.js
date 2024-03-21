exports = async function ({_projectId, mahalBilgiler_willBeSaved}) {

  const user = context.user
  const _userId = new BSON.ObjectId(user.id)
  const mailTeyit = user.custom_data.mailTeyit
  if (!mailTeyit) throw new Error("MONGO // updateMahalBilgiler --  Öncelikle üyeliğinize ait mail adresinin size ait olduğunu doğrulamalısınız, tekrar giriş yapmayı deneyiniz veya bizimle iletişime geçiniz.")


  const collection_Projects = context.services.get("mongodb-atlas").db("rapor724_v2").collection("projects")

  let isProject = await collection_Projects.findOne({ _id: _projectId, members: _userId, isDeleted: false })
  isProject = { ...isProject }
  if (!isProject) throw new Error("MONGO // updateMahalBilgiler // Mahal başlığı eklemek istediğiniz proje sistemde bulunamadı, lütfen sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ileirtibata geçiniz.")

  const collection_Mahaller = context.services.get("mongodb-atlas").db("rapor724_v2").collection("mahaller")

  
  let newBilgi = {
    mahalId:mahalBilgiler_willBeSaved[0].mahalId,
    baslikId:mahalBilgiler_willBeSaved[0].baslikId,
    veri:mahalBilgiler_willBeSaved[0].veri
  }
  
  
  const result = collection_Mahaller.updateOne(
    {_id:new BSON.ObjectId(mahalBilgiler_willBeSaved[0].mahalId.toString())},
    { $set: { "ilaveBilgiler.$[oneBilgi].veri": mahalBilgiler_willBeSaved[0].veri } },
    { arrayFilters: [{ "oneBilgi.baslik": mahalBilgiler_willBeSaved[0].baslikId } ], upsert: true }
  );
  

  return newBilgi

};


