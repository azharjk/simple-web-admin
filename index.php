<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plan Test Web Developer</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body class="p-4">
  <section class="grid">
    <div class="">
      <div class="p-3 bg-secondary">
        <div class="d-flex">
          <img class="me-3" style="width: 150px; height: 150px;" src="/assets/profile.JPG" alt="Image profile">
          <div>
            <span class="d-block text-white text-uppercase">Muhammad Azhari</span>
            <span class="d-block text-white">azharumuhammad@gmail.com</span>
          </div>
        </div>
        <button class="mt-3 d-block btn btn-primary w-100">10 notifications</button>
        <button class="mt-3 d-block btn btn-success w-100">60 inbox</button>
        <button class="mt-5 d-block btn btn-danger w-100 text-uppercase">Exit</button>
      </div>
    </div>
    <div class="">
      <span class="running-text-container">
        <p class="running-text text-nowrap border-top border-bottom border-end">Assisting Your Business From The Heart :: 03 Agustus 2018 Gathering</p>
      </span>
      <div class="border p-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button id="column-chart-btn" class="btn btn-primary text-uppercase">Column</button>
            <button id="pie-chart-btn" class="btn btn-secondary text-uppercase">Pie</button>
          </div>
          <span class="text-uppercase">Daily Performance</span>
        </header>
        <div class="mt-3 border p-2">
          <div id="dp-column-container-chart" style="width: 100%; height: 400px;"></div>
          <div id="dp-pie-container-chart" class="d-none" style="width: 100%; height: 400px;">Pie</div>
        </div>
      </div>
    </div>
    <div class="">
      <p class="d-inline-block border-top border-bottom border-end text-white border-white">Assisting Your Business From The Heart :: 03 Agustus 2018 Gathering</p>
      <div class="border p-3">
        <header class="d-flex justify-content-end">
          <span class="text-uppercase">Daily Performance</span>
          <!-- FIXME: Add table icon -->
        </header>
        <div class="mt-3">
          <table id="dp-table" class="display" style="width:100%">
            <thead>
              <tr>
                <th>Day</th>
                <th>Target time (Hour)</th>
                <th>work Time (Hour)</th>
                <th>Achievement (Percentage)</th>
                <th>Overtime (Hour)</th>
                <th></th>
              </tr>
            </thead>
            <tbody style="height: 100%">
              <tr>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>100</td>
                <td>3</td>
                <td>Sunday</td>
              </tr>
              <tr>
                <td>2</td>
                <td>8</td>
                <td>8</td>
                <td>100</td>
                <td>3</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>8</td>
                <td>8</td>
                <td>100</td>
                <td>1</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>0</td>
                <td>0</td>
                <td>100</td>
                <td>3</td>
                <td>Sunday</td>
              </tr>
              <tr>
                <td>5</td>
                <td>8</td>
                <td>8</td>
                <td>100</td>
                <td>3</td>
                <td></td>
              </tr>
              <tr>
                <td>6</td>
                <td>8</td>
                <td>8</td>
                <td>100</td>
                <td>1</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid p-0 mt-4 border">
    <header class="d-flex justify-content-between align-items-center p-4">
      <form action="index.php" method="get">
        <div class="d-flex align-items-end">
          <div class="me-4 form-group">
            <label class="text-uppercase" for="startdate">Startdate</label>
            <select class="form-select" name="startdate" id="startdate">
              <?php if (isset($_GET['startdate'])) : ?>
                <option value="<?php echo $_GET['startdate'] ?>"><?php echo $_GET['startdate'] ?></option>
              <?php endif ?>
              <?php for ($i = 1; $i <= 31; $i++) : ?>
                <option value="<?php echo $i ?>"><?php echo $i ?></option>
              <?php endfor ?>
            </select>
          </div>
          <div class="me-4 form-group">
            <label class="text-uppercase" for="enddate">Enddate</label>
            <select class="form-select" name="enddate" id="enddate">
              <?php if (isset($_GET['enddate'])) : ?>
                <option value="<?php echo $_GET['enddate'] ?>"><?php echo $_GET['enddate'] ?></option>
              <?php endif ?>
              <?php for ($i = 1; $i <= 31; $i++) : ?>
                <option value="<?php echo $i ?>"><?php echo $i ?></option>
              <?php endfor ?>
            </select>
          </div>
          <button class="btn btn-primary">Reload</button>
        </div>
      </form>
      <span class="text-uppercase">Year summary performance</span>
      <!-- FIXME: Add table icon -->
    </header>
    <div class="p-4">
      <table id="ysp-table" class="display" style="width:100%" data-startdate="<?php echo isset($_GET['startdate']) ? $_GET['startdate'] : 1 ?>" data-enddate="<?php echo isset($_GET['enddate']) ? $_GET['enddate'] : 31 ?>">
        <thead>
          <tr>
            <th>Date</th>
            <th>Target time (Hour)</th>
            <th>Work Time (Hour)</th>
            <th>Achievement (Percentage)</th>
            <th>Overtime (Hour)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </section>
  <section class="mt-4 border">
    <header class="d-flex justify-content-end p-4">
      <span class="text-uppercase">Year summary performance</span>
      <!-- FIXME: Add table icon -->
    </header>
    <div class="grid-3 p-3">
      <div>
        <div class="text-uppercase text-center border">
          Column
        </div>
        <div class="border">
          <div id="column-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
      <div>
        <div class="text-uppercase text-center border">
          Pie
        </div>
        <div class="border">
          <div id="pie-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
      <div>
        <div class="text-uppercase text-center border">
          Area
        </div>
        <div class="border">
          <div id="area-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </section>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
  <script src="/js/app.js"></script>
</body>

</html>