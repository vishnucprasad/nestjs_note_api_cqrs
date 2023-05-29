import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { CreateNoteDto, EditNoteDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(AccessGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes(@GetUser('_id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getnote(@GetUser('_id') userId: string, @Param('id') noteId: string) {
    return this.noteService.getNote(userId, noteId);
  }

  @Post()
  createNote(@GetUser('_id') userId: string, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':id')
  editNote(
    @GetUser('_id') userId: string,
    @Param('id') noteId: string,
    @Body() dto: EditNoteDto,
  ) {
    return this.noteService.editNote(userId, noteId, dto);
  }
}
