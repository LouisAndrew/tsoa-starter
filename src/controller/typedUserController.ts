import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Res,
  Route,
  SuccessResponse,
  Tags,
  TsoaResponse,
} from "tsoa";

import { ZUserSchema as User, zUserSchema } from "../schema/userSchema.js";
import { UserCreationParams, usersService } from "../service/userService.js";

@Tags("zod")
@Route("typed-users")
export class TypedUsersController extends Controller {
  @SuccessResponse("200", "User!!!!")
  @Get("{userId}")
  public async getUser(
    /**
     * ID of the user.
     */
    @Path() userId: number,
    /**
     * Hello mom
     */
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
    /**
     * Name of the user
     */
    @Query() name?: string
  ): Promise<User> {
    if (userId === 0) {
      return notFoundResponse(404, { reason: "User not found" });
    }

    return usersService.get(userId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
    /**
     * Hello mom
     */
    @Res()
    invalidResponse: TsoaResponse<422, { error: any }>
  ): Promise<User> {
    const parseResult = zUserSchema.safeParse(requestBody);
    if (!parseResult.success) {
      this.setStatus(422);
      return invalidResponse(422, { error: parseResult.error });
    }

    this.setStatus(201); // set return status 201
    const user = usersService.create(requestBody);
    return user;
  }
}
