import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { checkDBConnected } from "./database/index.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  checkDBConnected();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
