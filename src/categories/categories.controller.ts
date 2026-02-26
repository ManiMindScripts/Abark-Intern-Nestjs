import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor (private readonly categoriesServices: CategoriesService){}
   
    @Post()
    create(@Body() body: { name: string}) {
        return this.categoriesServices.create(body.name)
    }
 
    @Get() 
     findAll(){
        return this.categoriesServices.findAll()
     }
    @Get(':id')
    fnidOne(@Param('id') id: string) {
        return this.categoriesServices.findOne(+id)
    }

    @Get(':id/posts')
     async getPosts(@Param('id') id: string) {
        const category = await this.categoriesServices.findOne(+id)
        return category.posts
     }
     @Delete(':id')
     @HttpCode(HttpStatus.NO_CONTENT)
     remove(@Param('id') id: string){
        return this.categoriesServices.remove(+id)
     }
}
