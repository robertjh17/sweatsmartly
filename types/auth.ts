// types/auth.ts

export interface RegisterFormProps {
    role: "sporter" | "trainer";
  }
  
  
  export type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
  };
 
  