import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Res,
  Response,
  Route,
  SuccessResponse,
  TsoaResponse,
} from "tsoa";

import { User } from "../schema/userSchema.js";
import { UserCreationParams, usersService } from "../service/userService.js";
import { ValidateErrorJSON } from "../type.js";

@Route("users")
export class UsersController extends Controller {
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

  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    this.setStatus(201); // set return status 201
    const user = usersService.create(requestBody);
    return user;
  }
}
