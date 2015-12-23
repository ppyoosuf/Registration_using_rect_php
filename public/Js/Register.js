/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function validateEmail(email) {
   var re = /\S+@\S+\.\S+/;
    return re.test(email);
    }



var Register_Form=React.createClass({
    getInitialState:function()
    {
        return{

            username: "", 
            email: "",
            password: "",
            c_password: "",
            is_success:"null",
            cls_sucess:"",
            errors: {}
        }


    },
    

 handleSubmit: function (e) {
     e.preventDefault();

    var errors = this.validate();
   
    if(Object.keys(errors).length != 0)  {
      this.setState({
        errors: errors
      });
      
      return false;
      
    }
      else
          {
          this.setState({errors:errors});
   
      $.ajax({url:this.props.url,
                type:'post',
                
                data: {
                    action:"register",
                    username:this.state.username,
                    email: this.state.email,
                    password: this.state.password
                    
                    },
                success:function(data)
                {
                     
                    if(data=='False')
                        {
                        this.setState({is_success:false});
                         this.setState({cls_sucess:"error"});
                        }
                    else
                        {
                        
                        this.refs.register_form.getDOMNode().reset();
                        this.setState(this.getInitialState());
                        this.setState({is_success:true});
                        this.setState({cls_sucess:"success"});
                        }
                }.bind(this)        
                        
               
                
            });
    return true;
          }
  },

render:function(){

        var msg_result="";

        if(this.state.is_success==false)
            msg_result="Email Id Already Exist";
        else if(this.state.is_success==true)
            msg_result="Successfully Registered";
                       
        return(
                <form ref="register_form" method="post" className="form-horizontal" id="register_form" onSubmit={this.handleSubmit} >
                    <label className="">Name<span className="mandatory">*</span></label>
                    <input type="text" ref="username" name="username" onChange={this.onChange}></input>
                    <span className="error">{this.state.errors.username}</span>
                    <label>Email<span className="mandatory">*</span></label>
                    <input type="text"  ref="email" name="email" onChange={this.onChange}></input>
                    <span ref="isvalid" className="error">{this.state.errors.email}</span>
                    <label>Password<span className="mandatory">*</span></label>
                    <input type="password" ref="password" name="password" onChange={this.onChange}></input>
                    <span className="error">{this.state.errors.password}</span>
                    <label>Confirm Password<span className="mandatory">*</span></label>
                    <input ref="conf_password" name="c_password" type="password"  onChange={this.onChange}></input>
                    <span className="error">{this.state.errors.c_password}</span>
                    <input type="submit" className="btn btn-primary" value="Register"></input>
                    <br></br>
                    <a href="Login.html">Already Registered User ! Login</a>
                    <br></br>
                    <span className={this.state.cls_sucess}>{msg_result}</span>
                </form>
     
            );
            
    },   
   
  onChange: function (e) {
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);

  },
   validate: function () {
    var errors = {};
    if(this.state.username == "") {
      errors.username = "Name is required";
    }
    if(this.state.email == "") {
      errors.email = "Email is required";
    }
    if(this.state.password == "") {
      errors.password = "Password is required";
    }
    if(this.state.password == "") {
      errors.c_password = "Confirm Password is required";
    }
    
    if(!validateEmail(this.state.email) && typeof errors.email === 'undefined'){
      errors.email = "invalid Email";
    }
    
  
    if(this.state.password.length <6 && typeof errors.password === 'undefined'){
        errors.password = "Password shold be atleast 6 characters";
    }
    if(this.state.password!=this.state.c_password && typeof errors.c_password === 'undefined'){
        errors.c_password = "Password shold be match";
    }

    return errors;
  },   
  
});




React.render(<Register_Form url="API/Register.php" />, document.getElementById("container"));
