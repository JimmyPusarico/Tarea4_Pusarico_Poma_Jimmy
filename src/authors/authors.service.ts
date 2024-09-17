import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  findAll() {
    return this.authorsRepository.find();
  }

  findOne(id: number) {
    return this.authorsRepository.findOne({ where: { id } });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorsRepository.delete(id);
  }

  getBooksByAuthorId(authorId: number) {
    return this.booksRepository.find({ where: { author_id: authorId } });
  }
}
