let students = JSON.parse(localStorage.getItem('students')) || [];

document.getElementById('form-hoc-sinh').addEventListener('submit', (e) => {
  e.preventDefault();
  let id = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let grade = document.getElementById('grade').value;
  let gioiTinh = document.getElementById('gioi-tinh').value;
  let ngayHoc = document.getElementById('date').value;
  let monHoc = document.getElementById('subject').value;
  let hocPhi = document.getElementById('fee').value;
  addStudent(id, name, grade, gioiTinh, ngayHoc, monHoc, hocPhi);
});

function addStudent(id, name, grade, gioiTinh, ngayHoc, monHoc, hocPhi) {
  let student = { id, name, grade, gioiTinh, ngayHoc, monHoc, hocPhi };
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudentTable();
}

window.addEventListener('load',() => {
  renderStudentTable();
});

function renderStudentTable() {
    let studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
      let tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.grade}</td>
        <td>${student.gioiTinh}</td>
        <td>${student.ngayHoc}</td>
        <td>${student.monHoc}</td>
        <td>${student.hocPhi}</td>
        <td>
        <button class="edit-btn" data-index="${index}" style="width:30px;">
        <i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn" data-index="${index}" style="width:30px;">
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
  localStorage.setItem('students', JSON.stringify(students));
  renderStudentTable();
}

function editStudent(index) {
  let student = students[index];
  let editSection = document.getElementById('edit-section');
  let overlay = document.querySelector('.overlay');
  
  editSection.style.display = 'block'; // show the popup edit section
  overlay.classList.add('show-popup');
  
  let idInput = document.getElementById('edit-id');
  let nameInput = document.getElementById('edit-name');
  let gradeInput = document.getElementById('edit-grade');
  let gioiTinhInput = document.getElementById('edit-gioi-tinh');
  let ngayHocInput = document.getElementById('edit-date');
  let monHocInput = document.getElementById('edit-subject');
  let hocPhiInput = document.getElementById('edit-fee');
  
  idInput.value = student.id;
  nameInput.value = student.name;
  gradeInput.value = student.grade;
  gioiTinhInput.value = student.gioiTinh;
  ngayHocInput.value = student.ngayHoc;
  monHocInput.value = student.monHoc;
  hocPhiInput.value = student.hocPhi;
  
  let saveButton = document.getElementById('save-btn');
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    student.id = idInput.value;
    student.name = nameInput.value;
    student.grade = gradeInput.value;
    student.gioiTinh = gioiTinhInput.value;
    student.ngayHoc = ngayHocInput.value;
    student.monHoc = monHocInput.value;
    student.hocPhi = hocPhiInput.value;
    localStorage.setItem('students', JSON.stringify(students));
    editSection.style.display = 'none'; // hide the popup edit section
    overlay.classList.remove('show-popup');
    renderStudentTable();
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('close-btn')) {
      editSection.style.display = 'none'; // hide the popup edit section
      overlay.classList.remove('show-popup'); // hide the overlay
    }
  });
}