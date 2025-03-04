let students = [];
let attendanceRecords = {};

function addStudent() {
    let name = document.getElementById('studentName').value;
    let id = document.getElementById('studentID').value;
    let degree = document.getElementById('studentDegree').value;
    let courseID = document.getElementById('courseID').value;
    let courseName = document.getElementById('courseName').value;

    if (name && id && degree && courseID && courseName) {
        students.push({ id, name, degree, courseID, courseName });
        alert(`Student ${name} enrolled in ${courseName}`);
        updateDropdowns();
    }
}

function updateDropdowns() {
    let studentDropdown = document.getElementById('attStudentID');
    let courseDropdown = document.getElementById('attCourseID');
    studentDropdown.innerHTML = '<option value="">Select Student ID</option>';
    courseDropdown.innerHTML = '<option value="">Select Course ID</option>';

    students.forEach(student => {
        studentDropdown.innerHTML += `<option value="${student.id}">${student.id}</option>`;
        courseDropdown.innerHTML += `<option value="${student.courseID}">${student.courseID}</option>`;
    });
}

function markAttendance(present) {
    let studentID = document.getElementById('attStudentID').value;
    let courseID = document.getElementById('attCourseID').value;

    if (!studentID || !courseID) {
        alert("Please select a student and course");
        return;
    }

    let key = `${studentID}-${courseID}`;
    if (!attendanceRecords[key]) {
        attendanceRecords[key] = { total: 0, present: 0 };
    }

    attendanceRecords[key].total++;
    if (present === 'yes') {
        attendanceRecords[key].present++;
    }

    updateTable();
}

function updateTable() {
    let tableBody = document.getElementById('attendance-list');
    tableBody.innerHTML = '';

    for (let key in attendanceRecords) {
        let [studentID, courseID] = key.split('-');
        let student = students.find(s => s.id === studentID);
        
        if (student) {
            let total = attendanceRecords[key].total;
            let present = attendanceRecords[key].present;
            let percentage = ((present / total) * 100).toFixed(2);

            tableBody.innerHTML += `
                <tr>
                    <td>${studentID}</td>
                    <td>${student.name}</td>
                    <td>${courseID}</td>
                    <td>${student.courseName}</td>
                    <td>${total}</td>
                    <td>${present}</td>
                    <td>${percentage}%</td>
                </tr>`;
        }
    }
}

function resetAttendance() {
    attendanceRecords = {};
    updateTable();
}
