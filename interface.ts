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
  name: string;
  telephone: string;
  coworking: string;
  resvTime: Date;
}