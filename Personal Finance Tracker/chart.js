document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart").getContext("2d");
  const data = {
    labels: ["Rent", "Food", "Entertainment", "Others"],
    datasets: [
      {
        label: "Finance Tracker",
        data: [160, 80, 50, 70],
        backgroundColor: ["#17c8bc", "#17c867", "#c8c517", "#c817bc"],
        hoverOffset: 1,
      },
    ],
  };

  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
  });
});
