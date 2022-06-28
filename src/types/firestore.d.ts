type Movie = {
  category: string[];
  configuration: {
    src: string;
  },
  createdAt: Date;
  updatedAt: Date;
  dlNumber: number;
  movie: {
    src: string;
  },
  platform: string[];
  raito: string;
  remarks: number;
  scale: string;
  thumbnail: string;
  title: string;
}
type MovieItem = Movie &{
  id: string
}

type Attribute = {
  categories: string[];
  platforms: string[];
  raitos: string[];
  scales: string[];
}

type AttributeQuery = {
  categories?: string[];
  platforms?: string[];
  raitos?: string[];
  scales?: string[];
}