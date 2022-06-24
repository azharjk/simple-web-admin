document.addEventListener('DOMContentLoaded', function () {
  // FIXME: Clean up this
  $('#column-chart-btn').click(function () {
    $('#dp-column-container-chart').removeClass('d-none');
    $(this).removeClass('btn-secondary');
    $(this).addClass('btn-primary');
    $('#pie-chart-btn').addClass('btn-secondary');
    $('#dp-pie-container-chart').addClass('d-none');
  });

  $('#pie-chart-btn').click(function () {
    $('#dp-pie-container-chart').removeClass('d-none');
    $(this).removeClass('btn-secondary');
    $(this).addClass('btn-primary');
    $('#column-chart-btn').addClass('btn-secondary');
    $('#dp-column-container-chart').addClass('d-none');
  });

  // FIXME: All render chart function can be a same function
  const renderDpColumnChart = (data) => {
    const categories = []
    const workTimes = []
    const targetTimes = []

    data.map((v) => {
      categories.push(`Day ${v.date}`);
      workTimes.push({ y: Number(v.work_time), id: v.id });
      targetTimes.push({ y: Number(v.target_time), id: v.id });
    });

    $('#dp-column-container-chart').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Daily Performance'
      },
      xAxis: {
        categories
      },
      yAxis: {
        title: {
          text: 'Work Time (Hour)'
        }
      },
      series: [{
        name: 'Work Time (Hour)',
        data: workTimes
      }, {
        name: 'Target Time (Hour)',
        data: targetTimes
      }],
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                onSeriesDataClick(this.id, dpTable, [renderDpColumnChart, renderDpPieChart]);
              }
            }
          }
        }
      }
    });
  }

  const renderDpPieChart = (data) => {
    const workTimeAndAchievement = []
    data.map((v) => {
      workTimeAndAchievement.push({ y: Number(v.achievement), id: v.id, name: `Day ${v.date}` });
    });

    $('#dp-pie-container-chart').highcharts({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Daily Summary Achievement'
      },
      series: [{
        name: 'Work Time (Hour)',
        data: workTimeAndAchievement
      }],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        },
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                onSeriesDataClick(this.id, dpTable, [renderDpColumnChart, renderDpPieChart]);
              }
            }
          }
        }
      },
    });
  }

  // Daily Performance Chart
  // FIXME: Still have unused table field

  const dpTable = $('#dp-table').DataTable({
    fnInitComplete: function (oSettings, json) {
      renderDpColumnChart(json);
      renderDpPieChart(json);
    },
    pageLength: 5,
    ajax: {
      url: '/api/daily_performances10.json',
      dataSrc: '',
    },
    columns: [
      { data: 'date' },
      { data: 'target_time' },
      { data: 'work_time' },
      { data: 'achievement' },
      { data: 'overtime' },
      { data: 'day' }
    ]
  });

  // Search filter Daily Performance
  $("input[aria-controls='dp-table']").unbind().keyup(function () {
    var value = $(this).val();
    const result = dpTable.search(value).rows({ search: 'applied' });

    result.map(vs => {
      const searchData = []
      vs.map(v => {
        searchData.push(dpTable.data()[v]);
      });

      setTimeout(() => {
        renderDpColumnChart(searchData);
        renderDpPieChart(searchData);
      }, 500);
    });

    dpTable.draw();
  });
});
