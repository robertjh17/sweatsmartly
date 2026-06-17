// theme.ts
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: {
        height: '100%',
        overflow: 'hidden',
      },
      body: {
        height: '100%',
        overflow: 'hidden',
      },
      '#__next': {
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
});

export default theme;
