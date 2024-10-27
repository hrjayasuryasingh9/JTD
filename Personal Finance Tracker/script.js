let budget = JSON.parse(localStorage.getItem("budget")) || null;
let income = JSON.parse(localStorage.getItem("income")) || null;
let savings = JSON.parse(localStorage.getItem("savings")) || null;
let totalTransactions = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let myChart = null;

function updateDisplay() {
  document.querySelector(".pop-up-Budget .Amount span").innerText =
    budget !== null ? budget : "Not Set";
  document.querySelector(".pop-up-Income .Amount span").innerText =
    income !== null ? income : "Not Set";
  document.querySelector(".pop-up-Savings .Amount span").innerText =
    savings !== null ? savings : "Not Set";

  renderTransactions();
  updateChart();
}

function saveData() {
  localStorage.setItem("budget", JSON.stringify(budget));
  localStorage.setItem("income", JSON.stringify(income));
  localStorage.setItem("savings", JSON.stringify(savings));
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function renderTransactions() {
  const transactionsContainer = document.querySelector(".Transactions");
  transactionsContainer.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const { amount, category, icon, date, time } = transaction;
    transactionsContainer.innerHTML += `
      <div class="transaction" data-index="${index}">
        <div class="categorie-symbol-${icon}">
          <i class="fa-solid fa-${icon}"></i>
        </div>
        <p class="${icon}">
          - ${amount} <i class="fa-solid fa-indian-rupee-sign"></i>
        </p>
        <button class="Delete" id="Delete" style="display: none;">X</button>
        <div class="date mx-3">
          <span>${date}</span>
          <span>${time}</span>
        </div>
      </div>
    `;
  });
}

function calculateCategoryExpenses() {
  const categoryTotals = {
    Rent: 0,
    Food: 0,
    Entertainment: 0,
    Other: 0,
  };

  transactions.forEach((transaction) => {
    if (categoryTotals.hasOwnProperty(transaction.category)) {
      categoryTotals[transaction.category] += transaction.amount;
    } else {
      categoryTotals.Other += transaction.amount;
    }
  });

  return Object.values(categoryTotals);
}

function updateChart() {
  const categoryExpenses = calculateCategoryExpenses();

  if (myChart) {
    myChart.data.datasets[0].data = categoryExpenses;
    myChart.update();
  } else {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Rent", "Food", "Entertainment", "Other"],
        datasets: [
          {
            label: "Expenses",
            data: categoryExpenses,
            backgroundColor: ["#17c8bc", "#17c867", "#c8c517", "#c817bc"],
          },
        ],
      },
    });
  }
}

document.querySelectorAll(".Record").forEach((recordBtn) => {
  recordBtn.addEventListener("click", function () {
    const popUp = this.closest(
      ".pop-up-Budget, .pop-up-Income, .pop-up-Savings"
    );
    const newValue = parseInt(popUp.querySelector("input").value);

    if (!isNaN(newValue)) {
      if (popUp.classList.contains("pop-up-Income")) {
        income = newValue;
      } else if (popUp.classList.contains("pop-up-Budget")) {
        if (income >= newValue + savings) {
          budget = newValue;
        } else {
          Swal.fire({
            title: "Greater Budget",
            width: "300px",
            text: "The budget shouldn't be Greated than the remaining income",
            icon: "error",
            background: "#2d2d2d",
            color: "#fff",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
            iconColor: "#fe3333", // Icon color
            confirmButtonText: "OK",
          });
          return;
        }
      } else if (popUp.classList.contains("pop-up-Savings")) {
        if (budget + newValue <= income) {
          savings = newValue;
        } else {
          Swal.fire({
            title: "Greater Savings",
            width: "300px",
            text: "The Savings shouldn't be Greated than the remaining income",
            icon: "error",
            background: "#2d2d2d",
            color: "#fff",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
            iconColor: "#fe3333",
            confirmButtonText: "OK",
          });
          return;
        }
      }

      saveData();
      updateDisplay();
      popUp.style.display = "none";
    } else {
      Swal.fire({
        title: "Greater Savings",
        width: "300px",
        text: "The Savings shouldn't be Greated than the remaining income",
        icon: "error",
        background: "#2d2d2d",
        color: "#fff",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
        iconColor: "#fe3333",
        confirmButtonText: "OK",
      });
    }
  });
});

