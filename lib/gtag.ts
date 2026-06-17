// lib/gtag.ts

type GTagFunction = (
    command: 'config' | 'event' | 'js',
    targetIdOrEventName: string | Date,
    config?: Record<string, unknown>
  ) => void
  
  declare global {
    interface Window {
      gtag: GTagFunction
    }
  }
  
  export const pageview = (url: string) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
      page_path: url,
    })
  }
  
  export const logEvent = (action: string, params: Record<string, unknown>) => {
    window.gtag('event', action, params)
  }
  