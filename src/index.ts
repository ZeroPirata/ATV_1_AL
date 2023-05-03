import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import rotas from "./routes";

dotenv.config();
const app = express();
app.listen(process.env.PORT || 3000, () =>
  console.log(`Rodando na porta ${process.env.PORT}`)
);
app.use(express.json());
app.use(cors<express.Request>());
app.use(rotas);
