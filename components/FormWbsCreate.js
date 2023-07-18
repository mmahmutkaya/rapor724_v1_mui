import { useState } from 'react';
import { useApp } from "./useApp.js";
import deleteLastSpace from '../functions/deleteLastSpace.js';


//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';


export default function P_FormWbsCreate({ setShow, isProject, setIsProject, selectedWbs, setSelectedWbs }) {

  // proje ve _id si yoksa wbs oluşturma formunu göstermenin bir anlamı yok, hata vererek durduruyoruz
  if (!isProject?._id) {
    throw new Error({ error: "Wbs oluşturulacak projenin database kaydı için ProjeId belirtilmemiş, sayfayı yeniden yükleyin, sorun devam ederse Rapor7/24 ile irtibata geçiniz." })
  }

  const [showDialogSuccess, setShowDialogSuccess] = useState(false)
  const [showDialogError, setShowDialogError] = useState(false)

  const [error_for_wbsName, setError_for_wbsName] = useState(false)
  const [errorText_for_wbsName, setErrorText_for_wbsName] = useState()

  const RealmApp = useApp();

  async function handleSubmit(event) {

    event.preventDefault();
    let isError = false

    try {

      const data = new FormData(event.currentTarget);
      const wbsName = deleteLastSpace(data.get('wbsName'))

      // bu kısımda frontend kısmında form validation hatalarını ilgili alanlarda gösterme işlemleri yapılır, aşağıda backend de
      if (!wbsName) {
        setError_for_wbsName(true);
        setErrorText_for_wbsName("Zorunlu")
        isError = true
        console.log("wbsName", "yok -- error")
      }

      // ilgili hatalar yukarıda ilgili form alanlarına yazılmış olmalı
      // db ye sorgu yapılıp db meşgul edilmesin diye burada durduruyoruz
      // frontendden geçse bile db den errorObject kontrolü yapılıyor aşağıda
      if (isError) {
        console.log("return (fonksiyon durdurma) satırı bu mesaj satırının altında idi")
        return
      }



      // yukarıdaki yapılan _id kontrolü tamamsa bu veri db de kaydolmuş demektir, refetch_pozlar() yapıp db yi yormaya gerek yok
      // useQuery ile oluşturduğumuz pozlar cash datamızı güncelliyoruz
      // sorgudan wbs datası güncellenmiş proje dödürüp, gelen data ile aşağıda react useContext deki projeyi update ediyoruz
      const resultProje = await RealmApp.currentUser.callFunction("createWbs", {
        projectId: isProject._id,
        upWbs: selectedWbs?.code ? selectedWbs?.code : "0",
        newWbsName: wbsName
      });


      // eğer gönderilen form verilerinde hata varsa db den gelen form validation mesajları form içindeki ilgili alanlarda gösterilir ve fonksiyon durdurulur
      // yukarıda da frontend kontrolü yapılmıştı
      if (resultProje.errorObj) {

        console.log("errorObj", errorObj)

        // başka form alanları olsaydı onlarınkini de ekleyecektik aşağıdaki returnden önce, onlarda da hata uyarılarını görecektik
        if (result.errorObj.newWbsName) {
          setError_for_wbsName(true);
          setErrorText_for_wbsName(result.errorObj.newWbsName)
          isError = true
        }

        return
      }


      // _id yoksa istediğimiz proje verisi değil demekki, hata ile durduruyoruz
      if (!resultProje._id) {
        throw new Error
      }


      // yukarıdaki yapılan _id kontrolü tamamsa bu veri db de kaydolmuş demektir, refetch_pozlar() yapıp db yi yormaya gerek yok
      // useQuery ile oluşturduğumuz pozlar cash datamızı güncelliyoruz
      setIsProject(resultProje)

      // sorgu işleminden önce seçilen wbs varsa, temizliyoruz, en büyük gerekçe seçilen wbs silinmiş olabilir, onunla işlem db de hata verir
      setSelectedWbs(null)

      setShow("ProjectMain")

      // setShowDialogSuccess("Wbs kaydı başarı ile gerçekleşti")

    } catch (err) {

      console.log(err)
      let hataMesaj_ = err?.error ? err.error : "Beklenmedik hata, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.."

      // eğer çifte kayıt oluyorsa form içindeki poz ismi girilen yere aşağıdaki mesaj gönderilir, fonksiyon durdurulur
      if (hataMesaj_.includes("duplicate key error")) {
        setError_for_wbsName(true);
        setErrorText_for_wbsName("Aynı seviyede, aynı isimde wbs olamaz")
        console.log("Aynı seviyede, aynı isimde wbs olamaz")
        return
      }

      if (hataMesaj_.includes("Silmek istediğiniz  WBS'in alt seviyeleri mevcut")) {
        hataMesaj_ = "Çok kısa"
      }

      if (hataMesaj_.includes("çok kısa")) {
        hataMesaj_ = "Çok kısa"
      }

      setShowDialogError(hataMesaj_)

    }

  }


  if (showDialogError) {

    let hataMesaj

    if (typeof showDialogError !== "string") {
      hataMesaj = "Beklenmedik hata, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.."
    } else {
      hataMesaj = showDialogError
    }


    return (
      <div>

        <Dialog
          PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
          open={true}
          onClose={() => setShow("PozMain")} >
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>

            <Grid container spacing={1}>

              <Grid item>
                <ErrorIcon variant="contained" color="error" pr={3} />
              </Grid>

              <Grid item>
                <DialogContentText>
                  {hataMesaj}
                </DialogContentText>
              </Grid>

            </Grid>

          </DialogContent>

        </Dialog>

      </div >
    );
  }



  if (showDialogSuccess) {

    return (
      <div>

        <Dialog
          PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
          open={true}
          onClose={() => setShow("ProjectMain")} >
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <DialogContent>
              <Grid container spacing={1}>

                <Grid item>
                  <CheckCircleIcon variant="contained" color="success" pr={3} />
                </Grid>

                <Grid item>
                  <DialogContentText>
                    {showDialogSuccess}
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>

          </Box>
        </Dialog>
      </div >
    );
  }


  return (
    <div>

      <Dialog
        PaperProps={{ sx: { width: "80%", position: "fixed", top: "10rem" } }}
        open={true}
        onClose={() => setShow("WbsMain")} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <DialogContent>

            <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
              {/* <Typography sx> */}
              Wbs Oluştur
              {/* </Typography> */}
            </DialogContentText>

            {selectedWbs &&
              <>
                <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
                  {selectedWbs.code} {selectedWbs.name}
                </DialogContentText>
                <Typography >
                  başlığı altına yeni bir Wbs eklemek üzeresiniz.
                </Typography>
              </>
            }

            {!selectedWbs &&
              <DialogContentText sx={{ fontWeight: "bold", paddingBottom: "1rem" }}>
                {/* <Typography > */}
                En üst düzeye yeni bir Wbs eklemek üzeresiniz.
                {/* </Typography> */}
              </DialogContentText>
            }

            <Box onClick={() => setShowDialogError(false)}>
              <TextField
                variant="standard"
                // InputProps={{ sx: { height:"2rem", fontSize: "1.5rem" } }}

                margin="normal"
                id="wbsName"
                name="wbsName"
                // autoFocus
                error={error_for_wbsName}
                helperText={error_for_wbsName ? errorText_for_wbsName : ""}
                // margin="dense"
                label="Wbs Adı"
                type="text"
                fullWidth
              />
            </Box>

          </DialogContent>

          <DialogActions sx={{ padding: "1.5rem" }}>
            <Button onClick={() => setShow("ProjectWbsMain")}>İptal</Button>
            <Button type="submit">Oluştur</Button>
          </DialogActions>

        </Box>
      </Dialog>
    </div >
  );


}