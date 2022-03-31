export interface UserDto {
  message: string;
  users: User[];
  user?: User;
}

export interface User {
  isAdmin: boolean;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  street: string;
  zip: string;
  apartment: string;
  id?: string;
  password:string
}

export interface loginDto {
  message: string;
  token:string

}