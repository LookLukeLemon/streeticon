import { Controller, Get } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {
  constructor(readonly storyService: StoryService) {}

  @Get()
  findAll() {
    return this.storyService.findAll();
  }
}
