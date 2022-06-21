const generateDayList = (n) => {
  const ret = []
  for (let i = 0; i < n; i++) {
    ret.push(`Day ${i + 1}`);
  }

  return ret;
}

const generateRandomData = (n, min, max) => {
  const ret = []
  for (let i = 0; i < n; i++) {
    ret.push(Math.floor(Math.random() * (max - min + 1) + min));
  }

  return ret;
}

document.addEventListener('DOMContentLoaded', async function () {
  // Daily Performance Chart
  // FIXME: Still have unused table field
  $('#dp-container-chart').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily Performance'
    },
    xAxis: {
      categories: generateDayList(8)
    },
    yAxis: {
      title: {
        text: 'Work Time (Hour)'
      }
    },
    series: [{
      name: 'Work Time (Hour)',
      data: generateRandomData(8, 0, 8)
    }, {
      name: 'Target Time (Hour)',
      data: generateRandomData(8, 0, 8)
    }]
  });

  $('#dp-table').DataTable({
    pageLength: 5,
    'scrollX': true
  });

  // Year Summary Performance
  const renderYspColumnChart = (data) => {
    const categories = []
    const workTimes = []
    const targetTimes = []

    data.map((v) => {
      categories.push(`Day ${v.date}`);
      workTimes.push(Number(v.work_time));
      targetTimes.push(Number(v.target_time));
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
      }]
    });
  }

  const renderYspPieChart = (data) => {
    const workTimeAndAchievement = []
    data.map((v) => {
      workTimeAndAchievement.push([`Day ${v.date}`, Number(v.achievement)]);
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
      workTimes.push(Number(v.work_time));
      targetTimes.push(Number(v.target_time));
      overtimes.push(Number(v.overtime));
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
      }]
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
      url: '/api/performances10.json',
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

  // Search filter
  // FIXME: This is bad because its impacting other filter input
  $('.dataTables_filter input').unbind().keyup(function () {
    var value = $(this).val();
    const result = yspTable.search(value).rows({ search: 'applied' });

    result.map(vs => {
      const searchData = []
      vs.map(v => {
        searchData.push(yspTable.data()[v]);
      });

      renderYspColumnChart(searchData);
      renderYspPieChart(searchData);
      renderYspAreaChart(searchData);
    });

    yspTable.draw();
  });
});