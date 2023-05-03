import { Router } from "express";
import team from "../controller/TeamController";

const teams = Router();
teams.post("/cadastro", team.create);
teams.get("/teams", team.getAll);
teams.get("/team/:nome", team.getByName);
teams.put("/team", team.UpdateTeamValues);
teams.delete("/team", team.DeleteTeam);

export default teams;
