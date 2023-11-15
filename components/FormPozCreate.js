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

  const [newPozError, setNewPozError] = useState(false)

  // form verilerinde kullanmak için oluşturulan useState() verileri
  // form ilk açıldığında önceden belirlenen birşeyin seçilmiş olması için alttaki satırdaki gibi yapılabiliyor
  // const [pozTipi, setPozTipi] = useState(isProject ? isProject.pozTipleri.find(item => item.id === "direktMahalListesi") : "");
  const [wbsId, setWbsId] = useState();
  const [pozTipId, setPozTipId] = useState();
  const [pozBirimId, setPozBirimId] = useState();
  const [pozBirimDisabled, setPozBirimDisabled] = useState(false);

  const RealmApp = useApp();


  // poz oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // formdan gelen text verilerini alma - (çoktan seçmeliler seçildiği anda useState() kısmında güncelleniyor)
      const data = new FormData(event.currentTarget);
      const pozName = deleteLastSpace(data.get('pozName'))

      const newPoz = {
        projectId: isProject?._id,
        wbsId,
        pozName,
        pozTipId,
        pozBirimId,
      }

      // veri düzeltme
      if (newPoz.pozTipId === "insaatDemiri") {
        newPoz.pozBirimId = "ton"
      }

      console.log("newPoz", newPoz)


      ////// form validation - frontend

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
        setNewPozError(prev => ({ ...prev, wbsId: "Zorunlu" }))
        isFormError = true
      }


      if (typeof newPoz.pozName !== "string") {
        setNewPozError(prev => ({ ...prev, pozName: "Zorunlu" }))
        isFormError = true
      }

      if (typeof newPoz.pozName === "string") {
        if (newPoz.pozName.length === 0) {
          setNewPozError(prev => ({ ...prev, pozName: "Zorunlu" }))
          isFormError = true
        }
      }

      if (typeof newPoz.pozName === "string") {
        let minimumHaneSayisi = 3
        if (newPoz.pozName.length > 0 && newPoz.pozName.length < minimumHaneSayisi) {
          setNewPozError(prev => ({ ...prev, pozName: `${minimumHaneSayisi} haneden az olamaz` }))
          isFormError = true
        }
      }


      if (typeof newPoz.pozTipId !== "string") {
        setNewPozError(prev => ({ ...prev, pozTipId: "Zorunlu" }))
        isFormError = true
      }

      if (typeof newPoz.pozBirimId !== "string") {
        setNewPozError(prev => ({ ...prev, pozBirimId: "Zorunlu" }))
        isFormError = true
      }


      // form alanına uyarı veren hatalar olmuşsa burda durduralım
      if (isFormError) {
        console.log("form validation - hata - frontend")
        return
      }


      // form verileri kontrolden geçti - db ye göndermeyi deniyoruz
      const result = await RealmApp?.currentUser?.callFunction("createPoz", newPoz);
      console.log("result", result)

      // form validation - backend
      if (result.newPozError) {
        setNewPozError(result.newPozError)
        console.log("result.newPozError", result.newPozError)
        console.log("form validation - hata - backend")
        return
      }
      console.log("form validation - hata yok - backend")

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
        setNewPozError(prev => ({ ...prev, pozName: "Bu poz ismi kullanılmış" }))
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

    const pozTipId = event.target.value
    setPozTipId(isProject.pozTipleri.find(item => item.id === pozTipId).id);
    setPozBirimDisabled(false)

    if (pozTipId === "insaatDemiri") {
      setPozBirimId("ton")
      setPozBirimDisabled(true)
      setNewPozError(prevData => {
        const newData = { ...prevData }
        delete newData["pozBirimId"]
        return newData
      })
    }

  };

  const handleChange_pozBirimId = (event) => {
    setPozBirimId(isProject.pozBirimleri.find(item => item.id === event.target.value).id);
  };


  // aşağıda kullanılıyor
  let wbsCode
  let wbsName

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
            <Box
              onClick={() => setNewPozError(prevData => {
                const newData = { ...prevData }
                delete newData["wbsId"]
                return newData
              })}
              sx={{ minWidth: 120, marginBottom: "0rem" }}
            >

              <InputLabel
                error={newPozError.wbsId ? true : false}
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
                error={newPozError.wbsId ? true : false}
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
                  isProject?.wbs
                    .filter(item => item.openForPoz)
                    .sort(function (a, b) {
                      var nums1 = a.code.split(".");
                      var nums2 = b.code.split(".");

                      for (var i = 0; i < nums1.length; i++) {
                        if (nums2[i]) { // assuming 5..2 is invalid
                          if (nums1[i] !== nums2[i]) {
                            return nums1[i] - nums2[i];
                          } // else continue
                        } else {
                          return 1; // no second number in b
                        }
                      }
                      return -1; // was missing case b.len > a.len
                    })
                    .map(wbsOne => (
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
            <Box
              onClick={() => setNewPozError(prevData => {
                const newData = { ...prevData }
                delete newData["pozName"]
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
                id="pozName"
                name="pozName"
                // autoFocus
                error={newPozError.pozName ? true : false}
                helperText={newPozError.pozName}
                // margin="dense"
                label="Poz Adi"
                type="text"
                fullWidth
              />
            </Box>


            {/* poz Tip seçme - çoktan seçmeli*/}
            <Box
              onClick={() => setNewPozError(prevData => {
                const newData = { ...prevData }
                delete newData["pozTipId"]
                return newData
              })}
              sx={{ minWidth: 120, marginBottom: "0rem" }}
            >
              <InputLabel
                error={newPozError.pozTipId ? true : false}
                id="select-pozTip-label"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Metraj Tipi Seçiniz</Grid>
                </Grid>
              </InputLabel>

              <Select
                error={newPozError.pozTipId ? true : false}
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
            <Box
              onClick={() => setNewPozError(prevData => {
                const newData = { ...prevData }
                delete newData["pozBirimId"]
                return newData
              })}
              sx={{ minWidth: 120, marginTop: "2rem" }}
            >
              <InputLabel
                error={newPozError.pozBirimId ? true : false}
                id="select-newPozBirim-label"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>Poz Birim Seçiniz</Grid>
                </Grid>
              </InputLabel>

              <Select
                error={newPozError.pozBirimId ? true : false}
                variant="standard"
                fullWidth
                labelId="select-newPozBirim-label"
                id="select-newPozBirim"
                value={pozBirimId ? pozBirimId : ""}
                label="Poz için tip seçiniz"
                onChange={handleChange_pozBirimId}
                required
                name="pozBirimId"
                disabled={pozBirimDisabled}
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
