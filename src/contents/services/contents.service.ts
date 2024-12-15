import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from '../contents.entity';
import { Repository } from 'typeorm';
import { ContentCreateDto } from '../dto/contentCreate.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
  ) {}

  async modules(): Promise<Contents[]> {
    return await this.contentsRepository.find();
  }

  async getModuleById(id: number): Promise<Contents> {
    return await this.contentsRepository.findOneBy({ id });
  }

  async store({ imageUrl, title }: ContentCreateDto) {
    const content = this.contentsRepository.create({ imageUrl, title });

    return await this.contentsRepository.save(content);
  }

  async update(id: number, data: ContentCreateDto): Promise<boolean> {
    return Boolean((await this.contentsRepository.update(id, data)).affected);
  }

  async delete(id: number): Promise<boolean> {
    return Boolean((await this.contentsRepository.delete(id)).affected);
  }
}
