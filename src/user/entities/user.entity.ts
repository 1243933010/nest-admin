import { Entity,Column,PrimaryGeneratedColumn,Generated,CreateDateColumn,OneToMany } from "typeorm";
import {UserLabel} from './userLabel.tntity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(()=>UserLabel,(userLabel)=>userLabel.user)
    userLabel:UserLabel[]
    
    @Generated('uuid')
    uuid:string
    

    @Column()
    username :string

    @Column()
    password :string

    @Column()
    role:string

    @Column()
    avatar:string
    
    

    //tableDetail: UserLabel[];

    // @Generated('uuid')
    // uuid:string

    // @CreateDateColumn({type:"timestamp"})
    // createTime:Date
}
