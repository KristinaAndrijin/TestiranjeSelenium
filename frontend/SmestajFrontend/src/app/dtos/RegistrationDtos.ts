export interface RegistrationDTO{
    email:string;
    password:string;
    name:string;
    surname:string;
    address: string;
    phone: string;
  }
export interface RegisterResponseDTO{
  id: number,
  name:string,
  surname:string,
  email:string
}