export interface IEvent {
  id: number;
  title: string;
  sourceLink: string;
  sourceId: number;
  lastInsertedAt: Date | string;
  lastUpdatedAt: Date | string;
  source: Source;
  // event_to_category: EventToCategory[];
  description?: string | null;
  shortDescription?: string | null;
  location?: string | null;
  address?: string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  price?: string | null;
  imageLink?: string | null;
  organizer?: string | null;
}

type Source = {
  id: number;
  title: string;
  link: string;
  type: string;
  events: Event[];
  lastInsertedAt: Date | string;
  lastUpdatedAt: Date | string;
};

type EventToCategory = {
  event_id: number;
  category_id: number;
  events: Event;
  categories: Category;
};

type Category = {
  id: number;
  title: string;
  lastInsertedAt: Date | string;
  lastUpdatedAt: Date | string;
  event_to_category: EventToCategory[];
};

export interface IEventCard {
  id: number;
  slug: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  imageLink?: string;
  price?: string;
  categories?: string[];
  recommendations?: IEventCard[];
}
