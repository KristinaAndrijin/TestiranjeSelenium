export interface RegistrationDTO{
    email:string;
    password:string;
    repeatPassword:string;
    firstName:string;
    lastName:string;
    address: string;
    phoneNumber: string;
    role: string;
  }

export interface RegisterResponseDTO{
  id: number,
  name:string,
  surname:string,
  email:string
}