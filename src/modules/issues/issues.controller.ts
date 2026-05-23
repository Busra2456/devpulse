
import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";


const createIssue = async (req: Request, res: Response,) => {
  try {
    const user = req.user; 
    
    const result = await issuesService.createIssueIntoDB(req.body, user!.id);

    res.status(201).json({
      success: true,
      message: 'Issue created successfully',
      data: result,
    });
  } catch (error:any) 
    {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDB(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error:any) {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};


const getSingleIssue = async (req: Request, res: Response) => {
try {
  

  const issue = await issuesService.getSingleIssueFromDB(
    req.params.id as string
  );

  
  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Issue not found",
    });
  }

  const reporter = await issuesService.getReporterById(
    issue.reporter_id
  );

  res.status(200).json({
    success: true,
    data: {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,

      reporter: {
        id: reporter.id,
        name: reporter.name,
        role: reporter.role,
      },

      created_at: issue.created_at,
      updated_at: issue.updated_at,
    },
  });}catch (error:any) {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {

  try {
    const user = req.user;

 
  const existingIssue = await issuesService.getSingleIssueFromDB(
    req.params.id as string
  );

  
  if (!existingIssue) {
    return res.status(404).json({
      success: false,
      message: "Issue not found",
    });
  }

  
  if (user?.role === "contributor") {

   
    if (existingIssue.reporter_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    if (!user) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}

    
    if (existingIssue.status !== "open") {
      return res.status(409).json({
        success: false,
        message: "Cannot edit non-open issue",
      });
    }

    
    delete req.body.status;
  }

 
  const result = await issuesService.updateIssueFromDB(
    req.params.id as string,
    req.body
  );

 
  res.status(200).json({
    success: true,
    message: "Issue updated successfully",
    data: result,
  });} catch (error:any) {
   sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
}
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    
  await issuesService.deleteIssueFromDB(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Issue deleted successfully",
  }); } catch (error:any) {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
    
  }
};

export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};