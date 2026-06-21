import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return response.data.results;
}