


import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ErrorIcon from '@mui/icons-material/Error';



// switch (expression) {
//   case x:
//     // code block
//     break;
//   case y:
//     // code block
//     break;
//   default:
//   // code block
// }




export const Dialog = (situation, message, setShowDialog) => {

  if (typeof message !== "string") {
    hataMesaj = "Beklenmedik hata, sayfayı yenileyiniz, sorun devam ederse Rapor7/24 ile irtibata geçiniz.."
  } else {
    hataMesaj = message
  }


  return (
    <div>

      <Dialog
        PaperProps={{ sx: { position: "fixed", top: "10rem", margin: { xs: '2rem' } } }}
        open={true}
        onClose={() => setShowDialog(false)} >
        {/* <DialogTitle>Subscribe</DialogTitle> */}

        <DialogContent>

          <Grid container spacing={1}>

            <Grid item>
              <ErrorIcon variant="contained" color="error" pr={3} />
            </Grid>

            <Grid item>
              <DialogContentText>
                {message}
              </DialogContentText>
            </Grid>

          </Grid>

        </DialogContent>

      </Dialog>

    </div >
  );

}


