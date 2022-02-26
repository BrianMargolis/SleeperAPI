export interface Cache {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

