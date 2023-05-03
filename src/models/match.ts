import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "./teams";

@Entity({ name: "matches" })
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: "date", default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  @ManyToOne(() => Team, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({
    name: "idHost",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_host_id",
  })
  host: Team;

  @ManyToOne(() => Team, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({
    name: "idVisitor",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_visitor_id",
  })
  visitor: Team;
}
