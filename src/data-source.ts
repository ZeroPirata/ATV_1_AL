import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  url: "postgres://pymyyoqu:acwNhFQ_y-jLZR559zLN5PY4YS9LLc0p@babar.db.elephantsql.com/pymyyoqu",
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  maxQueryExecutionTime: 2000,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

export default AppDataSource;
