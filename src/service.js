import fs from 'fs';

function readDataBase() {
    try {
        const dbData = fs.readFileSync('./Dados/grades.json', 'UTF-8');
        const gradesDB = JSON.parse(dbData.toString());

        return gradesDB;
    } catch(error) {
        throw new Error(error.message);
    }
}

function writeDataBase(gradesDB) {
    try {
        fs.writeFileSync('./Dados/grades.json', JSON.stringify(gradesDB, null, 4));

        return true;
    } catch(error) {
        throw new Error(error.message);
    }
}

export const viewGrade = (id) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    const grade = gradesDB.grades.find(grade => grade.id === id);

    return grade;
}

export const saveGrade = (grade) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    let nextId = gradesDB.nextId;
    grade.id = nextId;
    gradesDB.grades.push(grade);
    gradesDB.nextId = ++nextId;
    /*
    console.log(gradesDB);
    console.log(gradesDB.nextId);
    console.log(grade);
    */
    if (writeDataBase(gradesDB)) {
        return grade;
    } else {
        return null;
    }
}

export const updateGrade = (grade) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    let updatedGrade = null
    for (let i = 0; i < gradesDB.grades.length; i++) {
        if (gradesDB.grades[i].id === grade.id) {

            gradesDB.grades[i] = { ...gradesDB.grades[i], ...grade };
            updatedGrade = gradesDB.grades[i];
        }
    }

    if (updatedGrade && writeDataBase(gradesDB)) {
        return updatedGrade;
    }
     
    return null;
}

export const removeGrade = (id) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    let grade = null;
    gradesDB.grades = gradesDB.grades.filter(gradeElement => {
        if (gradeElement.id === id) {
            grade = gradeElement;
        }
        return gradeElement.id !== id;
    });

    if (writeDataBase(gradesDB)) {
        return grade;
    } else {
        return null;
    }
}

export const gradeTotal = (student, subject) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    const gradesForStudentBySubject = gradesDB.grades.filter(grade => grade.student === student && grade.subject === subject);
    
    if (gradesForStudentBySubject.length <= 0) {
        return null;
    }

    return gradesForStudentBySubject.reduce((acc, grade) => acc + grade.value, 0);
}

export const subjectTypeAverage = (subject, type) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    const gradesForStudentBySubject = gradesDB.grades.filter(grade => grade.subject === subject && grade.type === type);
    
    if (gradesForStudentBySubject.length <= 0) {
        return null;
    }

    let total = gradesForStudentBySubject.reduce((acc, grade) => acc + grade.value, 0);

    return (total * 1.0) / gradesForStudentBySubject.length;
}

export const subjectTypeTop3 = (subject, type) => {
    let gradesDB = null
    
    try {
        gradesDB = readDataBase();
    } catch(error) {
        throw new Error(error.message);
    }

    const gradesForStudentBySubject = gradesDB.grades.filter(grade => grade.subject === subject && grade.type === type);
    
    if (gradesForStudentBySubject.length <= 0) {
        return null;
    }

    gradesForStudentBySubject.sort((a, b) => {
        if (a.value > b.value) return -1;
        if (a.value < b.value) return 1;
        return 0;
    });

    return gradesForStudentBySubject.slice(0, 3);
}