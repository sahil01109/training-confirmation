// ==========================================
// Advozy Training Confirmation
// storage.js
// ==========================================

const STORAGE_KEY = "advozy_training_students";

// ------------------------------------------
// Get All Students
// ------------------------------------------

function getStudents() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);

}

// ------------------------------------------
// Save All Students
// ------------------------------------------

function saveStudents(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

// ------------------------------------------
// Collect Form Data
// ------------------------------------------

function collectFormData() {

    return {

        reference: document.getElementById("reference").value,

        date: document.getElementById("date").value,

        studentName: document.getElementById("studentName").value,

        roll: document.getElementById("roll").value,

        course: document.getElementById("course").value,

        branch: document.getElementById("branch").value,

        college: document.getElementById("college").value,

        domain: document.getElementById("domain").value,

        duration: document.getElementById("duration").value,

        startDate: document.getElementById("startDate").value,

        endDate: document.getElementById("endDate").value,

        signatory: document.getElementById("signatory").value,

        designation: document.getElementById("designation").value

    };

}

// ------------------------------------------
// Save Student
// ------------------------------------------

function saveStudent() {

    const student = collectFormData();

    if (student.studentName.trim() === "") {

        alert("Enter Student Name");

        return;

    }

    let students = getStudents();

    const index = students.findIndex(

        s => s.reference === student.reference

    );

    if (index >= 0) {

        students[index] = student;

    } else {

        students.push(student);

        // Increase reference counter
        let counter = localStorage.getItem("adv_reference") || 1;

        counter++;

        localStorage.setItem("adv_reference", counter);

    }

    saveStudents(students);

    alert("Student Saved Successfully");

}

// ------------------------------------------
// Load Student
// ------------------------------------------

function loadStudent(reference) {

    const students = getStudents();

    const student = students.find(

        s => s.reference === reference

    );

    if (!student) return;

    Object.keys(student).forEach(key => {

        const element = document.getElementById(key);

        if (element) {

            element.value = student[key];

        }

    });

    if (typeof updatePreview === "function") {

        updatePreview();

    }

}

// ------------------------------------------
// Delete Student
// ------------------------------------------

function deleteStudent(reference) {

    let students = getStudents();

    students = students.filter(

        s => s.reference !== reference

    );

    saveStudents(students);

}

// ------------------------------------------
// Reset Form
// ------------------------------------------

function clearForm() {

    document.getElementById("studentForm").reset();

    generateReference();

    setTodayDate();

    updatePreview();

}

// ------------------------------------------
// Save Button
// ------------------------------------------

document

.getElementById("saveBtn")

.addEventListener(

    "click",

    saveStudent

);

// ------------------------------------------
// Export Functions (Future)
// ------------------------------------------

window.trainingStorage = {

    getStudents,

    loadStudent,

    deleteStudent,

    clearForm

};