import { MovieHistoryDetails } from "@/types";

type QueryParams = Record<string, string | number>;

class ServerApi {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  }

  private buildQueryString(params: QueryParams): string {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return query ? `?${query}` : "";
  }

  // GET all movies
  async getMovies(queryParams: QueryParams = {}): Promise<any> {
    const url = `${this.baseUrl}/movies${this.buildQueryString(queryParams)}`;
    const response = await fetch(url, { method: "GET", headers: this.headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    return response.json();
  }

  // GET a single movie by ID
  async getMovieById(id: number): Promise<any> {
    const url = `${this.baseUrl}/movies/${id}`;
    const response = await fetch(url, { method: "GET", headers: this.headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }

    return response.json();
  }

  // POST a new movie
  async addMovie(movie: Record<string, any>): Promise<any> {
    console.log(movie);
    const url = `${this.baseUrl}/movies`;
    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error(`Failed to add movie: ${response.statusText}`);
    }

    return response.json();
  }

  // PUT (update) a movie by ID
  async updateMovie(id: number, movie: Record<string, any>): Promise<any> {
    const url = `${this.baseUrl}/movies/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error(`Failed to update movie: ${response.statusText}`);
    }

    return response.json();
  }

  async setNewScore(movieId: number, score: number): Promise<any> {
    const url = `${this.baseUrl}/movies/${movieId}/score`; // New endpoint for setting score
    const response = await fetch(url, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ score }), // Send only the score in the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to update score: ${response.statusText}`);
    }

    return response.json();
  }

  // DELETE a movie by ID
  async deleteMovie(id: number): Promise<any> {
    const url = `${this.baseUrl}/movies/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie: ${response.statusText}`);
    }

    return response.json();
  }

  // Check if a movie is in the list
  async getMovieHistoryDetail(movieId: number): Promise<MovieHistoryDetails> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/check-movie-history-detail?movieId=${movieId}`,
        { headers: this.headers }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("error", err);
      throw new Error("Failed to check movie in list");
    }
  }

  //
}

const serverApi = new ServerApi(
  "http://localhost:3000",
  import.meta.env.VITE_SERVER_API_KEY as string
);

export default serverApi;
