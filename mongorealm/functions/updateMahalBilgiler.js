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

  mahalBilgiler_willBeSaved.map(item => {
    
    const mongoResult = collection_Mahaller.updateOne(
      {_id:item.mahalId},
      { $set: { "ilaveBilgiler.$[oneBilgi].veri": item.veri } },
      { arrayFilters: [{ "oneBilgi.baslik": item.baslikId }, ] }
    );
    
  })
  
  

  return (mongoResult)

};


