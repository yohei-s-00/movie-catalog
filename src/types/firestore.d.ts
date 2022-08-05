type Movie = {
  category: string[];
  configuration: Configuration[];
  createdAt: Date;
  updatedAt: Date;
  dlNumber: number;
  movie: string;
  platform: string[];
  raito: string;
  materials: number;
  remarks: string;
  scale: string;
  thumbnail: string;
  title: string;
};
type MovieItem = Movie & {
  id: string;
};

type UpdateMovie = Partial<Movie>


type Configuration = {
  scene: number;
  time: number;
  preview: string;
  detail: string;
  textAreas: {
    text: string;
    count: number;
  }[];
};

type Attribute = {
  categories: string[];
  platforms: string[];
  raitos: string[];
  scales: string[];
};

type AttributeQuery = {
  categories?: string[];
  platforms?: string[];
  raitos?: string[];
  scales?: string[];
};
