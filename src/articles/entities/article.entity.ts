import { Article } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class ArticleEntity implements Article {
  id: number;

  title: string;

  description: string | null;

  body: string;

  published: boolean;

  createdAt: Date;

  updatedAt: Date;

  authorId: string | null;

  author?: UserEntity;

  constructor({ author, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
