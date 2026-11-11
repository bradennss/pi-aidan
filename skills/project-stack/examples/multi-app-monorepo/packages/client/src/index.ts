export interface Note {
  id: number;
  body: string;
}

export class NotesClient {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
  ) {}

  async create(body: string): Promise<Note> {
    return this.request("/notes", {
      method: "POST",
      body: JSON.stringify({ body }),
    });
  }

  async get(id: number): Promise<Note> {
    return this.request(`/notes/${String(id)}`, { method: "GET" });
  }

  private async request(path: string, options: RequestInit): Promise<Note> {
    const response = await fetch(new URL(path, this.baseUrl), {
      ...options,
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });
    if (!response.ok) {
      throw new Error(`Notes API returned HTTP ${String(response.status)}`);
    }
    return response.json() as Promise<Note>;
  }
}
