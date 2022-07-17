interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export { User, UserResponse, Artist, Track, Album, Favorites };
