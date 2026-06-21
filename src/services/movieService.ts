import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

type TMDBResponse = {
  results: Movie[];
};

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      query,
    },
  });

  return response.data.results;
}