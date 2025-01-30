type QueryParams = Record<string, string | number>;

class MoviesApi {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  }

  private buildQueryString(params: QueryParams): string {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return query ? `?${query}` : "";
  }

  async movie(endpoint: string, queryParams: QueryParams = {}): Promise<any> {
    const url = `${this.baseUrl}/movie/${endpoint}${this.buildQueryString(queryParams)}`;
    const response = await fetch(url, { method: "GET", headers: this.headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  }

  async search(query: string, queryParams: QueryParams = {}): Promise<any> {
    const url = `${this.baseUrl}/search/movie${this.buildQueryString({
      query,
      ...queryParams,
    })}`;
    const response = await fetch(url, { method: "GET", headers: this.headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  }

  async getMovieDetails(id: number): Promise<any> {
    return await this.movie(`${id}`);
  }
}

const moviesApi = new MoviesApi(
  "https://api.themoviedb.org/3",
  import.meta.env.VITE_TMDB_API_TOKEN as string
);

export default moviesApi;
