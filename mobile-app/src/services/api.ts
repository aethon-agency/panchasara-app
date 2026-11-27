// src/api/api.ts
import { router } from "expo-router";
import { Toast } from "../contexts/ToastProvider";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiClientConfig {
  baseURL?: string;
  getToken?: () => string | null | undefined;
}

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined>;
}

interface ApiError extends Error {
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private getToken?: () => string | null | undefined;

  constructor({ baseURL = "", getToken }: ApiClientConfig = {}) {
    this.baseURL = baseURL;
    this.getToken = getToken;
  }

  public setTokenGetter(fn: () => string | null | undefined) {
    this.getToken = fn;
  }

  private onUnauthorized?: () => void;
  public setUnauthorizedHandler(fn: () => void) {
    this.onUnauthorized = fn;
  }

  private buildUrl(url: string, params?: RequestOptions["params"]): string {
    if (!params) return `${this.baseURL}${url}`;

    const query = new URLSearchParams(
      Object.entries(params).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          if (value !== undefined) acc[key] = String(value);
          return acc;
        },
        {},
      ),
    ).toString();

    return `${this.baseURL}${url}?${query}`;
  }

  private async request<TResponse, TBody = unknown>(
    url: string,
    options: RequestOptions<TBody> = {},
  ): Promise<TResponse> {
    const { method = "GET", body, headers = {}, params } = options;

    const token = this.getToken?.();

    const response = await fetch(this.buildUrl(url, params), {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Read as text first so non-JSON replies (e.g. "Not found" from a wrong
    // base URL, or an HTML error page) give a clear error instead of a
    // JSON parse crash.
    const raw = await response.text();
    let data: any = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        const error: ApiError = new Error(
          `Unexpected response from server (${response.status}) at ${this.buildUrl(url, params)}: ${raw.slice(0, 100)}`,
        );
        error.status = response.status;
        throw error;
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        this.onUnauthorized?.();
        Toast.error("Session expired. Please relogin");
        router.replace("/login");
      }
      const error: ApiError = new Error(
        data?.message || data?.error || "API request failed",
      );
      error.status = response.status;
      throw error;
    }

    return data as TResponse;
  }

  get<TResponse>(
    url: string,
    params?: RequestOptions["params"],
    body?: any,
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { method: "GET", params, body });
  }

  post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(url, {
      method: "POST",
      body,
    });
  }

  put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(url, {
      method: "PUT",
      body,
    });
  }

  patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(url, {
      method: "PATCH",
      body,
    });
  }

  delete<TResponse>(url: string): Promise<TResponse> {
    return this.request<TResponse>(url, { method: "DELETE" });
  }
}

if (!process.env.EXPO_PUBLIC_API_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL is not set. Add it to mobile-app/.env and restart Expo with --clear.",
  );
}

// ✅ Singleton instance
const api = new ApiClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL as string,
});

// Optional safety - removed because it prevents runtime registration of handlers
// Object.freeze(api);

export default api;
