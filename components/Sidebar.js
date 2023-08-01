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
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Başlık
            //   </ListSubheader>
            // }
          >

            <ListItemButton onClick={() => router.push('/projects')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Projeler" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/persons')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Kişiler" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/companies')}>
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

            <ListItemButton onClick={() => router.push('/dashboard')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/wbs')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Poz Başlıkları" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/pozlar')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Pozlar" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/lbs')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Mahal Grupları" />
            </ListItemButton>

            <ListItemButton onClick={() => router.push('/mahaller')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Mahaller" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Yetkiler" />
            </ListItemButton>

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