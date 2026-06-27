import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.ts";
import serviceRoutes from "./routes/serviceRoutes.ts";
import cookieParser from "cookie-parser"
const app = express();
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" , credentials: true}));
app.use(morgan("dev"));
app.use(cookieParser());
app.get("/health", (_req, res) => {
  res.send("System is up and running!");
});
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use('/api/services', serviceRoutes);

export default app;
export { app };
