import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ){}
    create(name: string) {
        const category = this.categoryRepo.create({name})
        return this.categoryRepo.save(category)
    }
    findAll() {
        return this.categoryRepo.find()
    }
    async findOne(id: number){
        const category = await this.categoryRepo.findOneBy({id})
        if(!category) 
            throw new NotFoundException('Category Not Found')
        return category
    }
    async remove(id: number){
        const category = await this.findOne(id)
        return this.categoryRepo.remove(category)
    }
}
