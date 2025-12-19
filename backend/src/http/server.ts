import { app } from "./app";

const BACKEND_PORT = 3000;

app.listen(BACKEND_PORT, () => {
  console.log(`App is running on port ${BACKEND_PORT}`);
});
