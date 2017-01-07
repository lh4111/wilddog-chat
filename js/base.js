var BASE_NOOD = "https://hugemessage.wilddogio.com";
var ref = new Wilddog(BASE_NOOD);
var authData = ref.getAuth();
var user_ref = ref.child("user");
var cur_user = null;

(function(){

	var HugeChat = function(){

		this.login = function(type){
			if (type == "password") {
			    ref.authWithPassword({
			            email: $("#email").val(),
			            password: $("#password").val()
			        },function(err, data) {
			            if (err != null) {
			                $("#loginFaileMsg").show().text(err.message);
			                $("#login").modal('show');
			            }
			    });
			}else{
			    ref.authWithOAuthRedirect (type,function(err,auth){
			        if(err == null){

			        } else {
			            $("#loginFaileMsg").show().text(err.message);
			            $("#login").modal('show');
			        }    
			    })
			}
		}

		this.reg = function(){
        	ref.createUser({
                email: $("#reg_email").val(),
                password: $("#reg_password").val()
            },function(err, data) {
                if (err != null) {
                    $("#regFaileMsg").show().text(err.message);
                    $("#reg").modal('show');
                } else {
                    var _user = {
                        uid: data.uid,
                        username: $("#reg_nickname").val(),
                        avatar: 'images/avatar/matt.jpg'
                    }
                    var userNode = user_ref.child(data.uid);
                    userNode.set(_user);
                }

            })
    	}

    	this.logout = function (){
    		ref.unauth();
    	}

    	this.changeToReg = function(){
	        $('#login').modal('hide');

	        setTimeout(function() {
	            $('#reg').modal('show');
	        }, 300)
    	}
	}


	window.hugeChat = new HugeChat();

})()