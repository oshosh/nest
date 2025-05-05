import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

@Module({
  providers: [DmsService],
  controllers: [DmsController],
})
export class DmsModule {}
