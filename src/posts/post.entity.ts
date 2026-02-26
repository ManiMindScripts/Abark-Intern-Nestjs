import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn } from "typeorm";
import { Category } from "src/categories/category.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column('text')
    content: string
    @Column({default: false})
    published: boolean
    @ManyToOne(()=> Category, (category) => category.posts,{
        eager: true
    })
    category: Category
    @CreateDateColumn()
    createdAt: Date
}
