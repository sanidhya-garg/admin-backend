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
exports.student_router = void 0;
const express_1 = __importDefault(require("express"));
// import { Student } from '../database/models';
const prisma_1 = __importDefault(require("../prisma/prisma"));
const student_router = express_1.default.Router();
exports.student_router = student_router;
student_router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const StudentList = await Student.find();
        const StudentList = yield prisma_1.default.student.findMany();
        res.json(StudentList);
    }
    catch (error) {
        console.log("error in job.ts GET /");
        console.log(error);
        res.status(500).send({ message: "Server error", error: error.message || "Internal Server Error" });
    }
}));
student_router.put('/:student_id/approval', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const StudentId = req.params.student_id;
        const approval = req.body.verified;
        if (approval === undefined)
            return res.status(400).send({ message: "Invalid verified status status" });
        // const  updatedProfile= await Student.findByIdAndUpdate(StudentId, {isVerified:approval}, {new : true});
        const updatedProfile = yield prisma_1.default.student.update({
            where: {
                id: StudentId
            },
            data: {
                isVerified: approval
            }
        });
        if (!updatedProfile)
            return res.status(404).send({ message: "Student not found" });
        res.send(updatedProfile);
    }
    catch (error) {
        console.log("error in job.ts PUT /:student_id/approval");
        console.log(error);
        res.status(500).send({ message: 'Server error', error: error.message || "Internal Server Error" });
    }
}));
