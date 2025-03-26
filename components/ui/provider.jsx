'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Provider({ children }) {
  return (
      <ChakraProvider>{children}</ChakraProvider>
  )
}
