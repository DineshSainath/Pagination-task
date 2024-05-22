console.log('hello from script')

document.addEventListener('DOMContentLoaded', () => {
  // Reference to the table
  const table = document.querySelector('.table.table-bordered')

  //pagination nav
  const paginationNav = document.createElement('nav')
  paginationNav.setAttribute('aria-label', 'Page navigation example')

  // pagination ul
  const paginationUl = document.createElement('ul')
  paginationUl.className = 'pagination'
  paginationUl.id = 'pagination'

  // Append the pagination ul to the nav
  paginationNav.appendChild(paginationUl)

  // Append the pagination nav to the body
  document.body.appendChild(paginationNav)

  let currentPage = 1
  const rowsPerPage = 5

  // Fetch data
  var xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',
    true
  )

  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText)
      console.log(responseData)
      displayData(responseData, currentPage, rowsPerPage)
      setupPagination(responseData, paginationUl, rowsPerPage)
    }
  }

  xhr.send()

  function displayData(items, page, rowsPerPage) {
    table.innerHTML = ''
    page--

    const start = page * rowsPerPage
    const end = start + rowsPerPage
    const paginatedItems = items.slice(start, end)

    // table header
    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')
    const headers = ['ID', 'Name', 'Email']
    headers.forEach((headerText) => {
      const th = document.createElement('th')
      th.textContent = headerText
      headerRow.appendChild(th)
    })
    thead.appendChild(headerRow)
    table.appendChild(thead)

    // table body
    const tbody = document.createElement('tbody')
    paginatedItems.forEach((item) => {
      const row = document.createElement('tr')

      const idCell = document.createElement('td')
      idCell.textContent = item.id
      row.appendChild(idCell)

      const nameCell = document.createElement('td')
      nameCell.textContent = item.name
      row.appendChild(nameCell)

      const emailCell = document.createElement('td')
      emailCell.textContent = item.email
      row.appendChild(emailCell)

      tbody.appendChild(row)
    })
    table.appendChild(tbody)
  }

  function setupPagination(items, container, rowsPerPage) {
    container.innerHTML = ''
    const pageCount = Math.ceil(items.length / rowsPerPage)

    const firstButton = createButton('First', 1)
    const prevButton = createButton('Previous', currentPage - 1)

    container.appendChild(firstButton)
    container.appendChild(prevButton)

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = createButton(i, i)
      if (i === currentPage) {
        pageButton.classList.add('active')
      }
      container.appendChild(pageButton)
    }

    const nextButton = createButton('Next', currentPage + 1)
    const lastButton = createButton('Last', pageCount)

    container.appendChild(nextButton)
    container.appendChild(lastButton)

    function createButton(text, page) {
      const listItem = document.createElement('li')
      listItem.className = 'page-item'

      const button = document.createElement('a')
      button.className = 'page-link'
      button.href = '#'
      button.textContent = text

      if (page < 1 || page > pageCount || page === currentPage) {
        listItem.classList.add('disabled')
      } else {
        button.addEventListener('click', (event) => {
          event.preventDefault()
          currentPage = page
          displayData(items, currentPage, rowsPerPage)
          setupPagination(items, container, rowsPerPage)
        })
      }

      listItem.appendChild(button)
      return listItem
    }
  }
})
