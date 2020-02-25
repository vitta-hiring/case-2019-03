import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  route: string;
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    this.route = config.get('app.apiUrl') + '/user';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Query()
    query: {
      page: string;
      limit: string;
      search: { searchedColumn: string; searchText: string };
    },
    @Request() req
  ) {
    console.log("CONTROLLER: ", req.user);
    return await this.userService.getAll(
      this.route,
      query.page,
      query.limit,
      query.search,
    );
  }
}
