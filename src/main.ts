import { app } from "./app.js";

const port = process.env.PORT || 8000;

(async () => {
  app.listen(port, () => {
    console.log("app listening on " + port);
  });
})();
