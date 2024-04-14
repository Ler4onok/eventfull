// todo: edit
export interface Event {
  title: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  location: string;
  categories: string;
  address: string;
  description: string;
  sourceLink: string;
  sourceId: number;
  imageLink: string;
  organizer: string;
  price: string;
  created_at: number;
}

export interface IEventCard {
  id: number;
  title: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  imageLink?: string;
  price?: string;
  categories?: string[];
  recommendations?: IEventCard[];
}
