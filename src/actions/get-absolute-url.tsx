import { IncomingMessage } from "http";

export const getAbsoluteUrl = (req: IncomingMessage) => {
  // httpsが無ければhttpになります
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["host"];
  const path = req.url;

  return `${protocol}://${host}${path}`;
};