function canAddTransaction(amount) {
  if (budget === null || income === null || savings === null) {
    Swal.fire({
      title: "Budget Not set",
      width: "300px",
      text: "Please add budget",
      icon: "error",
      background: "#2d2d2d", // Dark background color
      color: "#fff", // Text color
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333", // Icon color
      confirmButtonText: "OK",
    });
    return false;
  }

  const newTotalTransactions = totalTransactions + amount;

  if (newTotalTransactions > budget) {
    Swal.fire({
      title: "Budget exceding",
      width: "300px",
      text: "the Amount shouldn't exceed the remaining budget",
      icon: "warning",
      background: "#2d2d2d", // Dark background color
      color: "#fff", // Text color
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333", // Icon color
      confirmButtonText: "OK",
    });
    amountInput.value = "";
    return false;
  }

  return true;
}

function handleRecord() {
  const amountInput = document.querySelector(".Amount input");
  const amount = parseInt(amountInput.value);
  const categorySelect = document.querySelector(".Category select");
  const category = categorySelect.value;
  const icon = categorySelect.selectedOptions[0].dataset.color;

  if (amount && category) {
    if (!canAddTransaction(amount)) {
      return; // Stop if budget exceeds
    }

    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);

    transactions.push({
      amount,
      category,
      icon,
      date: formattedDate,
      time: formattedTime,
    });

    totalTransactions += amount;

    saveData();
    updateDisplay();
    amountInput.value = ""; // Clear the input after recording
    categorySelect.selectedIndex = 0; // Reset category to default
    document.querySelector(".pop-up").style.display = "none";
  } else {
    Swal.fire({
      title: "Invalid Data ",
      width: "300px",
      text: "The Amount should be in numbers",
      icon: "error",
      background: "#2d2d2d",
      color: "#fff",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333",
      confirmButtonText: "OK",
    });
    amountInput.value = ""; // Clear the input in case of invalid entry
  }
}

document.querySelector(".Cancel").addEventListener("click", () => {
  document.querySelector(".pop-up").style.display = "none";
  document.querySelector(".Amount input").value = ""; // Clear input on cancel
  document.querySelector(".Category select").selectedIndex = 0; // Reset category
});

function deleteTransaction(index) {
  const removedTransaction = transactions.splice(index, 1)[0];
  if (removedTransaction) {
    totalTransactions -= removedTransaction.amount;
  }
  saveData();
  updateDisplay();
}

function toggleDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".Delete");
  const editButton = document.getElementById("Edit");
  deleteButtons.forEach((button) => {
    if (button.style.display === "none") {
      button.style.display = "inline-block";
      editButton.innerText = "Save";
      button.addEventListener("click", function () {
        const index = this.closest(".transaction").getAttribute("data-index");
        deleteTransaction(index);
        editButton.innerText = "Edit";
      });
    } else {
      button.style.display = "none";
      editButton.innerText = "Edit";
    }
  });
}

document.querySelector(".Record").addEventListener("click", handleRecord);
document.getElementById("Edit").addEventListener("click", () => {
  if (transactions.length > 0) {
    toggleDeleteButtons();
  } else {
    Swal.fire({
      title: "No Transactions ",
      width: "300px",
      text: "There are no transactions to delete",
      icon: "error",
      background: "#2d2d2d",
      color: "#fff",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333",
      confirmButtonText: "OK",
    });
  }
});
document.querySelector(".header-button").addEventListener("click", () => {
  document.getElementById("Remaining").innerText = budget - totalTransactions;
  document.querySelector(".pop-up").style.display = "block";
});

document.getElementById("Budget").addEventListener("click", function () {
  if (income === null) {
    Swal.fire({
      title: "Income Not set",
      width: "300px",
      text: "Please Set the income Amount before Budget",
      icon: "warning",
      background: "#2d2d2d",
      color: "#fff",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333",
      confirmButtonText: "OK",
    });
  } else {
    document.querySelector(".pop-up-Budget").style.display = "block";
  }
});

document.getElementById("Income").addEventListener("click", function () {
  document.querySelector(".pop-up-Income").style.display = "block";
});

document.getElementById("Savings").addEventListener("click", function () {
  if (income === null) {
    Swal.fire({
      title: "Income Not set",
      width: "300px",
      text: "Please Set the income Amount before Savings",
      icon: "warning",
      background: "#2d2d2d",
      color: "#fff",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      iconColor: "#fe3333",
      confirmButtonText: "OK",
    });
  } else {
    document.querySelector(".pop-up-Savings").style.display = "block";
  }
});

document.getElementById("Cancel-Budget").addEventListener("click", function () {
  document.querySelector(".pop-up-Budget").style.display = "none";
});

document.getElementById("Cancel-Income").addEventListener("click", function () {
  document.querySelector(".pop-up-Income").style.display = "none";
});

document
  .getElementById("Cancel-Savings")
  .addEventListener("click", function () {
    document.querySelector(".pop-up-Savings").style.display = "none";
  });

totalTransactions = transactions.reduce(
  (sum, transaction) => sum + transaction.amount,
  0
);

updateDisplay();

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
