import { useApp } from "./useApp.js";
import { useState, useContext } from 'react';
import { StoreContext } from './store.js'
import { useQueryClient } from '@tanstack/react-query'
import deleteLastSpace from '../functions/deleteLastSpace.js';
import { DialogWindow } from './general/DialogWindow';


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
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';


// export default function FormPozCreate({ setShow, isProject, refetch_pozlar }) {
export default function FormPozCreate({ setShow }) {


  const { isProject, setIsProject } = useContext(StoreContext)
  const { pozlar, setPozlar } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")



  // form validation - çoktan seçmelilerin değerleri hiç kullanılmadığı için sönük
  const [error_for_wbs, setError_for_wbs] = useState(false)
  const [errorText_for_wbs, setErrorText_for_wbs] = useState()

  const [error_for_name, setError_for_name] = useState(false)
  const [errorText_for_name, setErrorText_for_name] = useState()

  const [error_for_pozTipi, setError_for_pozTipi] = useState(false)
  const [errorText_for_pozTipi, setErrorText_for_pozTipi] = useState()

  const [error_for_birim, setError_for_birim] = useState(false)
  const [errorText_for_birim, setErrorText_for_birim] = useState()



  // form verilerinde kullanmak için oluşturulan useState() verileri
  // form ilk açıldığında önceden belirlenen birşeyin seçilmiş olması için alttaki satırdaki gibi yapılabiliyor
  // const [pozTipi, setPozTipi] = useState(isProject ? isProject.pozTipleri.find(item => item.id === "direktMahalListesi") : "");
  const [wbsId, setWbsId] = useState();
  const [pozTipId, setPozTipId] = useState();
  const [pozBirimId, setPozBirimId] = useState();

  const RealmApp = useApp();

  // poz oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // formdan gelen text verilerini alma - (çoktan seçmeliler seçildiği anda useState() kısmında güncelleniyor)
      const data = new FormData(event.currentTarget);
      const pozName = deleteLastSpace(data.get('pozName'))
      // const wbsId = deleteLastSpace(data.get('wbsId'))
      // const pozTipId = deleteLastSpace(data.get('pozTipId'))
      // const pozBirimId = deleteLastSpace(data.get('pozBirimId'))

      const newPoz = {
        projectId: isProject?._id,
        wbsId,
        pozName,
        pozTipId,
        pozBirimId,
      }
      console.log("newPoz", newPoz)


      // form validation - frontend
      // hata varsa "isFormError" true olacak ve form verileri işlemi duracak
      let isFormError = false

      // form alanına değil - direkt ekrana uyarı veren hata - (fonksiyon da durduruluyor)
      if (typeof newPoz.projectId !== "object") {
        setDialogCase("error")
        setShowDialog("Poz kaydı için gerekli olan  'projectId' verisinde hata tespit edildi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
        console.log("kayıt için gerekli olan 'projectId' verisinde hata olduğu için bu satırın altında durduruldu")
        return
      }

      // form alanına uyarı veren hatalar

      if (typeof newPoz.wbsId !== "object") {
        setError_for_wbs(true);
        setErrorText_for_wbs("Zorunlu")
        isFormError = true
      }


      if (typeof newPoz.pozName !== "string") {
        setError_for_name(true);
        setErrorText_for_name("Zorunlu")
        isFormError = true
      }

      if (typeof newPoz.pozName === "string") {
        if (newPoz.pozName.length === 0) {
          setError_for_name(true);
          setErrorText_for_name(`Zorunlu`)
          isFormError = true
        }
      }

      if (typeof newPoz.pozName === "string") {
        let minimumHaneSayisi = 3
        if (newPoz.pozName.length > 0 && newPoz.pozName.length < minimumHaneSayisi) {
          setError_for_name(true);
          setErrorText_for_name(`${minimumHaneSayisi} haneden az olamaz`)
          isFormError = true
        }
      }


      if (typeof newPoz.pozTipId !== "string") {
        setError_for_pozTipi(true);
        setErrorText_for_pozTipi("Zorunlu")
        isFormError = true
      }

      if (typeof newPoz.pozBirimId !== "string") {
        setError_for_birim(true);
        setErrorText_for_birim("Zorunlu")
        isFormError = true
      }


      // form alanına uyarı veren hatalar olmuşsa burda durduralım
      if (isFormError) {
        console.log("poz oluşturma verilerinde hata olduğu için bu satırın altında durduruldu")
        return
      }



      return
      // form verileri kontrolden geçti - db ye göndermeyi deniyoruz
      const result = await RealmApp?.currentUser?.callFunction("createPoz", newPoz);


      // eğer db ye gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (result.errorFormObj) {

        const errorFormObj = result.errorFormObj

        console.log("errorFormObj", errorFormObj)

        if (errorFormObj.wbsId) {
          setError_for_wbs(true);
          setErrorText_for_wbs(errorFormObj.wbsId)
          isFormError = true
        }

        if (errorFormObj.newPozName) {
          setError_for_name(true);
          setErrorText_for_name(errorFormObj.newPozName)
          isFormError = true
        }

        if (errorFormObj.newPozBirim) {
          setError_for_birim(true);
          setErrorText_for_birim(errorFormObj.newPozBirim)
          isFormError = true
        }

        return
      }

      if (!result.newPoz?._id) {
        throw new Error("db den -newPoz- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      setPozlar(oldPozlar => [...oldPozlar, result.newPoz])
      setIsProject(result.newProject)
      setShow("Main")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki poz ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setError_for_name(true);
        setErrorText_for_name("Bu poz ismi bu projede mevcut")
        console.log("Bu poz ismi bu projede mevcut")
        return
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)

    }

  }


  // form verilerini kullanıcıdan alıp react hafızasına yüklemek - onChange - sadece seçmeliler - yazma gibi şeyler formun submit olduğu anda yakalanıyor
  const handleChange_wbs = (event) => {
    setWbsId(isProject.wbs.find(item => item._id.toString() === event.target.value.toString())._id);
  };

  const handleChange_pozTipId = (event) => {
    setPozTipId(isProject.pozTipleri.find(item => item.id === event.target.value).id);
  };

  const handleChange_pozBirimId = (event) => {
    setPozBirimId(isProject.pozBirimleri.find(item => item.id === event.target.value).id);
  };


  // aşağıda kullanılıyor
  let wbsCode
  let wbsName
  let cOunt

  return (
    <div>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("Main")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
              {/* <Typography sx> */}
              Poz Oluştur
              {/* </Typography> */}
            </DialogContentText>



            {/* wbs adı seçme - çoktan seçmeli - poz başlığı için*/}
            <Box onClick={() => setError_for_wbs(false)} sx={{ minWidth: 120, marginBottom: "0rem" }}>

              <InputLabel
                error={error_for_wbs}
                id="select-wbs-label"
              >
                <Grid container justifyContent="space-between">

                  <Grid item>Poz Başlığı Seçiniz</Grid>

                  <Grid item onClick={() => console.log("poz create component wbs tıklandı")} >
                    wbs
                    <ArrowForwardIcon sx={{ fontSize: 15, verticalAlign: "middle" }} />
                  </Grid>

                </Grid>

              </InputLabel>

              <Select
                error={error_for_wbs}
                variant="standard"
                fullWidth
                labelId="select-wbs-label"
                id="select-wbs"
                value={wbsId ? wbsId : ""}
                // label="Poz için başlık seçiniz"
                // label="Poz"
                onChange={handleChange_wbs}
                required
                name="wbsId"
              >
                {
                  isProject?.wbs.filter(item => item.openForPoz).map(wbsOne => (
                    // console.log(wbs)
                    <MenuItem key={wbsOne._id} value={wbsOne._id}>

                      {
                        wbsOne.code.split(".").map((codePart, index) => {

                          let cOunt = wbsOne.code.split(".").length

                          // console.log(cOunt)
                          // console.log(index + 1)
                          // console.log("---")

                          if (index == 0 && cOunt == 1) {
                            wbsCode = codePart
                            wbsName = isProject.wbs.find(item => item.code == wbsCode).name
                          }

                          if (index == 0 && cOunt !== 1) {
                            wbsCode = codePart
                            wbsName = isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                            wbsCode = wbsCode + "." + codePart
                            wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                            wbsCode = wbsCode + "." + codePart
                            wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).name
                          }

                        })
                      }

                      {wbsName.split(">").map((item, index) => (

                        <Box key={index} component={"span"} >
                          {item}
                          {index + 1 !== wbsName.split(">").length &&
                            <Box component={"span"} ml={0.1} mr={0.3}>{"--"}</Box>
                          }
                        </Box>

                      ))}

                    </MenuItem>
                  ))
                }

              </Select>

            </Box>



            {/* poz isminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_name(false)} sx={{ marginBottom: "2rem" }}>
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
                id="pozName"
                name="pozName"
                // autoFocus
                error={error_for_name}
                helperText={error_for_name ? errorText_for_name : null}
                // margin="dense"
                label="Poz Adi"
                type="text"
                fullWidth
              />
            </Box>







            {/* poz Tip seçme - çoktan seçmeli*/}
            <Box onClick={() => setError_for_pozTipi(false)} sx={{ minWidth: 120, marginBottom: "2rem" }}>

              <InputLabel
                error={error_for_pozTipi}
                id="select-pozTip-label"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Metraj Tipi Seçiniz</Grid>
                </Grid>
              </InputLabel>

              <Select
                error={error_for_pozTipi}
                variant="standard"
                fullWidth
                labelId="select-pozTip-label"
                id="select-pozTip"
                value={pozTipId ? pozTipId : ""}
                label="Poz için tip seçiniz"
                onChange={handleChange_pozTipId}
                required
                name="pozTipId"
              >
                {
                  isProject?.pozTipleri.map((onePozTipi, index) => (
                    // console.log(wbs)
                    <MenuItem key={index} value={onePozTipi.id}>
                      {onePozTipi.name}
                    </MenuItem>
                  ))
                }

              </Select>

            </Box>






            {/* poz biriminin seçildiği alan */}
            <Box onClick={() => setError_for_birim(false)} sx={{ minWidth: 120, marginBottom: "0rem" }}>

              <InputLabel
                error={error_for_birim}
                id="select-newPozBirim-label"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Poz Birim Seçiniz</Grid>
                </Grid>
              </InputLabel>

              <Select
                error={error_for_birim}
                variant="standard"
                fullWidth
                labelId="select-newPozBirim-label"
                id="select-newPozBirim"
                value={pozBirimId ? pozBirimId : ""}
                label="Poz için tip seçiniz"
                onChange={handleChange_pozBirimId}
                required
                name="pozBirimId"
              >
                {
                  isProject?.pozBirimleri.map((onePozBirim, index) => (
                    <MenuItem key={index} value={onePozBirim.id}>
                      {/* {console.log(onePozBirim)} */}
                      {onePozBirim.name}
                    </MenuItem>
                  ))
                }

              </Select>

            </Box>

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("PMain")}>İptal</Button>
            <Button type="submit">Oluştur</Button>
          </DialogActions>

        </Box>
      </Dialog>
    </div >
  );



}




const currencies = [
  {
    value: 'USD',
    label: '$',
    name: "ahmed"
  },
  {
    value: 'EUR',
    label: '€',
    name: "mahmut"
  },
  {
    value: 'BTC',
    label: '฿',
    name: "muhammed"
  },
  {
    value: 'JPY',
    label: '¥',
    name: "mustafa"
  },
];
