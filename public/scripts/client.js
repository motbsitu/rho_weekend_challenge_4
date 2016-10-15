$(function(){
  getTasks();
  $('#taskEntry').on('submit', addTask);
  $('#taskList').on('click', '.delete', deleteTask);

  $('#taskList').on('change', ':checkbox', checkComplete);
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

  $(this).find('input').val('');
}

function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: displayTasks
  });
}

function displayTasks(response){
//  console.log(response);
  var $list = $('#taskList');
  $list.empty();

  response.forEach(function(task){
    var $tableRow = $('<tr class="table"></tr>');
    var $ti = $('<td class="table"></td>');

    $ti.append('<td class="task">'+ task.task +'</td>');
    //something if value = true, it is checked, if false it is not

    var $checkBox = $('<input class="toggle" type="checkbox" name="taskComplete" value="'+ task.complete +'"/>');
    $checkBox.data('id', task.id);
      if(task.complete == true){
          $ti.append($checkBox.prop('checked', true)) //&& $('.task').addClass('checkedline');
        }
        else{
          $ti.append($checkBox.prop('checked', false)) //&& $('.task').removeClass('checkedline');
        }

    var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $ti.append($deleteButton);

    $tableRow.append($ti);
    $list.append($tableRow);
  });
}

function deleteTask(event){
  event.preventDefault();
  var $deleteConfirm = confirm('Are you sure you want to delete?');

  if ($deleteConfirm == true){
    var taskId = $(this).data('id');
  }else {
    return;
  }



  $.ajax({
    type: 'DELETE',
    url: '/todo/' + taskId,
    success: getTasks
  });
}

//this should send new value of checkbox
function checkComplete(event){
  event.preventDefault();

  console.log(event);
  var $taskId = $(this).data('id');
  console.log('taskId in checkComplete', taskId);


  //if checked send value true to database, if not checked send false
  // if

  $.ajax({
    type: 'PUT',
    url: '/todo/' + $taskId,
    success: displayTasks
  });

}
