import { useApp } from "./useApp.js";
import { useState, useContext } from 'react';
import { StoreContext } from './store.js'
import deleteLastSpace from '../functions/deleteLastSpace.js';
import { DialogWindow } from './general/DialogWindow.js';


//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MenuItem from '@mui/material/MenuItem';



// export default function FormMahalCreate({ setShow, isProject, refetch_mahaller }) {
export default function FormMahalCreate({ setShow }) {

  const { isProject, setIsProject } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  const [errorObj, setErrorObj] = useState(false)

  const [mahalBilgi_veriTuruId, setMahalBilgi_veriTuruId] = useState("metin")
  const [mahalBilgi_haneSayisiId, setMahalBilgi_haneSayisiId] = useState("0,00")

  // form ilk açıldığında önceden belirlenen birşeyin seçilmiş olması için alttaki satırdaki gibi yapılabiliyor
  // const [mahalTipi, setMahalTipi] = useState(isProject ? isProject.mahalTipleri.find(item => item.id === "direktMahalListesi") : "");

  const RealmApp = useApp();


  // mahal oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // formdan gelen text verilerini alma - (çoktan seçmeliler seçildiği anda useState() kısmında güncelleniyor)
      const data = new FormData(event.currentTarget);
      const mahalBilgi_name = deleteLastSpace(data.get('mahalBilgi_name'))
      const mahalBilgi_veriTuruId = deleteLastSpace(data.get('mahalBilgi_veriTuruId'))
      const mahalBilgi_birim = deleteLastSpace(data.get('mahalBilgi_birim'))
      const mahalBilgi_haneSayisiId = deleteLastSpace(data.get('mahalBilgi_haneSayisiId'))
      const projectId = isProject?._id


      // form validation - frontend

      // aşağıda kontroller başlıyor, hata varsa bunu true yapıcaz ve db ye göndermeyi engellicez ve formda uyarıları göstericez
      let isFormError = false


      if (typeof projectId !== "object") {
        setDialogCase("error")
        setShowDialog("Mahal kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
        console.log("kayıt için gerekli olan 'projectId' verisinde hata olduğu için bu satırın altında durduruldu")
        return
      }



      // validation control - mahal bilgi ismi
      if (typeof mahalBilgi_name !== "string") {
        setErrorObj(prev => ({ ...prev, mahalBilgi_name: "Zorunlu" }))
        isFormError = true
      }

      if (typeof mahalBilgi_name === "string") {
        if (mahalBilgi_name.length === 0) {
          setErrorObj(prev => ({ ...prev, mahalBilgi_name: "Zorunlu" }))
          isFormError = true
        }
      }

      if (typeof mahalBilgi_name === "string") {
        let minimumHaneSayisi = 3
        if (mahalBilgi_name.length > 0 && mahalBilgi_name.length < minimumHaneSayisi) {
          setErrorObj(prev => ({ ...prev, mahalBilgi_name: `${minimumHaneSayisi} haneden az olamaz` }))
          isFormError = true
        }
      }



      // validation control - mahal bilgi ismi
      if (typeof mahalBilgi_birim !== "string") {
        setDialogCase("error")
        setShowDialog("Beklenmedik bir hata oluştu, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
        console.log("kayıt için gerekli olan 'mahalBilgi_birim' veri türü string olmadığı için bu satırın altında durduruldu")
        return
      }

      if (typeof mahalBilgi_birim === "string") {
        let maximumHaneSayisi = 10
        if (mahalBilgi_birim.length > 0 && mahalBilgi_birim.length > maximumHaneSayisi) {
          setErrorObj(prev => ({ ...prev, mahalBilgi_birim: `${maximumHaneSayisi} haneden fazla olamaz` }))
          isFormError = true
        }
      }


      // form alanına uyarı veren hatalar olmuşsa db ye göndermeden burda durduralım
      if (isFormError) {
        console.log("errorObj", errorObj)
        console.log("form validation - hata tespit edildi - frontend")
        return
      }


      const mahalBilgi = {
        projectId: isProject?._id,
        name: mahalBilgi_name,
        veriTuruId: mahalBilgi_veriTuruId,
        birim: mahalBilgi_birim,
        haneSayisiId: mahalBilgi_haneSayisiId,
      }


      // form verileri kontrolden geçti - db ye göndermeyi deniyoruz
      const result = await RealmApp?.currentUser?.callFunction("createMahalBaslik", mahalBilgi);
      console.log("result", result)



      // form validation - backend
      if (result.errorObj) {
        setErrorObj(result.errorObj)
        console.log("result.errorObj", result.errorObj)
        console.log("form validation - hata var - backend")
        return
      }
      console.log("form validation - hata yok - backend")

      if (!result.mahalBilgi?._id) {
        throw new Error("db den -mahalBilgi- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }


      (oldMahaller => [...oldMahaller, result.mahalBilgi])
      setIsProject(result.newProject)
      setShow("Main")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki mahal ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setErrorObj(prev => ({ ...prev, mahalBilgisiName: "Bu mahal bilgisi ismi kullanılmış" }))
        console.log("Bu mahal ismi bu projede mevcut")
        return
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)

    }

  }


  const handleChange_mahalBilgi_veriTuruId = (event) => {
    console.log("event.target.value", event.target.value)
    setMahalBilgi_veriTuruId(isProject.veriTurleri?.find(item => item.id === event.target.value).id);
  };


  const handleChange_mahalBilgi_haneSayisiId = (event) => {
    console.log("event.target.value", event.target.value)
    setMahalBilgi_haneSayisiId(isProject.haneSayilari?.find(item => item.id === event.target.value).id);
  };

  console.log("isProject", isProject)

  return (
    <div>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("Main")}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
              {/* <Typography sx> */}
              Mahal Bilgisi Oluştur
              {/* </Typography> */}
            </DialogContentText>


            {/* mahal bilgisi isminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box
              onClick={() => setErrorObj(prevData => {
                const newData = { ...prevData }
                delete newData["mahalBilgi_name"]
                return newData
              })}
              sx={{ minWidth: 120, marginBottom: "2rem" }}
            >
              <TextField
                sx={{
                  "& input:-webkit-autofill:focus": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                  "& input:-webkit-autofill": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                }}
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="mahalBilgi_name"
                name="mahalBilgi_name"
                // autoFocus
                error={errorObj.mahalBilgi_name ? true : false}
                helperText={errorObj.mahalBilgi_name ? errorObj.mahalBilgi_name : 'Örn: "Mahal Tipi" veya "Zemin Alanı"'}
                // margin="dense"
                label="Başlık"
                type="text"
                fullWidth
              />
            </Box>


            {/* mahal bilgi veri türü seçimi */}
            <Box
              onClick={() => setErrorObj(prevData => {
                const errorObj = { ...prevData }
                delete errorObj["mahalBilgi_veriTuruId"]
                return errorObj
              })}
              sx={{ minWidth: 120, marginTop: "2rem", marginBottom: "1rem" }}
            >

              <InputLabel
                error={errorObj.mahalBilgi_veriTuruId ? true : false}
                id="mahalBilgi_veriTuruId"
              >
                <Grid container justifyContent="space-between">
                  <Grid item> Veri Türü </Grid>
                </Grid>
              </InputLabel>

              <Select
                error={errorObj.mahalBilgi_veriTuruId ? true : false}
                variant="standard"
                fullWidth
                labelId="mahalBilgi_veriTuruId"
                id="select-verıTuruId"
                value={mahalBilgi_veriTuruId ? mahalBilgi_veriTuruId : ""}
                label="Poz için tip seçiniz"
                onChange={handleChange_mahalBilgi_veriTuruId}
                required
                name="mahalBilgi_veriTuruId"
              // disabled={true}
              >
                {
                  isProject?.veriTurleri?.map((oneVeriTuru, index) => (
                    <MenuItem key={index} value={oneVeriTuru.id}>
                      {/* {console.log(oneVeriTuru)} */}
                      {oneVeriTuru.name}
                    </MenuItem>
                  ))
                }
              </Select>

            </Box>


            {/* sayı verisi girince biriminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box
              onClick={() => setErrorObj(prevData => {
                const newData = { ...prevData }
                delete newData["mahalBilgi_birim"]
                return newData
              })}
              sx={{ display: mahalBilgi_veriTuruId == "sayi" ? "block" : "none", minWidth: 120 }}
            >
              <TextField
                sx={{
                  "& input:-webkit-autofill:focus": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                  "& input:-webkit-autofill": {
                    transition: "background-color 600000s 0s, color 600000s 0s"
                  },
                }}
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}
                margin="normal"
                id="mahalBilgi_birim"
                name="mahalBilgi_birim"
                // autoFocus
                error={errorObj.mahalBilgi_birim ? true : false}
                helperText={errorObj.mahalBilgi_birim ? errorObj.mahalBilgi_birim : 'Örn:  m2 - TL - Gün - Ad.'}
                // margin="dense"
                label="Birim"
                type="text"
                fullWidth
              />
            </Box>



            {/* virgülden sonra gösterilecek hane sayısı seçimi*/}
            <Box
              onClick={() => setErrorObj(prevData => {
                const errorObj = { ...prevData }
                delete errorObj["mahalBilgi_haneSayisiId"]
                return errorObj
              })}
              sx={{ display: mahalBilgi_veriTuruId == "sayi" ? "block" : "none", minWidth: 120, marginTop: "2rem", marginBottom: "1rem" }}
            >

              <InputLabel
                error={errorObj.mahalBilgi_haneSayisiId ? true : false}
                id="mahalBilgi_haneSayisiId"
              >
                <Grid container justifyContent="space-between">
                  <Grid item> Hane Sayısı </Grid>
                </Grid>
              </InputLabel>

              <Select
                error={errorObj.mahalBilgi_haneSayisiId ? true : false}
                variant="standard"
                fullWidth
                labelId="mahalBilgi_haneSayisiId"
                id="select-hanesayisiId"
                value={mahalBilgi_haneSayisiId ? mahalBilgi_haneSayisiId : ""}
                label="Gösterilecek hane sayısını seçiniz"
                onChange={handleChange_mahalBilgi_haneSayisiId}
                required
                name="mahalBilgi_haneSayisiId"
              // disabled={true}
              >
                {
                  isProject?.haneSayilari?.map((oneHaneSayisi, index) => (
                    <MenuItem key={index} value={oneHaneSayisi.id}>
                      {/* {console.log(oneHaneSayisi)} */}
                      {oneHaneSayisi.name}
                    </MenuItem>
                  ))
                }
              </Select>

            </Box>




          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("Main")}>İptal</Button>
            <Button type="submit">Oluştur</Button>
          </DialogActions>

        </Box>
      </Dialog>
    </div >
  );



}