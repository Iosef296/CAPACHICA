import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import familiasRouter from "./routes/familias";
import reservasRouter from "./routes/reservas";
import artesaniasRouter from "./routes/artesanias";
import authRouter from "./routes/auth";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir herramientas sin origen (curl, Postman) y cualquier localhost en desarrollo
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      const allowed = (process.env.CORS_ORIGIN || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("Origen no permitido por CORS"));
    },
  }),
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok", time: new Date() }));
app.use("/api/auth", authRouter);
app.use("/api/familias", familiasRouter);
app.use("/api/reservas", reservasRouter);
app.use("/api/artesanias", artesaniasRouter);

app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
