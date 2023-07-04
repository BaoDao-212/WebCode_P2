import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/role.decorator';
import { CourseService } from './course.servive';
import {
  CreateCourseInput,
  CreateCourseOutput,
  ListCourseOutput,
} from './course.dto';
import { CurrentUser } from '../auth/user.decorator';
import { User } from 'src/entities/user.entity';

@ApiTags('Course')
@Controller('/course')
@ApiSecurity('admin')
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}
  @ApiOperation({
    summary: 'Create Course',
  })
  @Roles(['Professor'])
  @Post('create')
  @ApiOkResponse({ type: CreateCourseOutput })
  async createCourse(
    @CurrentUser() user: User,
    @Body() input: CreateCourseInput,
  ): Promise<CreateCourseOutput> {
    return this.courseService.createCourse(user, input);
  }
  @ApiOperation({
    summary: 'List Course Professor',
  })
  @Roles(['Professor'])
  @Get('/professor/list')
  @ApiOkResponse({ type: ListCourseOutput })
  async listCourseProfessor(
    @CurrentUser() user: User,
  ): Promise<ListCourseOutput> {
    return this.courseService.listCourseProfessor(user);
  }
}
