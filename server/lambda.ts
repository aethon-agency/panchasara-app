// AWS Lambda entry point. Wraps the same Express app used locally, but without
// calling app.listen() — API Gateway invokes this handler per request.
import "dotenv/config";
import serverless from "serverless-http";
import app from "./app.js";

const expressHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Scheduled warm-up invocation (EventBridge): the module is already loaded
  // and the Supabase client initialized, so just return and keep the
  // execution environment warm — no Express/DB work needed.
  if (event?.warmup) {
    return { statusCode: 200, body: "warm" };
  }
  return expressHandler(event, context);
};
