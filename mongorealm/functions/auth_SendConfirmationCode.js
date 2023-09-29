exports = async function () {
  
  const userId = context.user.id
  const email = context.user.data.email
  

  // // bu sorgu iptal zaten mail adresi contexten alınıyor
  // // 1 - mail adresi sorgusu
  // const isMailValid = String(email)
  //   .toLowerCase()
  //   .match(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
      
  // if(!isMailValid) {
  //   return ({ok:false, hataYeri:"MONGODB // FONK // sendMail_ConfirmationCode", hataMesaj:"payload içindeki mail adresi hatalı", payload:{email,userId} })
  // }
  
  
  
  // kod üretme
  let length = 6 // kod üretilecek hane sayısı
  let mailConfirmationKod = '';
  var characters = '123456789';
  // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    mailConfirmationKod += characters.charAt(Math.floor(Math.random() *  charactersLength));
  }


  
  
  try {
    
    const collection_mailConfirmationCodes = context.services.get("mongodb-atlas").db("rapor724_v2").collection("mailConfirmationCodes")
    const dbKayit = await collection_mailConfirmationCodes.updateOne(
      { userId }, // Query for the user object of the logged in user
      { $set: { mailConfirmationKod} }, // Set the logged in user's favorite color to purple
      { upsert: true }
    );
    
    const subject = "Rapor 7/24 - Mail Doğrulama Kodu"
    const message = "Mail Doğrulama Kodunuz - " + mailConfirmationKod
    const mailSend = await context.functions.execute("sendMail", email, subject, message)
    
    return ({ok:true, Fonksiyon:"MONGO // FONK // setCustomData ", mesaj:"kod db ye kaydedildi ve mail adresine iletildi", dbKayit, mailSend })
    
  } catch (err) {
    return ({ok:false, hataYeri:"MONGO // FONK // setCustomData ", hataMesaj:err.message})
  }


}