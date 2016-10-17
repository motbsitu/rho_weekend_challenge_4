$(function(){
  getTasks();
  $('#taskEntry').on('submit', addTask);
  $('#taskList').on('click', '.delete', deleteTask);
  $('#taskList').on('change', '.toggle', checkComplete);
});

function addTask(){
  event.preventDefault();

  var taskData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taskData,
    success: getTasks
  });
}

function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: displayTasks
  });
}

function displayTasks(response){
  var $list = $('#taskList');
  $list.empty();

  response.forEach(function(task){
    var $tableRow = $('<tr class="table"></tr>');
    var $thisTask = ('<td class="task">'+ task.task +'</td>')

    console.log('taskcomplete', task.complete);

    //creates a var for the checkbox, then appends both the checkbox and the task to
    // the table row in the DOM, with checkbox checked if the complete boolean value
    //is true, or not checked if value is false. Also assigns database id to each
    var $checkBox = $('<td><input class="toggle" type="checkbox" name="taskComplete" value="'+ task.complete + '" data-id="' + task.id + '"/></td>');

      if(task.complete == true){
          $tableRow.append('<td class="task checkedline" data-id="'+ task.id +'">'+ task.task +'</td>');
          $checkBox.children('input').prop('checked', true);
          $tableRow.append($checkBox);

        }else{
          $tableRow.append('<td class="task" data-id="'+ task.id +'">'+ task.task +'</td>');
          $checkBox.children('input').prop('checked', false);
          $tableRow.append($checkBox);
        }
    //appends a delete button to the table row and assigns database id to it
    var $deleteButton = $('<td><button class="delete" data-id="'+ task.id +'">Delete</button></td>');
    $tableRow.append($deleteButton);

    $list.append($tableRow);
  });
}

function deleteTask(event){
  event.preventDefault();
  var taskId = $(this).data('id');
  var $deleteConfirm = confirm('Are you sure you want to delete?');

  //confirm alert displayed to confirm that user wants to delete
  if ($deleteConfirm == true){
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + taskId,
      success: getTasks
    });
  }else {
    return;
  }
}


function checkComplete(event){
  event.preventDefault();

  //click event changes checkbox current boolean value
  //sends value to database
  var $clickButton = $(this).is(':checked');
  var data = {complete: $clickButton};
  console.log(data);

  $.ajax({
    type: 'PUT',
    url: '/todo/' + $(this).data('id'),
    data: data,
    success: getTasks
  });

}
