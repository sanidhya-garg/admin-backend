"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_router = void 0;
const express_1 = __importDefault(require("express"));
// import { Job } from '../database/models';
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const job_router = express_1.default.Router();
exports.job_router = job_router;
job_router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const JobList = await Job.find();
        const JobList = yield prisma_1.default.job.findMany();
        res.json(JobList);
    }
    catch (error) {
        console.log("error in job.ts GET /");
        console.log(error);
        res.status(500).send({ message: "Server error", error: error.message || "Internal Server Error" });
    }
}));
job_router.put('/:job_id/approval', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.job_id;
        const approval = req.body.approval;
        if (!approval || !['pending', 'approved', 'disapproved'].includes(approval))
            return res.status(400).send({ message: 'Invalid approval status' });
        // const updatedJob = await Job.findByIdAndUpdate(jobId, { approval }, { new: true });
        const updatedJob = yield prisma_1.default.job.update({
            where: {
                id: jobId
            },
            data: {
                approval: approval
            }
        });
        if (!updatedJob)
            return res.status(404).send({ message: 'Job not found' });
        res.send(updatedJob);
    }
    catch (error) {
        console.log("error in job.ts PUT /:job_id/approval");
        console.log(error);
        res.status(500).send({ message: 'Server error', error: error.message || "Internal Server Error" });
    }
}));
