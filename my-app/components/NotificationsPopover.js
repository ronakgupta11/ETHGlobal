
import { noCase } from 'change-case';

import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";
// @mui
import {
  Box,
  List,
  Badge,
  Button,

  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

import Iconify from './iconify';
import Scrollbar from './scrollbar';






const NOTIFICATIONS =[
  {
    id:0,
    image:"https://gateway.pinata.cloud/ipfs/QmQdoK32YjZ4hX7d94BaqwmLZVqa4PqWb9sHsTdUxoEdbE?_gl=1*1e8bkek*_ga*NDkwMmRkZjktOTdhNC00OTc4LWJmN2MtOWE3NDA4YWEwZjJk*_ga_5RMPXG14TE*MTY3OTg0MDU0NS4xMy4wLjE2Nzk4NDA1NDguNTcuMC4w",
    title:"New Course Update",
    message:"Data structure",
  }
]


export default function NotificationsPopover() {

  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const { address, isConnecting, isDisconnected } = useAccount()

  // const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const totalUnRead = 1;

  const [open, setOpen] = useState(null);




  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await PushAPI.user.getFeeds({
        user: `eip155:80001:${address}`, // user address in CAIP
        env: 'staging',
        

      });

    
      // setNotifications(res);
      console.log(res);

    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchNotifications();
      
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [notifications]);
  return (
    <>
      <IconButton color='inherit' onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------



function NotificationItem({ notification }) {
  const {title } = renderContent(notification);

  return (
    <ListItemButton className='flex items-center'
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      {/* <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar> */}
      <img className='w-16 mr-4' src={notification.image}></img>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {/* <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.message)}
      </Typography>
    </Typography>
  );

    return{
      title
    }
}
