import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("staff")
export class Staff {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	firstName!: string;

	@Column()
	secondName!: string;

	@Column()
	email!: string;

	@Column()
	address!: string;

	@Column()
	isClock!: boolean;
}
