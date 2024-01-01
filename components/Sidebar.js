import { useState, useContext, useEffect } from 'react';
import { StoreContext } from './store'
import { useRouter } from 'next/router';
import { useApp } from "./useApp";

//material
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';


export default function Sidebar({ setMobileOpen }) {


  const router = useRouter();
  const { isProject } = useContext(StoreContext)
  const { persons } = useContext(StoreContext)

  return (
    <Grid container direction="column">

      {/* <Grid item sx={{ backgroundColor: "aquamarine" }}>
        <Typography >
          {header}
        </Typography>
      </Grid> */}


      {/* hiçbirşey seçilmemişken - sidebar menüsü görünümü*/}
      {!isProject && !persons &&
        <Grid item onClick={(() => setMobileOpen(false))}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >

            <ListItemButton
              onClick={(() => router.push('/projects'))}
              sx={{ backgroundColor: router?.asPath == "/projects" ? "#f0f0f1" : null }}
            >
              <ListItemIcon  >
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Projeler" />
            </ListItemButton>



            <ListItemButton
              onClick={() => router.push('/people')}
              sx={{ backgroundColor: router?.asPath == "/people" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Kişiler" />
            </ListItemButton>



            <ListItemButton
              onClick={() => router.push('/companies')}
              sx={{ backgroundColor: router?.asPath == "/companies" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Firmalar" />
            </ListItemButton>


          </List>
        </Grid>
      }



      {/* poz seçiminde - sidebar menüsü görünümü*/}
      {isProject &&
        <Grid item onClick={(() => setMobileOpen(false))}>
          <List>

            <ListItemButton
              onClick={() => router.push('/dashboard')}
              sx={{ backgroundColor: router?.asPath == "/dashboard" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/wbs')}
              sx={{ backgroundColor: router?.asPath == "/wbs" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Poz Başlıkları" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/pozlar')}
              sx={{ backgroundColor: router?.asPath == "/pozlar" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Pozlar" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/lbs')}
              sx={{ backgroundColor: router?.asPath == "/lbs" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Mahal Başlıkları" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/mahaller')}
              sx={{ backgroundColor: router?.asPath == "/mahaller" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Mahaller" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/mahallistesi')}
              sx={{ backgroundColor: router?.asPath == "/mahallistesi" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Mahal Listesi" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/metrajlar')}
              sx={{ backgroundColor: router?.asPath == "/metrajlar" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Metrajlar" />
            </ListItemButton>


            <ListItemButton
              onClick={() => router.push('/raporlar')}
              sx={{ backgroundColor: router?.asPath == "/raporlar" ? "#f0f0f1" : null }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Raporlar" />
            </ListItemButton>

            {/* <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Yetkiler" />
            </ListItemButton> */}

            {/* <ListItemButton onClick={() => router.push('/records')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Duyuru" />
            </ListItemButton> */}

            {/* <ListItemButton onClick={() => router.push('/mongo')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Mongo" />
            </ListItemButton> */}

            {/* <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse> */}

          </List>
        </Grid>
      }
    </Grid>
  );
}