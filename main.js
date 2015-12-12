$(function() {
	var app_Id = '1650320898589218';
	var scopes = 'email, user_friends, user_online_presence';

	var botton = '<a href="#" id="login" class="btn btn-primary"> Iniciar sesion </a>';
	var div_session = "<div id ='facebook-session'>"+
	                  "<strong></strong>"+
	                  "<img>"+
	                  "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesion</a>"+
	                  "</div>";


	      window.fbAsyncInit = function() {
         FB.init({
            appId      : app_Id,
            status     : true,
            cookie     : true,
            xfbml      : true,  
         });

       FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function() {
        });
       });

    };
    var statusChangeCallback = function(response, callback) {
    	console.log(response);
    if (response.status === 'connected') {
    	 getFacebookData();
    } else {
    	 callback(false);
      
    }
  }


     var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  var getFacebookData = function()
  {
  	FB.api('/me', function(response) {
      $('#login').after(div_session)
      $('#login').remove();
      $('#facebook-session strong').text("Bienvenido: "+response.name)
      $('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large')
  });
  }

  var facebookLogin = function() {
  	checkLoginState(function(response){
  		if (!response) {
  			FB.login(function(response) {
  				if (response.status === 'connected')
  					getFacebookData();
  			}, {scope: scopes});
  		}
  	})

  }

    $(document).on( 'click', '#login', function(e){
     e.preventDefault();

     facebookLogin();
    })


})