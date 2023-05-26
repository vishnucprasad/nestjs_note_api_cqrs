import { AggregateRoot } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { EntitySchemaFactory } from './entity-schema.factory';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  public async findOne(
    entityFilterQuery: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    if (entityDocument) {
      return this.entitySchemaFactory.createFromSchema(entityDocument);
    }
  }

  protected async find(
    entityFilterQuery: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
    ).map((entityDocument) =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  public async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
  }

  protected async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedEntityDocument = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      this.entitySchemaFactory.create(entity) as unknown,
      {
        new: true,
        lean: true,
      },
    );

    if (!updatedEntityDocument) {
      throw new NotFoundException('Unable to find the entity to update');
    }
  }
}
