import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sentry as early as possible (this file is imported first in index.js).
// If SENTRY_DSN is not set, the SDK stays disabled and all calls become no-ops.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
  });
}

export default Sentry;
