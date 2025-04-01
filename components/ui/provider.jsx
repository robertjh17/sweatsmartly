'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes';
import theme from '../../app/theme';


export function Provider({ children }) {
  return (
      <ChakraProvider theme={theme}>
        <ThemeProvider attribute="class" defaultTheme="light"> 
          {children}
        </ThemeProvider>  
      </ChakraProvider>
  )
}
