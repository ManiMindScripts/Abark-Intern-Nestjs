import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepo: Repository<Post>,

        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ) { }
    async create(dto: any) {
        const category = await this.categoryRepo.findOneBy({
            id: dto.categoryId
        })
        if (!category)
            throw new NotFoundException('Category Not Found')
        const post = this.postRepo.create({
            ...dto,
            category,
        })
        return this.postRepo.save(post)
    }
    findAll(published?: boolean, categoryId?: number) {
        const where: any = {}
        if (published !== undefined)
            where.published = published
        if (categoryId)
            where.category = { id: categoryId }
        return this.postRepo.find({ where })
    }
    async findOne(id: number) {
        const post = await this.postRepo.findOneBy({ id })
        if (!post)
            throw new NotFoundException('Post Not Found')
        return post
    }
    async remove(id: number) {
        const post = await this.findOne(id)
        return this.postRepo.remove(post)
    }
}
