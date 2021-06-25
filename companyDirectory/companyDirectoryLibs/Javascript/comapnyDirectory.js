// jshint maxerr:1000
let firstName = null;
let lastName = null;
let departmentName = null;
let locationName = null;

// Ajax call to get information for Employee table
$.ajax({
    url: 'companyDirectoryLibs/Php/jsonSql.php',
    type: 'POST',
    dataType: 'json',
    success: function(result){
        let tableData = result;
        for(let i = 0; i < tableData.data.length; i++){
            firstName = tableData.data[i].firstName;
            lastName = tableData.data[i].lastName;
            let email = tableData.data[i].email;
            departmentName = tableData.data[i].department;
            locationName = tableData.data[i].location;
            let id = tableData.data[i].id;
            $('#employeeTable').append("<tr id='"+id+"' class='table-data'><td class='firstName'>"+firstName+"</td><td class='lastName'>"+lastName+"</td><td class='email'>"+email+"</td><td class='department'>"+departmentName+"</td><td class='location'>"+locationName+"</td><td><button class='deleteEmployee' title='Delete Employee' type='button' data-toggle='modal' data-target='#deleteModal' onclick='employeeDelete(this)'><i class='bi bi-trash-fill'></i></button><button title='Edit Employee' class='editButton' data-toggle='modal' data-target='#editModal' onclick='selectEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
        }
        // Ajax call to get information for Department table
        $.ajax({
            url: "companyDirectoryLibs/Php/departments.php",
            type: "POST",
            dataType: "json",
            success: function(result){
                let departmentData = result;
                for(let i = 0; i < departmentData.length; i++){
                    let depName = departmentData[i].name;
                    let departmentLocation = departmentData[i].location;
                    let departmentId = departmentData[i].id;
                    $('#departmentTable').append("<tr id='"+departmentId+"'><td class='departmentId'>"+departmentId+"</td><td class='departmentName'>"+depName+"</td><td class='departmentLocation'>"+departmentLocation+"</td><td><button class='deleteDepartment' title='Delete Department' data-toggle='modal' data-target='#finalDeletePromptModal' onclick='deleteDepartment(this)' type='button'><i class='bi bi-trash-fill'></i></button><button title='Edit Department' class='editDepartmentButton' data-toggle='modal' data-target='#editDepartmentModal' onclick='selectDepartmentEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
                }
                // Ajax call to get information for Location table
                $.ajax({
                    url: "companyDirectoryLibs/Php/locations.php",
                    type: "POST",
                    dataType: "json",
                    success: function(result){
                        let locationData = result;
                        for(let i = 0; i < locationData.length; i++){
                            let locName = locationData[i].name;
                            let locId = locationData[i].id;
                            $('#locationTable').append("<tr departmentTableId='"+locId+"'><td class='locationId'>"+locId+"</td><td class='locationName'>"+locName+"</td><td><button class='deleteLocation' title='Delete Location' data-toggle='modal' data-target='#finalDeletePromptModal' onclick='deleteLocation(this)' type='button'><i class='bi bi-trash-fill'></i></button></td></tr>");
                        }
                    }
                });
            }
        });
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
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().startsWith(filter)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

//Adding an employee using modal form to update html table and Database
function addToTable(){
    if($('#fName').val() === '' || $('#lName').val() === '' || $('#email').val() === '' || $('#department').val() === null){
        return false;
    } else {
            $.ajax({
                url: "companyDirectoryLibs/Php/addEmployee.php",
                type: "POST",
                data: {
                    'firstName': $('#fName').val(),
                    'lastName' : $('#lName').val(),
                    'email' : $('#email').val(),
                    'departmentId' : $('#department').val()
                },
                success: function(response){
                    let responseJson = JSON.parse(response);
                    let result = responseJson.data;
                    // Data from JSON
                    let addFirstName = result.firstName;
                    let addLastName = result.lastName;
                    let addDepartment = result.department;
                    let addEmail = result.email;
                    let addLocation = result.location;
                    $('#employeeTable').append("<tr class='table-data'><td class='firstName'>"+addFirstName+"</td><td class='lastName'>"+addLastName+"</td><td class='email'>"+addEmail+"</td><td class='department'>"+addDepartment+"</td><td>"+addLocation+"</td><td><button class='deleteEmployee' title='Delete Employee' type='button' data-toggle='modal' data-target='#deleteModal' onclick='employeeDelete(this)'><i class='bi bi-trash-fill'></i></button><button title='Edit Employee' class='editButton' data-toggle='modal' data-target='#editModal' onclick='selectEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
                    sort();			
                }
            });
    }
    formClear();
}

// Adding new department using modal form to update html table and Database
function addDepartment(){
    if($('#department').val() === ''  || $('#locationId').val() === ''){
        return false;
    } else {
            $.ajax({
                url: "companyDirectoryLibs/Php/addDepartment.php",
                type: "POST",
                data: {
                    'departmentName' : $('#departmentName').val(),
                    'locationId' : $('#locationSelect').val()
                },
                success: function(response){
                    let jsonResponse = JSON.parse(response);
                    let result = jsonResponse.data;
                    // Data from JSON
                    let addDepartmentName = result.name;
                    let addDepartmentId = result.id;
                    let addDepartmentLocation = result.location;
                    $('#departmentTable').append("<tr><td>"+addDepartmentId+"</td><td>"+addDepartmentName+"</td><td>"+addDepartmentLocation+"</td><td><button class='deleteDepartment' title='Delete Department' data-toggle='modal' data-target='#deleteDepartmentModal' onclick='deleteDepartment(this)' type='button'><i class='bi bi-trash-fill'></i></button><button title='Edit Department' class='editDepartmentButton' data-toggle='modal' data-target='#editDepartmentModal' onclick='selectDepartmentEdit(this)'><i class='bi bi-pencil-square'></i></button></td></tr>");
                }
            });
        }
}

// adding new Location using modal form to update html table and Database
function addLocation(){
    if($('#locationName').val() === ''){
        return false;
    } else {
            $.ajax({
                url: "companyDirectoryLibs/Php/addLocation.php",
                type: "POST",
                data: {
                    'locationName' : $('#location').val() 
                },
                success: function(response){
                    let jsonResponse = JSON.parse(response);
                    let result = jsonResponse.data;
                    console.log(result);
                    let addLocationName = result.name;
                    let addLocationId = result.id;
                    $('#locationTable').append("<tr><td>"+addLocationId+"</td><td>"+addLocationName+"</td><td><button class='deleteLocation' title='Delete Location' data-toggle='modal' data-target='#deleteLocationModal' onclick='deleteLocation(this)' type='button'><i class='bi bi-trash-fill'></i></button></td></tr>");
                }
            });
    }
}

// getting data to fill in edit modal form then passing to Ajax to edit in Database.
let editFirstName = null;
let editLastName = null;
let editEmail = null;
let editDepartment = null;
function selectEdit(ctl){
        let _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        for(let i = 0; i < cols.length; i++){
            editFirstName = cols[0].innerHTML;
            editLastName = cols[1].innerHTML;
            editEmail = cols[2].innerHTML;
            editDepartment = cols[3].innerHTML;
        }
        $('#editFirstName').val(editFirstName);
        $('#editLastName').val(editLastName);
        $('#editEmail').val(editEmail);
        $('#editDepartment').val(editDepartment);
}

// Editing Employee. only lastname, email, department in html table and Database
function updateEmployee(ctl){
    let lastName = $('#editLastName').val();
    let email = $('#editEmail').val();
    let department = $('#editDepartment').val();
        $.ajax({
            url: "companyDirectoryLibs/Php/update.php",
            type: "POST",
            data: {
                'firstName' : editFirstName,
                'lastName': lastName,
                'email': email,
                'departmentId': department 
            },
            success: function(response){
                let employeeResponseJson = JSON.parse(response);
                let employeeJsonData = employeeResponseJson.data;
                let updateDepartmentName = employeeJsonData.department;
                let updateEmail = employeeJsonData.email;
                let updateFirstName = employeeJsonData.firstName;
                let updateLastName = employeeJsonData.lastName;
                let updateLocationName = employeeJsonData.location;
                let updateId = employeeJsonData.id;
                $("#employeeTable #" + updateId).find('.firstName').text(updateFirstName);
                $("#employeeTable #" + updateId).find('.lastName').text(updateLastName);
                $("#employeeTable #" + updateId).find('.email').text(updateEmail);
                $("#employeeTable #" + updateId).find('.department').text(updateDepartmentName);
                $("#employeeTable #" + updateId).find('.location').text(updateLocationName);
            }
        });
}

// getting form details for Department Edit modal
let editDepartmentId = null;
let editDepartmentName = null;
let editDepartmentLocation = null;
function selectDepartmentEdit(ctl){
    let _row = $(ctl).parents("tr");
    let cols = _row.children("td");
    for(let i = 0; i < cols.length; i++){
        editDepartmentId = cols[0].innerHTML;
        editDepartmentName = cols[1].innerHTML;
        editDepartmentLocation = cols[2].innerHTML;
    }
    $('#editDepartmentName').val(editDepartmentName);
    $('#editDepartmentLocation').val(editDepartmentLocation);
}

function updateDepartment(ctl){
    let editDepartmentName = $('#editDepartmentName').val();
    let editDepartmentLocation = $('#editDepartmentLocation').val();
        $.ajax({
            url: "companyDirectoryLibs/Php/updateDepartment.php",
            type: "POST",
            data: {
                'departmentId' : editDepartmentId,
                'departmentName' : editDepartmentName,
                'departmentLocationId' : editDepartmentLocation
            },
            success: function(response){
                let departmentResponseJson = JSON.parse(response);
                let departmentJsonData = departmentResponseJson.data;
                let updatedDepartmentName = departmentJsonData.name;
                let updatedDepartmentLocation = departmentJsonData.location;
                let updatedDepartmentId = departmentJsonData.id;
                $("#departmentTable #"+updatedDepartmentId).find('.departmentName').text(updatedDepartmentName);
                $("#departmentTable #"+updatedDepartmentId).find('.departmentLocation').text(updatedDepartmentLocation);
            }
        });
}

// Deleting employee from html table and Database
function employeeDelete(ctl) {
    let _row = $(ctl).parents("tr");
    let cols = _row.children("td");
    let nameFirst = null;
    let nameLast = null;
    for(let i = 0; i < cols.length; i++){
        nameFirst = cols[0].innerHTML;
        nameLast = cols[1].innerHTML;
    }
    $('#employeeDeleteBody').append("<p>Are you sure you want to <strong>DELETE</strong> Employee <strong>" + nameFirst + " " + nameLast + "?</p>");
    document.getElementById('deleteEmployeeButton').onclick = function() {
        $.ajax({
            url: 'companyDirectoryLibs/Php/remove.php',
            type: 'POST',
            data: { 
                'firstName' : nameFirst,
                'lastName' : nameLast 
            },
            success: function(response){
                $(ctl).parents("tr").remove();
            }
        });
    };  
}

// Deleting department from html table and Database
function deleteDepartment(ctl){
    let _row = $(ctl).parents("tr");
    let cols = _row.children("td");
    let idDepartment = null;
    let nameDepartment = null;
    for(let i = 0; i < cols.length; i++){
        idDepartment = cols[0].innerHTML;
        nameDepartment = cols[1].innerHTML;
    }
    $('#finalDeletePromptBody').append("Are you sure you want to <strong>DELETE</strong> Department <strong>"+nameDepartment+"</strong>? <br> Click <strong>CONFIRM</strong> to <strong>Permanantly DELETE</strong> this Department.");
    document.getElementById('finalDeletePromptButton').onclick = function() {
        $.ajax({
            url: "companyDirectoryLibs/Php/departmentDependencies.php",
            type: "POST",
            data: {
                'departmentId' : idDepartment
            },
            success: function(response){
                // checking for dependencies
                let deleteDepartmentDataJson = JSON.parse(response);
                let deleteDepartmentData = deleteDepartmentDataJson.data;
                console.log(deleteDepartmentData);
                let dependencies = deleteDepartmentData.pc;
                if(dependencies === 0){ // if no dependencies remove the department from HTML and database
                    $('#deleteDepartmentModal').modal('show');
                    $('#departmentDeleteBody').append("Are you sure you want to <strong>DELETE</strong> Department <strong>"+nameDepartment+"</strong>?");
                    document.getElementById("deleteDepartmentButton").onclick = function(){
                        $.ajax({
                            url: "companyDirectoryLibs/Php/removeDepartment.php",
                            type: "POST",
                            data: {
                                'departmentId' : idDepartment
                            },
                            success: function(response){
                                $(ctl).parents("tr").remove();       
                            }
                        });  
                    };
                } else { // if there are dependencies then show the cannot delete modal and stop removal of department
                    $('#cannotDeleteModal').modal('show');
                    $('#cannotDeleteBody').append("<p>Cannot <strong>DELETE</strong> Department <strong>" + nameDepartment + "</strong> Because <strong>"+ nameDepartment +"</strong> has <strong>"+ dependencies +" Dependencies.</strong></p>");
                }
            }
        });
    };
}

//Deleteing Location from html table and Database
function deleteLocation(ctl){
    let _row = $(ctl).parents("tr");
    let cols = _row.children("td");
    let nameLocation = null;
    let idLocation = null;
    for(let i = 0; i < cols.length; i++){
        idLocation = cols[0].innerHTML;
        nameLocation = cols[1].innerHTML;
    }
    $('#finalDeletePromptBody').append("Are you sure you want to <strong>DELETE</strong> Location <strong>"+nameLocation+"</strong>? <br> Click <strong>CONFIRM</strong> to <strong>Permanantly DELETE</strong> this Location.");
    document.getElementById('finalDeletePromptButton').onclick = function() {
        $.ajax({
            url: "companyDirectoryLibs/Php/locationDependencies.php",
            type: "POST",
            data: {
                'locationId' : idLocation  
            },
            success: function(response){
                // checking for dependencies
                let deleteLocationDataJson = JSON.parse(response);
                let deleteLocationData = deleteLocationDataJson.data;
                console.log(deleteLocationData);
                let dependencies = deleteLocationData.pc;
                if(dependencies === 0){ // if there are none then remove the HTML row and delete from the database
                    $('#deleteLocationModal').modal('show');
                    $('#locationDeleteBody').append("Are you sure you want to <strong>DELETE</strong> Location <strong>"+nameLocation+"</strong>?");
                    document.getElementById("deleteLocationButton").onclick = function(){
                        $.ajax({
                            url: "companyDirectoryLibs/Php/removeLocation.php",
                            type: "POST",
                            data: {
                                'locationId' : idLocation
                            },
                            success: function(response){
                                $(ctl).parents("tr").remove();       
                            }
                        });   
                    };
                } else { // if there are dependencies then show this modal and dont remove
                    $('#cannotDeleteModal').modal('show');
                    $('#cannotDeleteBody').append("<p>Cannot <strong>DELETE</strong> Location <strong>" + nameLocation + "</strong> Because <strong>"+ nameLocation +"</strong> has <strong>"+ dependencies +" Dependencies.</strong></p>");
                }
            }
        });
    };
}

// clearing the modals for next clicked.
$('#deleteModal').on("hidden.bs.modal", function(e){
    $('#employeeDeleteBody').html('');
});
$('#deleteDepartmentModal').on("hidden.bs.modal", function(e){
    $('#departmentDeleteBody').html('');
});
$('#deleteLocationModal').on("hidden.bs.modal", function(e){
    $('#locationDeleteBody').html('');
});
$('#addModal').on("hidden.bs.modal", function(e){
    $('#newEmployeeForm').trigger("reset");
});
$('#addDepartmentModal').on("hidden.bs.modal", function(e){
    $('#newDepartmentForm').trigger("reset");
});
$('#addLocationModal').on("hidden.bs.modal", function(e){
    $('#newLocationForm').trigger("reset");
});
$('#cannotDeleteModal').on("hidden.bs.modal", function(e){
    $('#cannotDeleteBody').html('');
});
$('#finalDeletePromptModal').on("hidden.bs.modal", function(e){
    $('#finalDeletePromptBody').html('');
});

//Sorting table alphabetically by first name
function sort(){
    let myTable = $('#employeeTable');
    let tableRows = myTable.find(".table-data");
    tableRows.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    });
    $.each(tableRows, function(idx, itm) { myTable.append(itm); 
    });
}

// Preloader
let myLet;

function loadFunction(){
    mylet = setTimeout(showPage, 1000);
}

function showPage(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "flex";
}