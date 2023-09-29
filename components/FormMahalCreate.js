import { useApp } from "./useApp.js";
import { useState, useContext } from 'react';
import { StoreContext } from './store.js'
import { useQueryClient } from '@tanstack/react-query'
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


// export default function FormMahalCreate({ setShow, isProject, refetch_mahallar }) {
export default function FormMahalCreate({ setShow }) {


  // console.log("FormMahalCreate-->isProject",isProject)

  const { isProject, setIsProject } = useContext(StoreContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogCase, setDialogCase] = useState("")

  const [error_for_lbs, setError_for_lbs] = useState(false)
  const [errorText_for_lbs, setErrorText_for_lbs] = useState()

  const [error_for_name, setError_for_name] = useState(false)
  const [errorText_for_name, setErrorText_for_name] = useState()

  const [error_for_unit, setError_for_unit] = useState(false)
  const [errorText_for_unit, setErrorText_for_unit] = useState()

  const [lbsId_for_Mahal, setLbsId_for_Mahal] = useState("");

  const RealmApp = useApp();
  const queryClient = useQueryClient()

  let isError = false

  // mahal oluşturma fonksiyonu
  async function handleSubmit(event) {

    event.preventDefault();

    try {
      isError = false

      //verileri tanımlama
      const data = new FormData(event.currentTarget);
      const newMahalName = deleteLastSpace(data.get('newMahalName'))
      const newMahalUnit = deleteLastSpace(data.get('newMahalUnit'))


      // // useContext de proje ve _id si yoksa mahal oluşturma formunu göstermenin bir anlamı yok, hata vererek durduruyoruz
      // if (!isProject?._id) {
      //   throw new Error("Mahal oluşturulacak projenin database kaydı için ProjeId belirtilmemiş, sayfayı yeniden yükleyin, sorun devam ederse Rapor7/24 ile irtibata geçiniz.")
      // } else {
      //   console.log("isProject?._id", isProject?._id)
      // }


      // // bu kısımda frontend kısmında form validation hatalarını ilgili alanlarda gösterme işlemleri yapılır
      // if (!lbsId_for_Mahal) {
      //   setError_for_lbs(true);
      //   setErrorText_for_lbs("Zorunlu")
      //   isError = true
      //   console.log("lbsId_for_Mahal", "yok -- error")
      // } else {
      //   console.log("lbsId_for_Mahal", lbsId_for_Mahal)
      // }

      // if (!newMahalName) {
      //   setError_for_name(true);
      //   setErrorText_for_name("Zorunlu")
      //   isError = true
      //   console.log("newMahalName", "yok -- error")
      // }

      // if (newMahalName.length > 0 && newMahalName.length < 3) {
      //   setError_for_name(true)
      //   setErrorText_for_name("3 haneden az")
      //   isError = true
      //   console.log("newMahalName", "3 haneden az -- error")
      // }

      // if (!newMahalUnit) {
      //   setError_for_unit(true);
      //   setErrorText_for_unit("Zorunlu")
      //   isError = true
      //   console.log("newMahalUnit", "yok -- error")
      // } else {
      //   console.log("newMahalUnit", newMahalUnit)
      // }

      // // ilgili hatalar yukarıda ilgili form alanlarına yazılmış olmalı
      // // db ye sorgu yapılıp db meşgul edilmesin diye burada durduruyoruz
      // // frontendden geçse bile db den errorFormObject kontrolü yapılıyor aşağıda
      // if (isError) {
      //   console.log("return (fonksiyon durdurma) satırı bu mesaj satırının altında idi")
      //   // throw new Error("db ye gönderilmek istenen verilerde hata var")
      //   return
      // }

      const newMahal = {
        projectId: isProject._id,
        lbsId: lbsId_for_Mahal,
        newMahalName,
        newMahalUnit
      }

      const result = await RealmApp?.currentUser?.callFunction("createMahal", newMahal);


      // eğer gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (result.errorFormObj) {

        const errorFormObj = result.errorFormObj

        console.log("errorFormObj", errorFormObj)

        if (errorFormObj.lbsId) {
          setError_for_lbs(true);
          setErrorText_for_lbs(errorFormObj.lbsId)
          isError = true
        }

        if (errorFormObj.newMahalName) {
          setError_for_name(true);
          setErrorText_for_name(errorFormObj.newMahalName)
          isError = true
        }

        if (errorFormObj.newMahalUnit) {
          setError_for_unit(true);
          setErrorText_for_unit(errorFormObj.newMahalUnit)
          isError = true
        }

        return
      }

      if (!result.newMahal?._id) {
        throw new Error("db den -newMahal- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      if (!result.newProject?._id) {
        throw new Error("db den -newProject- ve onun da -_id-  property dönmedi, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz..")
      }

      // refetch_mahaller()
      // yukarıdaki yapılan _id kontrolü tamamsa bu veri db de kaydolmuş demektir, refetch_mahaller() yapıp db yi yormaya gerek yok
      // useQuery ile oluşturduğumuz mahaller cash datamızı güncelliyoruz
      const oldMahaller = queryClient.getQueryData(["mahaller"])
      const newMahaller = ([...oldMahaller, result.newMahal])
      queryClient.setQueryData(["mahaller"], newMahaller)

      const newProject = result.newProject
      setIsProject(newProject)

      setShow("MahalMain")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.message ? err.message : "Beklenmedik hata, Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki mahal ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setError_for_name(true);
        setErrorText_for_name("Bu mahal ismi bu projede mevcut")
        console.log("Bu mahal ismi bu projede mevcut")
        return
      }

      setDialogCase("error")
      setShowDialog(hataMesaj_)

    }

  }


  const handleChange_newLbsName = (event) => {
    setLbsId_for_Mahal(event.target.value);
  };


  // aşağıda kullanılıyor
  let lbsCode
  let lbsName
  let cOunt

  return (
    <div>

      {showDialog &&
        <DialogWindow dialogCase={dialogCase} showDialog={showDialog} setShowDialog={setShowDialog} />
      }

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("MahalMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", marginBottom: "2.5rem" }}>
              {/* <Typography sx> */}
              Mahal Oluştur
              {/* </Typography> */}
            </DialogContentText>


            {/* lbs adı seçme - çoktan seçmeli - mahal başlığı için*/}
            <Box onClick={() => setError_for_lbs(false)} sx={{ minWidth: 120, marginBottom: "1.5rem" }}>

              <InputLabel
                error={error_for_lbs}
                id="select-lbs-label"
              >
                <Grid container justifyContent="space-between">

                  <Grid item>Başlık seçiniz</Grid>

                  <Grid item onClick={() => console.log("mahal create component lbs tıklandı")} >
                    lbs
                    <ArrowForwardIcon sx={{ fontSize: 15, verticalAlign: "middle" }} />
                  </Grid>

                </Grid>

              </InputLabel>

              <Select
                error={error_for_lbs}
                variant="standard"
                fullWidth
                labelId="select-lbs-label"
                id="select-lbs"
                value={lbsId_for_Mahal}
                // label="Mahal için başlık seçiniz"
                // label="Mahal"
                onChange={handleChange_newLbsName}
                required
              >
                {
                  isProject?.lbs.filter(item => item.openForMahal).map(lbsOne => (
                    // console.log(lbs)
                    <MenuItem key={lbsOne._id} value={lbsOne._id}>

                      {
                        lbsOne.code.split(".").map((codePart, index) => {

                          // console.log(cOunt)
                          // console.log(index + 1)
                          // console.log("---")

                          let cOunt = lbsOne.code.split(".").length

                          // console.log(cOunt)
                          // console.log(index + 1)
                          // console.log("---")

                          if  (index == 0 && cOunt == 1) {
                            lbsCode = codePart
                            lbsName = isProject.lbs.find(item => item.code == lbsCode).name
                          }
    
                          if (index == 0 && cOunt !== 1) {
                            lbsCode = codePart
                            lbsName = isProject.lbs.find(item => item.code == lbsCode).codeName
                          }  
    
                          if (index !== 0 && index + 1 !== cOunt && cOunt !== 1) {
                            lbsCode = lbsCode + "." + codePart
                            lbsName = lbsName + " > " + isProject.lbs.find(item => item.code == lbsCode).codeName
                          }
    
                          if (index !== 0 && index + 1 == cOunt && cOunt !== 1) {
                            lbsCode = lbsCode + "." + codePart
                            lbsName = lbsName + " > " + isProject.lbs.find(item => item.code == lbsCode).name
                          }

                        })
                      }

                      {lbsName.split(">").map((item, index) => (

                        <Box key={index} component={"span"} >
                          {item}
                          {index + 1 !== lbsName.split(">").length &&
                            <Box component={"span"} ml={0.1} mr={0.3}>{"--"}</Box>
                          }
                        </Box>

                      ))}

                    </MenuItem>
                  ))
                }

              </Select>

            </Box>

            {/* mahal isminin yazıldığı alan */}
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
                id="newMahalName"
                name="newMahalName"
                // autoFocus
                error={error_for_name}
                helperText={error_for_name ? errorText_for_name : null}
                // margin="dense"
                label="Mahal Adi"
                type="text"
                fullWidth
              />
            </Box>


            {/* mahal biriminin yazıldığı alan */}
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
                id="newMahalUnit"
                name="newMahalUnit"
                // autoFocus
                error={error_for_unit}
                helperText={error_for_unit ? errorText_for_unit : null}
                // margin="dense"
                label="Mahal Birim"
                type="text"
                fullWidth
              />
            </Box>

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("MahalMain")}>İptal</Button>
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
