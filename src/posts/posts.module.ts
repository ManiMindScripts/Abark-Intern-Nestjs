import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post,Category])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
