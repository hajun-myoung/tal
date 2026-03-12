export type Artist = {
  id: string;
  name: string;
  genre: string;
  city: string;
  source: string;
  note?: string;
};

export type Performance = {
  id: string;
  title: string;
  artist: string;
  venue: string;
  source: string;
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  source: string;
};
