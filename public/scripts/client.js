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
    //var $ti = $('<td class="table"></td>');

    var $thisTask = ('<td class="task">'+ task.task +'</td>')

    console.log('taskcomplete', task.complete);

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
// console.log($checkBox.data('id'));
    //$checkBox.data('id', task.id);
          //   $tableRow.append($checkBox.prop('checked', true)) && ('$thisTask').addClass('checkedline');
        // }
        // else{
        //   $tableRow.append($checkBox.prop('checked', false)) //&& $('.task').removeClass('checkedline');
        // }
    // $tableRow.append($thisTask);
    var $deleteButton = $('<td><button class="delete" data-id="'+ task.id +'">Delete</button></td>');
    // $deleteButton.data('id', task.id);
    $tableRow.append($deleteButton);
    //  $deleteButton.data('id', task.id);

    //$tableRow.append($ti);
    $list.append($tableRow);
  });
}

function deleteTask(event){
  event.preventDefault();
  var taskId = $(this).data('id');
  var $deleteConfirm = confirm('Are you sure you want to delete?');

  console.log(taskId);
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

//this should send new value of checkbox
function checkComplete(event){
  event.preventDefault();
  //console.log($(this));
  var $clickButton = $(this).is(':checked');

  console.log($clickButton);
  // if($clickButton == true){
  //   $clickButton =!$clickButton
  // }else {
  //   $clickButton=$clickButton
  // }

console.log($(this).data('id'));


  var data = {complete: $clickButton};
  console.log(data);

  $.ajax({
    type: 'PUT',
    url: '/todo/' + $(this).data('id'),
    data: data,
    success: getTasks
  });

}
