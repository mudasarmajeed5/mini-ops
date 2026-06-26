import app from "./server.ts";
import env from "../env.ts";

app.listen(env.PORT, () => {
  console.log("App running on http://localhost:" + env.PORT);
});
