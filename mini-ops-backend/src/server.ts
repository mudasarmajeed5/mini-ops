import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.ts";
const app = express();
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.send("System is up and running!");
});
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

export default app;
export { app };
