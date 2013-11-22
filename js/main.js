var dictionary = {};
var currentWord = 0;
function playSound() {
  var audio = $("#mysoundclip")[0];
  audio.play();
}
function nextWord() {
  var newWord = currentWord;
  while (newWord == currentWord) {
    newWord=Math.floor(Math.random()*dictionary.length);
  }
  currentWord = newWord;
  var entry = dictionary[currentWord];
  var sound = "";
  var sound_audio_tag = "";
  if (entry.sound && entry.sound.length > 0) {
  var sound_audio_tag = "<audio id=\"mysoundclip\" preload=\"auto\"><source src=\"sounds/" + entry.sound[0] + "\"></source></audio>"
  var sound = "<button class=\"btn btn-primary\" onclick=\"playSound()\"><i class=\"icon icon-bell\"></i>";
  }
  $(".word").html(entry.title + " " + sound + sound_audio_tag);
  var image = entry.img[Math.floor(Math.random()*entry.img.length)];
  $(".wordImage img").attr("src","img/" + image);
}
function addCategory(categoryName) {
  var option = "<option>" + categoryName + "</option>";
  $(".categorySelector").append(option);
}
$(document).ready(function() {
    $(".categorySelector").append('<option>all</option>');
    $.getJSON("items.json", function (data) {
      dictionary = data.dictionary;
      $.each(dictionary, function(i, item) {
        $.each(item.category, function(j, category) {
            addCategory(category);
        });
      });
      currentWord=Math.floor(Math.random()*dictionary.length);
      var entry = dictionary[currentWord];
      var sound = "";
      var sound_audio_tag = "";
      if (entry.sound && entry.sound.length > 0) {
      var sound_audio_tag = "<audio id=\"mysoundclip\" preload=\"auto\"><source src=\"sounds/" + entry.sound[0] + "\"></source></audio>"
      var sound = "<button class=\"btn btn-primary\" onclick=\"playSound()\"><i class=\"icon icon-bell\"></i>";
      }
      $(".word").html(entry.title + " " + sound + sound_audio_tag);
      var image = entry.img[Math.floor(Math.random()*entry.img.length)];
      $(".wordImage img").attr("src","img/" + image);
    });
  });
  $(document).keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode or space
      playSound();
    }
    if (code == 32) {
      nextWord();
    }
  });
