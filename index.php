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
  <div id="drawer" class="drawer">
    <div class="p-4">
      <div class="d-flex justify-content-end">
        <button id="drawer-close-btn" class="btn btn-primary text-white">&times;</button>
      </div>
      <div>
        <h3 id="drawer-title"></h3>
        <div id="drawer-data" style="display: grid; gap: 1rem;">
        </div>
      </div>
    </div>
  </div>
  <section class="grid">
    <div class="">
      <div class="p-3 bg-red">
        <div class="d-flex">
          <img class="me-3" style="width: 150px; height: 150px;" src="/assets/profile.JPG" alt="Image profile">
          <div>
            <span class="d-block text-white text-uppercase">Muhammad Azhari</span>
            <span class="d-block text-white">azharumuhammad@gmail.com</span>
          </div>
        </div>
        <button id="notification-btn" class="mt-3 d-block btn btn-primary w-100">Loading...</button>
        <button id="inbox-btn" class="mt-3 d-block btn btn-success w-100">Loading...</button>
        <button id="modal-btn" class="mt-5 d-block btn btn-danger w-100 text-uppercase">Exit</button>
        <!-- Modal -->
        <div id="modal" class="modal d-none">
          <div class="modal-content">
            <div class="d-flex justify-content-end">
              <button id="modal-exit-btn" class="btn btn-secondary">&times;</button>
            </div>
            <div class="text-center">
              <p>Are you sure you want to exit?</p>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn btn-danger text-uppercase">Exit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <span class="running-text-container">
        <p class="running-text text-nowrap border-2 border-top border-bottom border-end border-red">Assisting Your Business From The Heart :: 03 Agustus 2018 Gathering</p>
      </span>
      <div class="border border-2 border-red p-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button id="column-chart-btn" class="btn btn-primary text-uppercase">Column</button>
            <button id="pie-chart-btn" class="btn btn-secondary text-uppercase">Pie</button>
          </div>
          <span class="text-uppercase">Daily Performance</span>
        </header>
        <div class="mt-3 border border-2 border-red p-2">
          <div id="dp-column-container-chart" style="width: 100%; height: 400px;"></div>
          <div id="dp-pie-container-chart" class="d-none" style="width: 100%; height: 400px;">Pie</div>
        </div>
      </div>
    </div>
    <div class="">
      <p class="d-inline-block border-top border-bottom border-end text-white border-white">Assisting Your Business From The Heart :: 03 Agustus 2018 Gathering</p>
      <div class="border p-3 border-2 border-red">
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
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid p-0 mt-4 border border-2 border-red">
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
              <?php else : ?>
                <option value="31">31</option>
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
  <section class="mt-4 border border-2 border-red">
    <header class="d-flex justify-content-end p-4">
      <span class="text-uppercase">Year summary performance</span>
      <!-- FIXME: Add table icon -->
    </header>
    <div class="grid-3 p-3">
      <div>
        <div class="text-uppercase text-center border border-2 border-red">
          Column
        </div>
        <div class="border border-2 border-red">
          <div id="column-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
      <div>
        <div class="text-uppercase text-center border border-2 border-red">
          Pie
        </div>
        <div class="border border-2 border-red">
          <div id="pie-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
      <div>
        <div class="text-uppercase text-center border-2 border-red border">
          Area
        </div>
        <div class="border border-2 border-red">
          <div id="area-ysp-container-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </section>
  <section class="grid-2 mt-4 border-2 border-red border p-4">
    <div>
      <header class="d-flex justify-content-center border-2 border-red border py-2">
        <span class="text-uppercase">Notification</span>
      </header>
      <div class="border p-4 border-2 border-red">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <input id="notification-search-input" class="form-control" placeholder="Search" type="text">
          </div>
          <div class="d-flex align-items-center">
            <div class="me-4 form-check">
              <label class="form-check-label text-uppercase text-danger" for="notification-danger">Danger</label>
              <input id="notification-checkbox-danger" class="form-check-input border-danger" type="checkbox" name="" id="notification-danger">
            </div>
            <div class="me-4 form-check">
              <label class="form-check-label text-uppercase text-warning" for="notification-warning">Warning</label>
              <input id="notification-checkbox-warning" checked class="form-check-input border-warning" type="checkbox" name="" id="notification-warning">
            </div>
            <div class="form-check">
              <label class="form-check-label text-uppercase text-success" for="notification-safe">Safe</label>
              <input id="notification-checkbox-safe" checked class="form-check-input border-success" type="checkbox" name="" id="notification-safe">
            </div>
          </div>
        </div>
        <div id="notification-container" class="mt-4">
        </div>
      </div>
    </div>
    <div>
      <header class="d-flex justify-content-center border-2 border-red border py-2">
        <span class="text-uppercase">Inbox</span>
      </header>
      <div class="border p-4 border-2 border-red">
        <div class="d-flex align-items-center justify-content-between">
          <div class="w-100">
            <input id="inbox-search-input" class="form-control" placeholder="Search" type="text">
          </div>
        </div>
        <div id="inbox-container" class="mt-4">
        </div>
      </div>
    </div>
  </section>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
  <script src="/js/utils.js"></script>
  <script src="/js/app.js"></script>
  <script src="/js/notification.js"></script>
  <script src="/js/inbox.js"></script>
  <script src="/js/modal-exit.js"></script>
</body>

</html>