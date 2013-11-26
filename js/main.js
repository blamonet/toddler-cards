var dictionary = [];
var dictionary_by_category = [];
var category = 'all';

var currentWord = 0;

function playSound() {
  var audio = $("#mysoundclip")[0];
  audio.play();
}

function nextWord() {
  var newWord = currentWord;
  var sound = "";
  var sound_audio_tag = "";
  var dictionary_length = "";
  if (category == "all") {
    dictionary_length = dictionary.length;
  } else {
    dictionary_length = dictionary_by_category.length;
  }
  if (dictionary_length > 1) {
    while (newWord == currentWord) {
      if (category == "all") {
        newWord=Math.floor(Math.random()*dictionary.length);
      } else {
        newWord=Math.floor(Math.random()*dictionary_by_category.length);
      }
    }
  } else {
    newWord = 0;    
  }
  currentWord = newWord;
  var entry;
  if (category == "all") {
    entry = dictionary[currentWord];
  } else {
    entry = dictionary_by_category[currentWord];
  }
  var image = entry.img[Math.floor(Math.random()*entry.img.length)];
  if (entry.sound && entry.sound.length > 0) {
    var sound_audio_tag = "<audio id=\"mysoundclip\" preload=\"auto\"><source src=\"sounds/" + entry.sound[0] + "\"></source></audio>"
    var sound = "<button class=\"btn btn-primary\" onclick=\"playSound()\"><i class=\"icon icon-bell\"></i>";
  }
  $(".word").html(entry.title + " " + sound + sound_audio_tag);
  $(".wordImage img").attr("src","img/" + image);
}

function populateCategoryDictionary() {
    dictionary_by_category = [];
    if (category == "all") {
      dictionary_by_category = dictionary;
    } else {
      $.each(dictionary, function(i, item) {
        $.each(item.category, function(j, _category) {
          if (_category == category) {
            dictionary_by_category.push(item);
          }
        });
      });
    }
    $(".categorySelector").blur();
    nextWord();
}

function addCategory(categoryName) {
  var option = "<option>" + categoryName + "</option>";
  $(".categorySelector").append(option);
}

function categoryInList(categoryName) {
  var found = 0;
  $(".categorySelector > option").each(function() {
    if (this.text == categoryName) {
      found = 1;
    }
  });
  return found;
}

$(document).ready(function() {
  $(".categorySelector").append('<option>all</option>');
  $.getJSON("items.json", function (data) {
    dictionary = data.dictionary;
    $.each(dictionary, function(i, item) {
      $.each(item.category, function(j, _category) {
        if (!categoryInList(_category)) {
          addCategory(_category);
        }
      });
    });
    nextWord();
  });
  $(".categorySelector").change(function() {
     category = $(".categorySelector option:selected").text();
     populateCategoryDictionary();
  });
});

$(document).keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { // space
     playSound();
  }
  if (code == 32) { // enter
    nextWord();
  }
});
