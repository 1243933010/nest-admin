import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    role:string

    @Column()
    parent_id:number

    @Column()
    menu_name:string

    @Column()
    icon:string

    @Column()
    redirect:string

    @Column()
    route_name:string

    

}
