import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class readOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'jihoon@gmail.con',
    description: 'email',
  })
  id: string;
}
