import { Router } from "express";
import match from "../controller/MatchController";
const matchs = Router();

matchs.post("/", match.createMatch);
matchs.get("/", match.getMathcsDays);
matchs.delete("/", match.getMathcsDays);
matchs.get("/:id", match.getById);
matchs.put("/:id", match.updateMatch);

export default matchs;
