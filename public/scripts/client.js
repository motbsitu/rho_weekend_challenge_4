$(function(){
  getTasks();
  $('#taskEntry').on('submit', addTask);
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

    $ti.append('<td class="table">'+ task.task +'</td>');
    $ti.append('<td class="table"><input type="checkbox" name="taskComplete" value="'+ task.complete +'"/></td>');



    $tableRow.append($ti);
    $list.append($tableRow);
  });
}
