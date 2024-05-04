fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  .then(response => response.json())
  .then(data => {
    let students = data;

    function renderTable(studentsData) {
      const tableSection = document.getElementById('tableSection');
      tableSection.innerHTML = ''; // Clear previous content

      const table = document.createElement('table');
      const tableHeader = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const headers = ['Name', 'Email', 'Passing', 'Marks', 'Class', 'Gender'];

      headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });

      tableHeader.appendChild(headerRow);
      table.appendChild(tableHeader);

      const tableBody = document.createElement('tbody');
      studentsData.forEach(student => {
        const row = document.createElement('tr');
        const rowData = [`${student.first_name} ${student.last_name}`, student.email, student.passing ? 'Passing' : 'Failed', student.marks, student.class, student.gender];
        rowData.forEach(cellData => {
          const cell = document.createElement('td');
          cell.textContent = cellData;
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });

      table.appendChild(tableBody);
      tableSection.appendChild(table);
    }

    renderTable(students); // Initial render

    // Function to handle search
    function handleSearch() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const filteredStudents = students.filter(student => {
        return student.first_name.toLowerCase().includes(searchInput) ||
               student.last_name.toLowerCase().includes(searchInput) ||
               student.email.toLowerCase().includes(searchInput);
      });
      renderTable(filteredStudents);
    }

    document.getElementById('searchButton').addEventListener('click', handleSearch);
    
    // Sort A->Z button functionality
    document.getElementById('sortAZButton').addEventListener('click', function() {
      students.sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
      renderTable(students);
    });
    
    // Sort Z->A button functionality
    document.getElementById('sortZAButton').addEventListener('click', function() {
      students.sort((a, b) => `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`));
      renderTable(students);
    });
    
    // Sort by marks button functionality
    document.getElementById('sortByMarksButton').addEventListener('click', function() {
      students.sort((a, b) => a.marks - b.marks);
      renderTable(students);
    });
    
    // Sort by passing button functionality
    document.getElementById('sortByPassingButton').addEventListener('click', function() {
      const passingStudents = students.filter(student => student.passing);
      renderTable(passingStudents);
    });
    
    // Sort by class button functionality
    document.getElementById('sortByClassButton').addEventListener('click', function() {
      students.sort((a, b) => a.class.localeCompare(b.class));
      renderTable(students);
    });
    
    // Sort by gender button functionality
    document.getElementById('sortByGenderButton').addEventListener('click', function() {
      const maleStudents = students.filter(student => student.gender === 'Male');
      const femaleStudents = students.filter(student => student.gender === 'Female');
      renderTable(maleStudents.concat(femaleStudents));
    });

  })
  .catch(error => console.error('Error fetching student data:', error));