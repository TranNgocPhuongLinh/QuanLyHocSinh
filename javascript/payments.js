let payments = JSON.parse(localStorage.getItem('payments')) || [];

document.getElementById('form-payments').addEventListener('submit', (e) => {
  e.preventDefault();
  let id = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let date = document.getElementById('date').value;
  let amount = document.getElementById('amount').value;
  addPayment(id, name, date, amount);
});

function addPayment(id, name, date, amount) {
  let payment = { id, name, date, amount };
  payments.push(payment);
  localStorage.setItem('payments', JSON.stringify(payments));
  renderPaymentTable();
}

window.addEventListener('load',() => {
  renderPaymentTable();
});

function renderPaymentTable() {
    let paymentList = document.getElementById('payments-list');
    paymentList.innerHTML = '';
    payments.forEach((payment, index) => {
      let tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td style = "text-align: center;">${payment.id}</td>
        <td>${payment.name}</td>
        <td style = "text-align: center;">${payment.date}</td>
        <td>${payment.amount}</td>
        <td style = "text-align: center;">
        <button class="edit-btn" data-index="${index}" style="width:30px;">
        <i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn" data-index="${index}" style="width:30px;">
        <i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      paymentList.appendChild(tableRow);
    });
    
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        deletepayment(btn.dataset.index);
      });
    });
  
    let editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        editpayment(btn.dataset.index);
      });
    });
}

function deletepayment(index) {
  payments.splice(index, 1);
  localStorage.setItem('payments', JSON.stringify(payments));
  renderPaymentTable();
}

function editpayment(index) {
  let payment = payments[index];
  let editSection = document.getElementById('edit-section');
  let overlay = document.querySelector('.overlay');
  
  editSection.style.display = 'block'; // show the popup edit section
  overlay.classList.add('show-popup');
  
  let idInput = document.getElementById('edit-id');
  let nameInput = document.getElementById('edit-name');
  let dateInput = document.getElementById('edit-date');
  let amountInput = document.getElementById('edit-amount');
  
  idInput.value = payment.id;
  nameInput.value = payment.name;
  dateInput.value = payment.date;
  amountInput.value = payment.amount;
  
  let saveButton = document.getElementById('save-btn');
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    payment.id = idInput.value;
    payment.name = nameInput.value;
    payment.date = dateInput.value;
    payment.amount = amountInput.value;
    localStorage.setItem('payments', JSON.stringify(payments));
    editSection.style.display = 'none'; // hide the popup edit section
    overlay.classList.remove('show-popup');
    renderPaymentTable();
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('close-btn')) {
      editSection.style.display = 'none'; // hide the popup edit section
      overlay.classList.remove('show-popup'); // hide the overlay
    }
  });
}