var ctx = document.getElementById("myChart");

var database;
var fechas = [];
var clicks = [];
var usuarios = [];
var data;
var myChart;
const dbRef = firebase.database().ref();

var timesChanged = 0;
dbRef.on("value", (snapshot) => {
  fechas = [];
  clicks = [];
  usuarios = [];

  data = snapshot.val();
  console.log("actualizadoooooo");

  for (const [key, value] of Object.entries(data)) {
    fechas.push(key);
    var us = 0;
    var click = 0;
    for (const [ip, inter] of Object.entries(value)) {
      us++;
      click += inter.used;
    }
    usuarios.push(us);
    clicks.push(click);
  }

  console.log(fechas);
  console.log(usuarios);
  console.log(clicks);

  if ((timesChanged = !0)) {
    updateData(clicks, usuarios);
  }

  timesChanged++;
});

setTimeout(createChart, 2000);

function createChart() {
  fechas;
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [
        {
          label: "Clicks",
          data: clicks,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },

        {
          label: "Usuarios",
          data: usuarios,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },

      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Uso de Replace",
        },
      },

      layout: {},
    },
  });
}

function updateData(clicks, usuarios) {
  myChart.data.datasets[0].data = clicks;
  myChart.data.datasets[1].data = usuarios;
  myChart.update();
}
