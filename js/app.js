document.addEventListener('DOMContentLoaded', async function () {
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
                onSeriesDataClick(this.id, 'daily-performance');
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
                onSeriesDataClick(this.id, 'daily-performance');
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

  // FIXME: Can it be one single function??
  const onSeriesDataClick = (id, type) => {
    let chosenData;
    let table = type === 'daily-performance' ? dpTable : yspTable;

    table.data().map((data) => {
      if (data.id === id) chosenData = data;
    });

    table.clear();
    table.rows.add([chosenData]);
    table.draw();

    if (type === 'daily-performance') {
      renderDpColumnChart([chosenData]);
      renderDpPieChart([chosenData]);
    } else {
      renderYspColumnChart([chosenData]);
      renderYspPieChart([chosenData]);
      renderYspAreaChart([chosenData]);
    }
  }

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
                onSeriesDataClick(this.id, 'year-performance');
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
                onSeriesDataClick(this.id, 'year-performance');
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
                onSeriesDataClick(this.id, 'year-performance');
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

  $('.dataTables_filter input').each(function () {
    const el = $(this)
    if (el.attr('aria-controls') === 'dp-table') {
      el.attr('id', 'dp-table-input');
    } else if (el.attr('aria-controls') === 'ysp-table') {
      el.attr('id', 'ysp-table-input');
    }
  });

  // Search filter Daily Performance
  $('#dp-table-input').unbind().keyup(function () {
    var value = $(this).val();
    const result = dpTable.search(value).rows({ search: 'applied' });

    result.map(vs => {
      const searchData = []
      vs.map(v => {
        searchData.push(yspTable.data()[v]);
      });

      setTimeout(() => {
        renderDpColumnChart(searchData);
        renderDpPieChart(searchData);
      }, 500);
    });

    dpTable.draw();
  });

  // Search filter Year Summary Performance
  $('#ysp-table-input').unbind().keyup(function () {
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