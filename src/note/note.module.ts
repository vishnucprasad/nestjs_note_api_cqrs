import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { NotSchemaFactory, NoteSchema } from './schema';
import { NoteCommandHandlers } from './command';
import { NoteEntityRepository } from './repository';
import { NoteFactory } from './domain/note.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: NoteSchema.name,
        schema: SchemaFactory.createForClass(NoteSchema),
      },
    ]),
  ],
  controllers: [NoteController],
  providers: [
    NoteService,
    NoteEntityRepository,
    NotSchemaFactory,
    NoteFactory,
    ...NoteCommandHandlers,
  ],
})
export class NoteModule {}
