import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query('perPage') perPage: number, @Query('page') page: number, @Param('id') id: string) {
    console.log(perPage, page, id);
  }

  @Post(':id/chats')
  postChat(@Body() body) {
    return body;
  }
}
