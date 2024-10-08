// navbar
export interface NavbarLinks {
  id?: number | null;
  icon?: string | null;
  name: string;
  route: string | null;
}


// userInfo
export interface UserInfo {
  id?: number | null;
  photo: string;
  full_name: string;
}
