// AWS Lambda entry point. Wraps the same Express app used locally, but without
// calling app.listen() — API Gateway invokes this handler per request.
import "dotenv/config";
import serverless from "serverless-http";
import app from "./app.js";

export const handler = serverless(app);
