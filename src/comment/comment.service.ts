import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  async create(createCommentDto: CreateCommentDto) {
    const data = await this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(data); 
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: number) {
    return await this.commentRepository.findOne({where: {id}});
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const data = await this.commentRepository.update(id, updateCommentDto);
    return await this.commentRepository.findOne({where: {id}});
  }

  async remove(id: number) {
    const data = await this.commentRepository.delete(id);
    return {message: "Comment deleted successfully"};
  }
}
