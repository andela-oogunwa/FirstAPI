var githubCheck = {
  toSearch: "https://api.github.com",
  
  first: function () {
    githubCheck.start();
    githubCheck.keyPress();
  },

  start: function () {
    $("#userSearch").click(function() {
      var nameUser = $("#username").val();
          githubCheck.search(nameUser);
          $("#username").val('')
    });
  },

  keyPress: function() {
    $("#username").keydown(function(e){
        if(event.keyCode === 13) {
          var nameUser = $("#username").val();
          githubCheck.search(nameUser)
          $("#username").val('');
        }
      });
  },

  search: function (username) {
    $('#repos').html('');
    $('#error').hide();
    $.getJSON(this.toSearch+"/users/"+username, function (response) {
      // console.log(response);
      var avatar = response.avatar_url,
          followers = "<li>Followers: "+response.followers+"</li>",
          following = "<li>Following: "+response.following+"</li>",
          repos = "<li>Repositories:"+response.public_repos+"</li>",
          repoUrl = response.repos_url;
      $("#images").html("<img src="+avatar+"/>");
      $("#follow").html("<ul>" + followers + following + repos + "</ul>");
      githubCheck.getRepo(repoUrl);

   }).fail(function(error) {
        if(error.status === 403) {
          $("#error").html('<p>Please try again later</p>').show();
        }
        else if(error.status === 404) {
          $("#error").html('<p>Username not found</p>').show();
        }
        else{
          $("#error").html('<p>No match found</p>').show();
          $("#repos").empty();
        }
    });  
  },

  
  getRepo: function (repoUrl) {
    var repositories ;
    $.getJSON(repoUrl, function (response) {
      $.each(response, function( i ) {
           console.log(i);
            $('#repos').append("<ul><li><a href="+ response[i].html_url + " target='_blank'>" + response[i].name + "</a></li></ul>");
        });
    });
  }
};

$(document).ready(function(){
  githubCheck.first();
});
