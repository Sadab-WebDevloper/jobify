import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendResponse from "../utils/response.util.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;

    if (!jobId) {
      return sendResponse(res, 400, null, "Job Id is Required");
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return sendResponse(res, 400, null, "You Have Already Applied");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return sendResponse(res, 400, null, "Job Not Found");
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);
    await job.save();

    return sendResponse(res, 201, newApplication, "Job Applied Successfully");
  } catch (error) {
    console.error("Error applying for job:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const applicantId = req.userId;

    const applications = await Application.find({ applicant: applicantId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return sendResponse(res, 400, null, "No Applications Found");
    }

    return sendResponse(res, 200, applications, "Applications Found");
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return sendResponse(res, 404, null, "Jobs Not Found");
    }

    return sendResponse(res, 201, job, "Applicant Found");
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return sendResponse(res, 400, null, "Status Missing ");
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return sendResponse(res, 404, null, "Application Not Found");
    }

    application.status = status.toLowerCase();

    await application.save();
    return sendResponse(res, 200, application, "Status Updated");
  } catch (error) {
    console.error("Error updating status:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteApplicant = async (req, res) => {
  try {
    const { id: applicantId } = req.params;
    const applicant = await Application.findById(applicantId);

    if (!applicant) {
      return sendResponse(res, 404, null, "No applicant found");
    }

    await Application.findByIdAndDelete(applicantId);
    return sendResponse(res, 200, null, "Applicant deleted successfully");
  } catch (error) {
    console.error(error); // Better error logging
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
