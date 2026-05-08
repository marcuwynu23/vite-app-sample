export type RootFetch =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "ok"; statusCode: number; body: string}
  | {status: "error"; message: string};
