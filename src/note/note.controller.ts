import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(AccessGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes(@GetUser('_id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Post()
  createNote(@GetUser('_id') userId: string, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }
}
