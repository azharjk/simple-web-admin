document.addEventListener('DOMContentLoaded', function () {
  // Year Summary Performance
  const renderYspColumnChart = (data) => {
    const categories = []
    const workTimes = []
    const targetTimes = []

    data.map((v, idx) => {
      categories.push(`Day ${v.date}`);
      workTimes.push({ y: Number(v.work_time), id: v.id });
      targetTimes.push({ y: Number(v.target_time), id: v.id });
    });

    Highcharts.chart('column-ysp-container-chart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Year Summary Work Time compare to Target Time'
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
                onSeriesDataClick(this.id, yspTable, [renderYspColumnChart, renderYspPieChart, renderYspAreaChart]);
              }
            }
          }
        }
      }
    });
  }

  const renderYspPieChart = (data) => {
    const workTimeAndAchievement = []
    data.map((v) => {
      workTimeAndAchievement.push({ y: Number(v.achievement), id: v.id, name: `Day ${v.date}` });
    });

    Highcharts.chart('pie-ysp-container-chart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Year Summary Achievement'
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
                onSeriesDataClick(this.id, yspTable, [renderYspColumnChart, renderYspPieChart, renderYspAreaChart]);
              }
            }
          }
        }
      },
    });
  }

  const renderYspAreaChart = (data) => {
    const categories = []
    const workTimes = []
    const targetTimes = []
    const overtimes = []

    data.map((v) => {
      categories.push(`Day ${v.date}`);
      workTimes.push({ y: Number(v.work_time), id: v.id });
      targetTimes.push({ y: Number(v.target_time), id: v.id });
      overtimes.push({ y: Number(v.overtime), id: v.id });
    });

    Highcharts.chart('area-ysp-container-chart', {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Year Summary Work Time, Target Time compare to Overtime'
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
      }, {
        name: 'Overtime (Hour)',
        data: overtimes
      }],
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                onSeriesDataClick(this.id, yspTable, [renderYspColumnChart, renderYspPieChart, renderYspAreaChart]);
              }
            }
          }
        }
      }
    });
  }

  const yspTableContainer = $('#ysp-table');
  const yspTable = yspTableContainer.DataTable({
    // Filter data by startdate and enddate
    fnInitComplete: function (oSettings, json) {
      const startDate = yspTableContainer.data('startdate');
      const endDate = yspTableContainer.data('enddate');

      const filteredData = json.filter(data => {
        return data.date >= startDate && data.date <= endDate;
      });

      yspTable.clear();
      yspTable.rows.add(filteredData);
      yspTable.draw();

      renderYspColumnChart(filteredData);
      renderYspPieChart(filteredData);
      renderYspAreaChart(filteredData);
    },
    pageLength: 5,
    ajax: {
      url: '/api/year_performances10.json',
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

  // Search filter Year Summary Performance
  $('input[aria-controls="ysp-table"]').unbind().keyup(function () {
    var value = $(this).val();
    const result = yspTable.search(value).rows({ search: 'applied' });

    result.map(vs => {
      const searchData = []
      vs.map(v => {
        searchData.push(yspTable.data()[v]);
      });

      setTimeout(() => {
        renderYspColumnChart(searchData);
        renderYspPieChart(searchData);
        renderYspAreaChart(searchData);
      }, 500);
    });

    yspTable.draw();
  });
});