import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
 

  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);

    sendResponse(
      res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  console.log("COntroller", req.user);
  try {
    const result = await userService.getAllUsersFromDB();
   return res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
   return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUsersFromDB(id as string);
    if (result.rows.length === 0) {
    return res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }

   return res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
   return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  

  try {
    const result = await userService.updatedUserFromDB(req.body, id as string);

    if (result.rows.length === 0) {
     return res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    // console.log(result);
   return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
   return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUsersFromDB(id as string);

    console.log(result);
    if (result.rowCount === 0) {
     return res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

  return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
   return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};