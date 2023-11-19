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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// export default function FormMahalCreate({ setShow, isProject, refetch_mahaller }) {
export default function FormMahalCreate({ setShow }) {


  const { isProject, setIsProject } = useContext(StoreContext)
  const { mahaller, setMahaller } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  const [errorObj, seterrorObj] = useState(false)

  const [mahalBilgiBirimId, setMahalBilgiBirimId] = useState();

  // form verilerinde kullanmak için oluşturulan useState() verileri
  // form ilk açıldığında önceden belirlenen birşeyin seçilmiş olması için alttaki satırdaki gibi yapılabiliyor
  // const [mahalTipi, setMahalTipi] = useState(isProject ? isProject.mahalTipleri.find(item => item.id === "direktMahalListesi") : "");

  const RealmApp = useApp();


  // mahal oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // formdan gelen text verilerini alma - (çoktan seçmeliler seçildiği anda useState() kısmında güncelleniyor)
      const data = new FormData(event.currentTarget);
      const mahalBilgisiName = deleteLastSpace(data.get('mahalBilgisiName'))

      const newMahalBilgi = {
        projectId: isProject?._id,
        mahalBilgisiName,
      }

      // veri düzeltme
      console.log("newMahalBilgi", newMahalBilgi)

      // form validation - frontend

      let isFormError = false
      // form alanına değil - direkt ekrana uyarı veren hata - (fonksiyon da durduruluyor)
      if (typeof newMahalBilgi.projectId !== "object") {
        setDialogCase("error")
        setShowDialog("Mahal kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
        console.log("kayıt için gerekli olan 'projectId' verisinde hata olduğu için bu satırın altında durduruldu")
        return
      }

      // form alanına uyarı veren hatalar

      if (typeof newMahalBilgi.mahalBilgisiName !== "string") {
        seterrorObj(prev => ({ ...prev, mahalBilgisiName: "Zorunlu" }))
        isFormError = true
      }

      if (typeof newMahalBilgi.mahalBilgisiName === "string") {
        if (newMahalBilgi.mahalBilgisiName.length === 0) {
          seterrorObj(prev => ({ ...prev, mahalBilgisiName: "Zorunlu" }))
          isFormError = true
        }
      }

      if (typeof newMahalBilgi.mahalBilgisiName === "string") {
        let minimumHaneSayisi = 3
        if (newMahalBilgi.mahalBilgisiName.length > 0 && newMahalBilgi.mahalBilgisiName.length < minimumHaneSayisi) {
          seterrorObj(prev => ({ ...prev, mahalBilgisiName: `${minimumHaneSayisi} haneden az olamaz` }))
          isFormError = true
        }
      }


      // form alanına uyarı veren hatalar olmuşsa burda durduralım
      // if (isFormError) {
      //   console.log("errorObj", errorObj)
      //   console.log("form validation - hata - frontend")
      //   return
      // }


      console.log("sorun yok devam edecek")


      // form verileri kontrolden geçti - db ye göndermeyi deniyoruz
      const result = await RealmApp?.currentUser?.callFunction("createMahalBilgi", newMahalBilgi);
      console.log("result", result)

      // form validation - backend
      if (result.errorObj) {
        seterrorObj(result.errorObj)
        console.log("result.errorObj", result.errorObj)
        console.log("form validation - hata var - backend")
        return
      }
      console.log("form validation - hata yok - backend")

      if (!result.newMahalBilgi?._id) {
        throw new Error("db den -newMahalBilgi- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      setMahaller(oldMahaller => [...oldMahaller, result.newMahalBilgi])
      setIsProject(result.newProject)
      setShow("Main")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki mahal ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        seterrorObj(prev => ({ ...prev, mahalBilgisiName: "Bu mahal bilgisi ismi kullanılmış" }))
        console.log("Bu mahal ismi bu projede mevcut")
        return
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)

    }

  }


  const handleChange_mahalBilgiBirimId = (event) => {
    console.log("event.target.value", event.target.value)
    setMahalBilgiBirimId(isProject.mahalBilgiBirimleri.find(item => item.id === event.target.value).id);
  };




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
              onClick={() => seterrorObj(prevData => {
                const newData = { ...prevData }
                delete newData["mahalBilgisiName"]
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
                id="mahalBilgisiName"
                name="mahalBilgisiName"
                // autoFocus
                error={errorObj.mahalBilgisiName ? true : false}
                helperText={errorObj.mahalBilgisiName ? errorObj.mahalBilgisiName : 'Örn: "Mahal Kodu" veya "Zemin Alanı"'}
                // margin="dense"
                label="Bilgi Türü"
                type="text"
                fullWidth
              />
            </Box>


            {/* varsa birim yazılabilir */}
            <Box
              onClick={() => seterrorObj(prevData => {
                const errorObj = { ...prevData }
                delete errorObj["mahalBilgiBirimId"]
                return errorObj
              })}
              sx={{ minWidth: 120, marginTop: "2rem" }}
            >
              <InputLabel
                error={errorObj.mahalBilgiBirimId ? true : false}
                id="select-newMahalBirimId-label"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Mahal Birim Seçiniz (isteğe bağlı) </Grid>
                </Grid>
              </InputLabel>

              <Select
                error={errorObj.mahalBilgiBirimId ? true : false}
                variant="standard"
                fullWidth
                labelId="select-newMahalBirimId-label"
                id="select-newMahalBirimId"
                value={mahalBilgiBirimId ? mahalBilgiBirimId : ""}
                label="Poz için tip seçiniz"
                onChange={handleChange_mahalBilgiBirimId}
                required
                name="mahalBilgiBirimId"
              // disabled={true}
              >

                <MenuItem value={"hicbiri"}>
                  Hiçbiri
                </MenuItem>
                
                {
                  isProject?.mahalBilgiBirimleri.map((oneMahalBilgi, index) => (
                    <MenuItem key={index} value={oneMahalBilgi.id}>
                      {/* {console.log(oneMahalBilgi)} */}
                      {oneMahalBilgi.name}
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