

import { Entity,Column,PrimaryGeneratedColumn,Generated,BeforeInsert } from "typeorm";
@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id:number

    @Generated('uuid')
    uuid:string

    @Column()
    userId:number

    @Column()
    title:string

    @Column()
    content:string

    @Column({ type: 'timestamp' })
    createTime: string;

    @BeforeInsert()
    setCreateDate() {
        this.createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    // @CreateDateColumn()
    // createTime:string

    // @UpdateDateColumn()
    // updateTime:string

}
