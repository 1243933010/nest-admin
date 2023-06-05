import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,OneToMany,BeforeInsert } from "typeorm";
import { Reply } from "./reply.tntity";

@Entity()
export class ReplyParent{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    invitationId:number

    @Column()
    userName:string

    @Column()
    commnetNum:number
    
    @Column()
    userId:string

    @Column()
    context:string

    @OneToMany(()=>Reply,(reply)=>reply.replyParent)
    reply:Reply

    @Column({ type: 'timestamp' })
    createTime: string;

    @BeforeInsert()
    setCreateDate() {
        this.createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}