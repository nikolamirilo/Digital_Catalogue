export type Record = {
    name: string;
    description: String;
    price: number;
    image?:string
};

export type NavbarProps = {
  type?: string;
  restaurant?: string
  restaurantData?:any;
}