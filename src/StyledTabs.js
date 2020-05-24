/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'var(--accent-color)',
    },
  },
})((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} centered />
));

export const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    borderRadius: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    minWidth: '60px',
    maxWidth: '50%',
    minHeight: '48px',
    boxSizing: 'border-box',
    '&:focus': {
      opacity: 1,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& > .MuiSvgIcon-root': { marginRight: '8px' },
  },
  selected: {
    backgroundColor: 'var(--accent-bg)',
    color: 'var(--font-color)',
  },
}))((props) => (
  <Tab disableRipple {...props} textColor="primary" variant="fullWidth" />
));
