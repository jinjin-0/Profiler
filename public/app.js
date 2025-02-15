const ctx = document.getElementById("chart").getContext("2d");
let chart;

function loadData(group, id) {
  fetch(`/data/${group}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("응답 데이터를 받아오는 도중 오류가 발생했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((item) => item.label),
          datasets: [
            {
              label: "최소값",
              data: data.map((item) => item.min),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "최대값",
              data: data.map((item) => item.max),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "평균값",
              data: data.map((item) => item.avg),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("오류로 인하여 작업을 실행하지 못했습니다.", error);
    });
}