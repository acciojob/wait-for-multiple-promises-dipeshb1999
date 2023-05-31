//your JS code here. If required.
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function simulateAsyncAPI(index) {
  const time = getRandomTime(1000, 3000);
  await delay(time);
  return { promise: `Promise ${index}`, time: time / 1000 };
}

async function displayResults() {
  const tableBody = document.getElementById('table-body');
  const loadingRow = tableBody.querySelector('.loading');

  const promises = [
    simulateAsyncAPI(1),
    simulateAsyncAPI(2),
    simulateAsyncAPI(3)
  ];

  const results = await Promise.all(promises);

  tableBody.removeChild(loadingRow);

  results.forEach(({ promise, time }) => {
    const row = document.createElement('tr');
    const promiseCell = document.createElement('td');
    const timeCell = document.createElement('td');

    promiseCell.textContent = promise;
    timeCell.textContent = time.toFixed(3);

    row.appendChild(promiseCell);
    row.appendChild(timeCell);
    tableBody.appendChild(row);
  });

  const totalRow = document.createElement('tr');
  const totalCell = document.createElement('td');
  const totalTimeCell = document.createElement('td');

  totalCell.textContent = 'Total';
  totalTimeCell.textContent = results.reduce((sum, { time }) => sum + time, 0).toFixed(3);

  totalRow.appendChild(totalCell);
  totalRow.appendChild(totalTimeCell);
  tableBody.appendChild(totalRow);
}

window.onload = displayResults;
