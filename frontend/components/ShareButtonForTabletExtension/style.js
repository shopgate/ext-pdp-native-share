import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const button = css({
  marginTop: 10,
  display: 'block',
  flexGrow: 1,
  border: `1px solid ${colors.accent}`,
  color: colors.accent,
  fontSize: 16,
  fontWeight: 700,
  borderRadius: 5,
  width: '100%',
  outline: 0,
  transition: 'width 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  padding: `${(variables.gap.big * 0.75) - 1}px ${variables.gap.big * 0.6}px ${(variables.gap.big * 0.75) + 1}px`,
  '@media only screen and (min-width: 786px)': {
    marginLeft: 8,
  },
  '@media only screen and (max-width: 786px)': {
    marginLeft: 0,
  },
});

const disabled = css(button, {
  background: colors.shade5,
});

const icon = css({
  display: 'inline',
  marginBottom: -2,
  marginRight: 5,
});

export default {
  button,
  disabled,
  icon,
};
