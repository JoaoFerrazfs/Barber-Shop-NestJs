import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './contents.entity';
import { Repository } from 'typeorm';
import { ContentCreateDTO } from './dto/content.create.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
  ) {}

  async modules(): Promise<Contents[]> {
    return await this.contentsRepository.find();
  }

  store({ imageUrl, title }: ContentCreateDTO) {
    const content = this.contentsRepository.create({ imageUrl, title });
    return this.contentsRepository.save(content);
  }
}
