interface CoworkingItem {
  _id: string,
  name: string,
  address: string,
  telephone: string,
  open_close_time: string,
  averageRating: string,
  picture: string
}

interface CoworkingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CoworkingItem[]
}

interface ReservationItem {
  _id: string;
  name: string;
  telephone: string;
  coworking: string;
  resvTime: string;
}

interface ReservationJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CoworkingItem[]
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface Review {
  rating: number,
  comment: string,
  user: string,
  coworking: string,
  _id: string
}