// jshint maxerr:1000
let firstName = '';
let lastName = '';
let departmentName = '';
let locationName = '';

$.ajax({
    url: 'Php/jsonSql.php',
    type: 'POST',
    dataType: 'json',
    success: function(result){
        let tableData = result;
        for(let i = 0; i < tableData.length; i++){
            firstName = tableData[i].firstName;
            lastName = tableData[i].lastName;
            let email = tableData[i].email;
            let id = tableData[i].id;
            departmentId = tableData[i].departmentID;
            if(departmentId == 1){
                departmentName = "Human Resources";
                locationName = "London";
            } else if(departmentId == 2){
                departmentName = "Sales";
                locationId = "New York";
            } else if(departmentId == 3){
                departmentName = "Marketing";
                locationName = "New York";
            } else if(departmentId == 4){
                departmentName = "Legal";
                locationName = "London";
            } else if(departmentId == 5){
                departmentName = "Services";
                locationName = "London";
            } else if(departmentId == 6){
                departmentName = "Research and Development";
                locationName = "Paris";
            } else if(departmentId == 7){
                departmentName = "Product Management";
                locationName = "Paris";
            } else if(departmentId == 8){
                departmentName = "Training";
                locationName = "Munich";
            } else if(departmentId == 9){
                departmentName = "Support";
                locationName = "Munich";
            } else if(departmentId == 10){
                departmentName = "Engineering";
                locationName = "Rome";
            } else if(departmentId == 11){
                departmentName = "Accounting";
                locationName = "Rome";
            } else if(departmentId == 12){
                departmentName = "Business Development";
                locationName = "Paris";
            }
            $('#employeeTable').append(`<tr id="${tableData[i].id}"><td class='id'>`+id+"</td><td class='firstName'>"+firstName+"</td><td class='lastName'>"+lastName+"</td><td class='email'>"+email+"</td><td class='department'>"+departmentName+"</td><td class='location'>"+locationName+"</td><td><button class='deleteEmployee' title='Delete Employee' type='button' onclick='employeeDelete(this)'><i class='bi bi-trash-fill'></i></button><button title='Edit Employee' class='editButton' data-toggle='modal' data-target='#editModal' onclick='selectEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
        }
    }
});

//search bar used to search first name of employee
function searchEmployeesFirstName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
        }
      }       
    }
  }

//sorting the table. every column can be sorted.
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));

//Using tables to create a filter system to filter down to relevent search querys
$("#filter-button").on("click", function(e) {
    // Show all rows (in case any were hidden by a previous filtering)
    jQuery("#employeeTable > tr:hidden, #employeeTable > tbody > tr:hidden").show();
    // Get all filtered options as array
    let checkedFilters = $(".filter-table input[type='checkbox']:checked").map(function() {
      return $(this).val();
    }).get();
    if (checkedFilters.length < 1) {
      return; // No filters are selected!
    }
    // Loop through all table rows
    $("#employeeTable > tr, #employeeTable > tbody > tr").each(function() {
      // Loop through and return only rows that DO NOT contain a selected filter and hide them
      let rowData = $(this).find("td").get();
      let shouldFilter = !rowData.some(element => checkedFilters.includes(element.innerText));
      if(shouldFilter){
          $(this).hide();
      }
    });
    $('#filterModal').modal('toggle');
  });

//Resetting the table to see all entries.
$("#resetButton").click(function(){
    $("#employeeTable").find("tr").show();
    $(".checkBox").prop("checked", false);
});

//Clearing the form so its ready to use for next use
function formClear(){
    $('#newEmployeeForm').trigger("reset");
}

//Adding an employee using html form to fill in required data for table and database
function addToTable(){
    if($('#iD').val() === '' || $('#fName').val() === '' || $('#lName').val() === '' || $('#email').val() === '' || $('#department').val() === null || $('#location').val() === null){
        alert("All fields are REQUIRED");
        return false;
    } else {
        $('#employeeTable').append("<tr><td>"+$('#iD').val()+"</td><td>"+$('#fName').val()+"</td><td>"+$('#lName').val()+"</td><td>"+$('#email').val()+"</td><td>"+$('#department').val()+"</td><td>"+$('#location').val()+"</td><td><button title='Delete Employee' type='button' onclick='employeeDelete(this)'><i class='bi bi-trash-fill'></i></button><button title='Edit Employee' class='editButton' data-toggle='modal' data-target='#editModal' onclick='selectEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
        let confirmalert = confirm("Are you sure?");
        if (confirmalert === true) {
            $.ajax({
                url: "Php/addEmployee.php",
                type: "POST",
                data: {
                    'id': $('#iD').val(),
                    'firstName': $('#fName').val(),
                    'lastName' : $('#lName').val(),
                    'email' : $('#email').val(),
                    'department' : $('#department').val()
                },
                cache: false,
                success: function(data){
                    let result = data;
                    result = JSON.parse(result);
                    if(result.statusCode==200){
                        alert("New Employee Added Successfully");						
                    }
                    else if(result.statusCode==201){
                    alert("Error Occured!");
                    }
                }
            });
        }
        alert("Employee Added");
        formClear();
    }
    $('#addModal').modal('toggle');
}

// Using edit button in order to pull up requitred information in the editEmployee Modal to fill out form data in order to then edit it.
function selectEdit(ctl){
        let _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        editId = null;
        editFirstName = null;
        editLastName = null;
        editEmail = null;
        editDepartment = null;
        editLocation = null;
        for(let i = 0; i < cols.length; i++){
            editId = cols[0].innerHTML;
            editFirstName = cols[1].innerHTML;
            editLastName = cols[2].innerHTML;
            editEmail = cols[3].innerHTML;
            editDepartment = cols[4].innerHTML;
            editLocation = cols[5].innerHTML;
        }
        //console.log(editId);
        $('#editId').val(editId);
        $('#editFirstName').val(editFirstName);
        $('#editLastName').val(editLastName);
        $('#editEmail').val(editEmail);
        $('#editDepartment').val(editDepartment);
        $('#editLocation').val(editLocation);
}

// Editing Employee. only lastname, email, department and location in html table and Database
function updateEmployee(rowId){
    let row = $('#'+rowId);
    let lastName = $('#editLastName').val();
    let email = $('#editEmail').val();
    let department = $('#editDepartment').val();
    let location = $('#editLocation').val();
    let confirmalert = confirm("Are you sure?");
    if (confirmalert === true) {
        $.ajax({
            url: "Php/update.php",
            type: "POST",
            data: {
                'id': rowId,
                'lastName': lastName,
                'email': email,
                'department': department 
            },
            success: function(data){
                row.children(".lastName").text(lastName);
                row.children(".email").text(email);
                row.children(".department").text(department);
                row.children(".location").text(location);
            }
        });
    }
    alert("Employee Updated");
    $('#editModal').modal('toggle');
}

// Deleting employee from html table and Database
function employeeDelete(ctl) {
    let _row = $(ctl).parents("tr");
    let cols = _row.children("td");
    let id = null;
    for(let i = 0; i < cols.length; i++){
        id = cols[0].innerHTML;
    }
    let confirmalert = confirm("Are you sure?");
    if (confirmalert === true) {
        $.ajax({
            url: 'Php/remove.php',
            type: 'POST',
            data: { 
                'id' : id 
            },
            success: function(response){
                $(ctl).parents("tr").remove();
            }
        });
    } 
    alert("Employee Removed");
}