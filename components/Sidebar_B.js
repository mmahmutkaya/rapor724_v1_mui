import { useState, useContext } from 'react';
import { StoreContext } from '../components/store'
import { useRouter } from 'next/router';

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


export default function Sidebar_B({ setMobileOpen, RealmApp }) {

  const { isProject } = useContext(StoreContext)

  const router = useRouter();
  const [open, setOpen] = useState(true);


  const handleProject = () => {
    setMobileOpen(false)
    router.push('/projects')
  };


  return (
    <Grid container >

      <Grid item sx={{ backgroundColor: "aquamarine" }}>
        <Typography >
          {RealmApp?.currentUser?.profile.email}
        </Typography>
      </Grid>


      <Grid item>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Başlık
        //   </ListSubheader>
        // }
        >

          <ListItemButton onClick={handleProject}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Projeler" />
          </ListItemButton>

        </List>
      </Grid>


      {isProject &&
        <Grid item>
          <List>

            <ListItemButton onClick={() => router.push('/wbs')}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="İş Alanları / WBS" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
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