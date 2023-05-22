import { useState } from 'react';
import { useRouter } from 'next/router';

//material
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';



export default function Sidebar_B() {

  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [project, setProject] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <Grid container >

      <Grid item>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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

        </List>
      </Grid>


      {project &&
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