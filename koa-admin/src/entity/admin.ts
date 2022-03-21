import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface OutAdmin {
	id: number;
	isSuper: boolean;
	name: string;
}

@Entity("admin")
export class Admin {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	password!: string;

	@Column()
	isSuper!: boolean;

	filtePassword(): OutAdmin {
		return {
			id: this.id,
			isSuper: this.isSuper,
			name: this.name,
		};
	}
}
