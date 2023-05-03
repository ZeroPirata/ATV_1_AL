import { Router } from "express";
import teams from "./team";
import matchs from "./match";

const rotas = Router();

rotas.use("/team", teams);
rotas.use("/match", matchs);

export default rotas;
