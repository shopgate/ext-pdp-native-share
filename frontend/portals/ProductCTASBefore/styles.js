import { makeStyles } from '@shopgate/engage/styles';
import config from '../../config.json';

const { iOSIconStyles } = config;

const useStyles = makeStyles()(() => ({
  iOSButtons: {
    position: 'absolute',
    right: 62,
    top: -20,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...(iOSIconStyles || {}),
  },
}));

export default useStyles;
