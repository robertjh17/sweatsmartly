export const creditPackages = {
    starter: { credits: 10, price: '9.99' },
    pro: { credits: 25, price: '19.99' },
    ultimate: { credits: 60, price: '39.99' },
  } as const
  
  export type CreditPackageId = keyof typeof creditPackages
  