import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Match } from "../models/match";
import { Team } from "../models/teams";
class MatchController {
  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { idHost, idVisitor } = req.body;
    try {
      const host = await AppDataSource.getRepository(Team).findOneBy({
        id: idHost,
      });
      const visitor = await AppDataSource.getRepository(Team).findOneBy({
        id: idVisitor,
      });
      const newMatch = new Match();
      newMatch.host = host;
      newMatch.visitor = visitor;
      const insertValues = await AppDataSource.getRepository(Match).save(
        newMatch
      );
      return res.json(insertValues);
    } catch (error) {
      return res.json(error);
    }
  }
  public async getMathcsDays(req: Request, res: Response): Promise<Response> {
    const { limit, offset } = req.body;
    try {
      const findMatch = await AppDataSource.getRepository(Match).find({
        order: {
          date: "DESC",
        },
        relations: {
          host: true,
          visitor: true,
        },
        skip: offset,
        take: limit,
      });
      return res.json(findMatch);
    } catch (error) {
      return res.json(error);
    }
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id, idHost, idVisitor, date } = req.body;
    if (idHost == idVisitor) {
      return res.json({
        error: "os id do Host e Visitante não podem ser iguais",
      });
    }
    try {
      const host = await AppDataSource.getRepository(Team).findOne({
        where: { id: idHost },
      });
      if (!host) {
        return res.json({ error: "Mandante desconhecido" });
      }
      const findVisitor = await AppDataSource.getRepository(Team).findOne({
        where: { id: idVisitor },
      });
      if (!findVisitor) {
        return res.json({ error: "Visistante desconhecido" });
      }
      const updateMatch = await AppDataSource.getRepository(Match).findOne({
        where: { id: id },
      });
      updateMatch.host = host;
      updateMatch.visitor = findVisitor;
      updateMatch.date = date;
      const updateValues = await AppDataSource.getRepository(Match).save(
        updateMatch
      );
      return res.json(updateValues);
    } catch (error) {
      return res.json(error);
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const findMatch = await AppDataSource.getRepository(Match).find({
        where: [{ host: { id: Number(id) } }, { visitor: { id: Number(id) } }],
        order: { date: "desc" },
        relations: { host: true, visitor: true },
      });
      return res.json(findMatch);
    } catch (error) {
      return res.json(error);
    }
  }

  public async deleteMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const deleteMatch = AppDataSource.createQueryBuilder()
        .delete()
        .from(Match)
        .where("id = :id", { id })
        .execute();
      return res.json(deleteMatch);
    } catch (error) {
      return res.json(error);
    }
  }
}

const match = new MatchController();
export default match;
