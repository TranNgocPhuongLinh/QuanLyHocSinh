let students = [];

document.getElementById('form-hoc-sinh').addEventListener('submit', (e) => {
	e.preventDefault();
	let name = document.getElementById('name').value;
	let grade = document.getElementById('grade').value;
    let gioiTinh = document.getElementById('gioi-tinh').value;
    let ngayHoc = document.getElementById('date').value;
    let monHoc = document.getElementById('subject').value;
    let hocPhi = document.getElementById('fee').value;
	addStudent(name, grade, gioiTinh, ngayHoc, monHoc, hocPhi);
});

function addStudent(name, grade, gioiTinh, ngayHoc, monHoc, hocPhi) {
	let student = { name, grade, gioiTinh, ngayHoc, monHoc, hocPhi };
	students.push(student);
	renderStudentTable();
}

function renderStudentTable() {
	let studentList = document.getElementById('student-list');
	studentList.innerHTML = '';
	students.forEach((student, index) => {
		let tableRow = document.createElement('tr');
		tableRow.innerHTML = `
			<td>${student.name}</td>
			<td>${student.grade}</td>
            <td>${student.gioiTinh}</td>
			<td>${student.ngayHoc}</td>
            <td>${student.monHoc}</td>
			<td>${student.hocPhi}</td>
			<td>
            <button class="edit-btn" data-index="${index}">
            <i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn" data-index="${index}">
            <i class="fa-solid fa-trash"></i></button>
            </td>
		`;
		studentList.appendChild(tableRow);
	});
	
	let deleteBtns = document.querySelectorAll('.delete-btn');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			deleteStudent(btn.dataset.index);
		});
	});

    let editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
        editStudent(btn.dataset.index);
        });
    });
}

function deleteStudent(index) {
	students.splice(index, 1);
	renderStudentTable();
}

function editStudent(index) {
    let student = students[index];
    let editSection = document.getElementById('edit-section');
    editSection.style.display = 'block'; // show the popup edit section
    
    let nameInput = document.getElementById('edit-name');
    let gradeInput = document.getElementById('edit-grade');
    let gioiTinhInput = document.getElementById('edit-gioi-tinh');
    let ngayHocInput = document.getElementById('edit-date');
    let monHocInput = document.getElementById('edit-subject');
    let hocPhiInput = document.getElementById('edit-fee');
    
    nameInput.value = student.name;
    gradeInput.value = student.grade;
    gioiTinhInput.value = student.gioiTinh;
    ngayHocInput.value = student.ngayHoc;
    monHocInput.value = student.monHoc;
    hocPhiInput.value = student.hocPhi;
    
    let saveButton = document.getElementById('save-btn');
    saveButton.addEventListener('click', () => {
      student.name = nameInput.value;
      student.grade = gradeInput.value;
      student.gioiTinh = gioiTinhInput.value;
      student.ngayHoc = ngayHocInput.value;
      student.monHoc = monHocInput.value;
      student.hocPhi = hocPhiInput.value;
      editSection.style.display = 'none'; // hide the popup edit section
      renderStudentTable();
    });
  }