export interface KvClient {
  isConfigured: boolean;
  get: <T = unknown>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown, exSeconds?: number) => Promise<boolean>;
  incr: (key: string) => Promise<number>;
}

class UpstashKvClient implements KvClient {
  public get isConfigured(): boolean {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    return !!(url && token && url.startsWith("http"));
  }

  private getHeaders(): Record<string, string> {
    const token = process.env.KV_REST_API_TOKEN || "";
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  public async get<T = unknown>(key: string): Promise<T | null> {
    if (!this.isConfigured) return null;

    try {
      const url = `${process.env.KV_REST_API_URL}/get/${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        headers: this.getHeaders(),
        cache: "no-store",
      });

      if (!res.ok) return null;
      const data = await res.json();
      if (!data || data.result === null || data.result === undefined) return null;

      try {
        return typeof data.result === "string" ? JSON.parse(data.result) : (data.result as T);
      } catch {
        return data.result as T;
      }
    } catch {
      return null;
    }
  }

  public async set(key: string, value: unknown, exSeconds?: number): Promise<boolean> {
    if (!this.isConfigured) return false;

    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      let url = `${process.env.KV_REST_API_URL}/set/${encodeURIComponent(key)}`;
      if (exSeconds && exSeconds > 0) {
        url += `?EX=${exSeconds}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ value: serialized }),
        cache: "no-store",
      });

      return res.ok;
    } catch {
      return false;
    }
  }

  public async incr(key: string): Promise<number> {
    if (!this.isConfigured) return 1;

    try {
      const url = `${process.env.KV_REST_API_URL}/incr/${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        cache: "no-store",
      });

      if (!res.ok) return 1;
      const data = await res.json();
      return typeof data.result === "number" ? data.result : 1;
    } catch {
      return 1;
    }
  }
}

export const kv = new UpstashKvClient();
