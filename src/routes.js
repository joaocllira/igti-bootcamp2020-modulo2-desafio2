import express from "express";
import { saveGrade, viewGrade, removeGrade, updateGrade, gradeTotal, subjectTypeAverage, subjectTypeTop3 } from './service.js';

var routes = express.Router();

// TOTAL
routes.get('/grade/total', (request, response) => {
    try {
        const { student, subject } = request.body;

        let total = gradeTotal(student, subject);

        return response.json({ student, subject, total } || {message: "No student/subject combination found"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// AVERAGE
routes.get('/grade/average', (request, response) => {
    try {
        const { subject, type } = request.body;

        let average = subjectTypeAverage(subject, type);

        return response.json({ subject, type, average } || {message: "No subject/type combination found"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// TOP 3
routes.get('/grade/top3', (request, response) => {
    try {
        const { subject, type } = request.body;

        let top3 = subjectTypeTop3(subject, type);

        return response.json({ subject, type, top3 } || {message: "No subject/type combination found"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// VIEW
routes.get('/grade/:id', (request, response) => {
    try {
        const { id } = request.params;

        let grade = viewGrade(parseInt(id));

        return response.json(grade || {message: "No grade found"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// CREATE
routes.post('/grade', (request, response) => {
    try {
        const { student, subject, type, value } = request.body;

        let newGrade = {
            student, 
            subject, 
            type, 
            value: parseFloat(value),
            timestamp: new Date()
        }

        let grade = saveGrade(newGrade);

        return response.json(grade);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// UPDATE
routes.put('/grade/:id', (request, response) => {
    try {
        const { id } = request.params;
        const { student, subject, type, value } = request.body;

        let newGrade = {
            id: parseInt(id),
            student, 
            subject, 
            type, 
            value: parseFloat(value)
        }

        let grade = updateGrade(newGrade);

        return response.json(grade || {message: "Grade not found"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// DELETE
routes.delete('/grade/:id', (request, response) => {
    try {
        const { id } = request.params;

        let grade = removeGrade(parseInt(id));

        return response.json(grade || {message: "No grade deleted"});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});


export default routes;