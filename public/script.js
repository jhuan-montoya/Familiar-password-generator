$("#passwo").hide()
$(".part-1").hide()
$(".part-2").hide()
$(".part-3").hide()
$(".part-4").hide()
var count = 0
var responses = {
  part1: "1",
  part2: "2",
  part3: "3",
  part4: "4",
}

$("#next").click(function() {
  $("#next").show()
  console.log(count)
  count = count + 1
  $(".part-" + (count - 1)).hide()
  $(".part-" + count).show()

  if (count >= 4) {
    $("#next").hide()
    $("#send").show()
    $("#again").show()
  }
})

$("#again").click(function() {
  count = 0
  $(".part-4").hide()
  $("#next").show()
  $("#passwo").hide()
})

$("#send").click(function() {
  responses['part1'] = $("#word1").val()
  responses['part2'] = $("#word2").val()
  responses['part3'] = $("#word3").val()
  responses['part4'] = $("#word4").val()
  var settings = {
    "url": "/generatenew",
    "method": "post",
    "timeout": 0,
    "data": JSON.stringify(responses),
    "headers": {
      "Content-Type": "application/json"
    },
  };
  $.ajax(settings).done(function(response) {
    $("#passwo").show()
    $("#copyinput").val(response)

  });
  $("#send").text("Re-generate")
})

new ClipboardJS('#copy');