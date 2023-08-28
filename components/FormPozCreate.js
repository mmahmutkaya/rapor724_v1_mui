import { useApp } from "./useApp.js";
import { useState, useContext } from 'react';
import { StoreContext } from '../components/store'
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


  // console.log("FormPozCreate-->isProject",isProject)

  const { isProject, setIsProject } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  const [error_for_wbs, setError_for_wbs] = useState(false)
  const [errorText_for_wbs, setErrorText_for_wbs] = useState()

  const [error_for_name, setError_for_name] = useState(false)
  const [errorText_for_name, setErrorText_for_name] = useState()

  const [error_for_unit, setError_for_unit] = useState(false)
  const [errorText_for_unit, setErrorText_for_unit] = useState()

  const [wbsId_for_Poz, setWbsId_for_Poz] = useState("");

  const RealmApp = useApp();
  const queryClient = useQueryClient()

  let isError = false

  // poz oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {
      isError = false

      //verileri tanımlama
      const data = new FormData(event.currentTarget);
      const newPozName = deleteLastSpace(data.get('newPozName'))
      const newPozUnit = deleteLastSpace(data.get('newPozUnit'))


      // // useContext de proje ve _id si yoksa poz oluşturma formunu göstermenin bir anlamı yok, hata vererek durduruyoruz
      // if (!isProject?._id) {
      //   throw new Error("Poz oluşturulacak projenin database kaydı için ProjeId belirtilmemiş, sayfayı yeniden yükleyin, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
      // } else {
      //   console.log("isProject?._id", isProject?._id)
      // }


      // // bu kısımda frontend kısmında form validation hatalarını ilgili alanlarda gösterme işlemleri yapılır
      // if (!wbsId_for_Poz) {
      //   setError_for_wbs(true);
      //   setErrorText_for_wbs("Zorunlu")
      //   isError = true
      //   console.log("wbsId_for_Poz", "yok -- error")
      // } else {
      //   console.log("wbsId_for_Poz", wbsId_for_Poz)
      // }

      // if (!newPozName) {
      //   setError_for_name(true);
      //   setErrorText_for_name("Zorunlu")
      //   isError = true
      //   console.log("newPozName", "yok -- error")
      // }

      // if (newPozName.length > 0 && newPozName.length < 3) {
      //   setError_for_name(true)
      //   setErrorText_for_name("3 haneden az")
      //   isError = true
      //   console.log("newPozName", "3 haneden az -- error")
      // }

      // if (!newPozUnit) {
      //   setError_for_unit(true);
      //   setErrorText_for_unit("Zorunlu")
      //   isError = true
      //   console.log("newPozUnit", "yok -- error")
      // } else {
      //   console.log("newPozUnit", newPozUnit)
      // }

      // // ilgili hatalar yukarıda ilgili form alanlarına yazılmış olmalı
      // // db ye sorgu yapılıp db meşgul edilmesin diye burada durduruyoruz
      // // frontendden geçse bile db den errorFormObject kontrolü yapılıyor aşağıda
      // if (isError) {
      //   console.log("return (fonksiyon durdurma) satırı bu mesaj satırının altında idi")
      //   // throw new Error("db ye gönderilmek istenen verilerde hata var")
      //   return
      // }

      const newPoz = {
        projectId: isProject._id,
        wbsId: wbsId_for_Poz,
        newPozName,
        newPozUnit
      }

      const result = await RealmApp?.currentUser?.callFunction("createPoz", newPoz);


      // eğer gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (result.errorFormObj) {

        const errorFormObj = result.errorFormObj

        console.log("errorFormObj", errorFormObj)

        if (errorFormObj.wbsId) {
          setError_for_wbs(true);
          setErrorText_for_wbs(errorFormObj.wbsId)
          isError = true
        }

        if (errorFormObj.newPozName) {
          setError_for_name(true);
          setErrorText_for_name(errorFormObj.newPozName)
          isError = true
        }

        if (errorFormObj.newPozUnit) {
          setError_for_unit(true);
          setErrorText_for_unit(errorFormObj.newPozUnit)
          isError = true
        }

        return
      }

      if (!result.newPoz?._id) {
        throw new Error("db den -newPoz- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      // refetch_pozlar()
      // yukarıdaki yapılan _id kontrolü tamamsa bu veri db de kaydolmuş demektir, refetch_pozlar() yapıp db yi yormaya gerek yok
      // useQuery ile oluşturduğumuz pozlar cash datamızı güncelliyoruz
      const oldPozlar = queryClient.getQueryData(["pozlar"])
      const newPozlar = ([...oldPozlar, result.newPoz])
      queryClient.setQueryData(["pozlar"], newPozlar)

      const newProject = result.newProject
      setIsProject(newProject)

      setShow("PozMain")

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


  const handleChange_newWbsName = (event) => {
    setWbsId_for_Poz(event.target.value);
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
        onClose={() => setShow("PozMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", marginBottom: "2.5rem" }}>
              {/* <Typography sx> */}
              Poz Oluştur
              {/* </Typography> */}
            </DialogContentText>


            {/* wbs adı seçme - çoktan seçmeli - poz başlığı için*/}
            <Box onClick={() => setError_for_wbs(false)} sx={{ minWidth: 120, marginBottom: "1.5rem" }}>

              <InputLabel
                error={error_for_wbs}
                id="select-wbs-label"
              >
                <Grid container justifyContent="space-between">

                  <Grid item>Başlık seçiniz</Grid>

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
                value={wbsId_for_Poz}
                // label="Poz için başlık seçiniz"
                // label="Poz"
                onChange={handleChange_newWbsName}
                required
              >
                {
                  isProject?.wbs.filter(item => item.openForPoz).map(wbsOne => (
                    // console.log(wbs)
                    <MenuItem key={wbsOne._id} value={wbsOne._id}>

                      {
                        wbsOne.code.split(".").map((codePart, index) => {

                          // console.log(cOunt)
                          // console.log(index + 1)
                          // console.log("---")

                          cOunt = wbsOne.code.split(".").length

                          if (index == 0) {
                            wbsCode = codePart
                            wbsName = isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 !== cOunt) {
                            wbsCode = wbsCode + "." + codePart
                            wbsName = wbsName + " > " + isProject.wbs.find(item => item.code == wbsCode).codeName
                          }

                          if (index !== 0 && index + 1 == cOunt) {
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
            <Box onClick={() => setError_for_name(false)} sx={{ marginBottom: "1.5rem" }}>
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
                id="newPozName"
                name="newPozName"
                // autoFocus
                error={error_for_name}
                helperText={error_for_name ? errorText_for_name : null}
                // margin="dense"
                label="Poz Adi"
                type="text"
                fullWidth
              />
            </Box>


            {/* poz biriminin yazıldığı alan */}
            {/* tıklayınca setShowDialogError(false) çalışmasının sebebi -->  error vermişse yazmaya başlamak için tıklayınca error un silinmesi*/}
            <Box onClick={() => setError_for_unit(false)} sx={{ marginBottom: "1.5rem" }}>
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
                id="newPozUnit"
                name="newPozUnit"
                // autoFocus
                error={error_for_unit}
                helperText={error_for_unit ? errorText_for_unit : null}
                // margin="dense"
                label="Poz Birim"
                type="text"
                fullWidth
              />
            </Box>

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("PozMain")}>İptal</Button>
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
