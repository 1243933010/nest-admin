import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,OneToMany,BeforeInsert,JoinColumn } from "typeorm";
import { ReplyParent } from "./replyParent.entity";

@Entity()
export class Reply{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    invitationId:number

    @Column()
    userName:string

    @Column()
    userId:string

    @Column()
    context:string

    @Column()
    parentId:number

    

    @ManyToOne(()=>ReplyParent,(replyParent)=>replyParent.reply)

    @JoinColumn()
    replyParent:ReplyParent

    @Column({ type: 'timestamp' })
    createTime: string;

    @BeforeInsert()
    setCreateDate() {
        this.createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}