import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsServices: PostsService) { }

    @Post()
    create(@Body() dto: any) {
        return this.postsServices.create(dto)
    }
    @Get()
    findAll(
        @Query('published') published?: string,
        @Query('categoryId') categoryId?: string
    ) {
        return this.postsServices.findAll(
            published ? published === 'true' : undefined,
            categoryId ? +categoryId : undefined
        )
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsServices.findOne(+id)
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.postsServices.remove(+id)
    }

}
