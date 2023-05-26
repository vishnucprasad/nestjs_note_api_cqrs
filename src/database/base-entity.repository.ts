import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import { EntityRepository } from './entity.repository';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({
      _id: new ObjectId(id),
    } as FilterQuery<TSchema>);
  }

  async findOneAndUpdateById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndUpdate(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}
