export interface SimplifiedContact {
  firstName: string;
  lastName: string;
  ssn: number;
}

export interface Contact extends SimplifiedContact{
  phone: string;
  email: string;
  address: string;
  description: string;
}
