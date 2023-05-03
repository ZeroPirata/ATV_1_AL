import { Request, Response } from "express";
import { Team } from "../models/teams";
import AppDataSource from "../data-source";
import { ILike } from "typeorm";
class TeamController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome } = req.body;
    try {
      if (!nome || nome.trim() === "") {
        return res.json({ err: "Nome não pode ser vazio" });
      }
      const team = new Team();
      team.nome = nome;

      await AppDataSource.manager.save(Team, team);
      return res.json({ ok: `${nome} cadastrado com sucesso!` });
    } catch (error) {
      if (error.code === "23505") {
        return res.json({
          error: `${nome} já existe dentro do sistema`,
        });
      }
    }
  }
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const getAll = await AppDataSource.getRepository(Team).find({
        order: {
          nome: "ASC",
        },
      });
      return res.json(getAll);
    } catch (error) {
      console.log(error);
    }
  }

  public async UpdateTeamValues(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id, nome } = req.body;
    try {
      const updateTeam = await AppDataSource.getRepository(Team).findOneBy({
        id: id,
      });
      updateTeam.nome = nome;
      await AppDataSource.getRepository(Team).save(updateTeam);
      res.json(updateTeam);
    } catch (error) {
      if (error.code === "23505") {
        return res.json({
          error: `${nome} já existe dentro do sistema`,
        });
      }
    }
  }

  public async DeleteTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const deleteTeam = await AppDataSource.getRepository(Team)
        .createQueryBuilder()
        .delete()
        .from(Team)
        .where("id = :id", { id: id })
        .execute();
      return res.json(deleteTeam);
    } catch (error) {
      return res.json(error);
    }
  }

  public async getByName(req: Request, res: Response): Promise<Response> {
    const { nome } = req.params;
    try {
      const getAll = await AppDataSource.getRepository(Team).find({
        order: {
          nome: "ASC",
        },
        where: {
          nome: ILike(`%${nome}%`),
        },
      });
      return res.json(getAll);
    } catch (error) {
      console.log(error);
    }
  }
}
const team = new TeamController();
export default team;
