import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn,ManyToOne,JoinColumn } from "typeorm";
import {User} from './user.entity'


@Entity()
export class UserLabel {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label:string

    @ManyToOne(()=>User,(user)=>user.userLabel)

    @JoinColumn()
    user:User

    
    
}