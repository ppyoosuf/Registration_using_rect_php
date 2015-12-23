/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var Reset=React.createClass({
    getInitialState:function()
    {

return {msg_class:"",msg:"",errors: {},password:"",c_password:"",token_id:getParameterByName("token")}
    },
    
   handleSubmit:function(e)
   {
     e.preventDefault();
   
     var errors = this.validate();
    if(Object.keys(errors).length != 0) {
      this.setState({
        errors: errors
      });
      return false;
    }
      else
          {
     
          this.setState({errors: errors});
     
var password=this.refs.password.getDOMNode().value.trim();

        $.ajax({url:this.props.url,
                type:'post',
               
                data: {
                    action:"reset",
                    password: password,
                    token:this.state.token_id
                    
                    },
                success:function(data)
                {
                   if(data=='false')
                       {
                        this.setState({msg:"Invalid unique Link"});
                        this.setState({msg_class:"error"});
                       }
                    else{
                        this.setState({msg:"Password Resetted successfully"});
                        this.setState({msg_class:"success"});
                    }
                    
                                                
                }.bind(this)
               
           
            });
          }
   },

validate: function () {
    var errors = {}
    
    if(this.state.password == "") {
      errors.password = "Password is required";
    }
    if(this.state.c_password == "") {
      errors.c_password = "Confirm Password is required";
    }
    
    if(this.state.password.length <6 && typeof errors.password ==='undefined' ) {
      errors.password = "Password Should be atleast 6 characters";
    }
    if(this.state.c_password !=this.state.password && typeof errors.c_password ==='undefined' ) {
      errors.c_password = "Password Should be match";
    }
    return errors;
  },   
  onChange: function (e) {
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);
   
  },

render:function(){
        var msg_valid
            if(this.state.token_id==="")
             {msg_valid="Note:  Open this  page through email link"
                 
             }
        return(
                
                <form  id="forgot_form" method="post" onSubmit={this.handleSubmit} >
            
                <span className="error">{msg_valid}</span>
             
                    <label>Password<span className="mandatory">*</span></label>
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <input type="password" ref="password" onBlur={this.checkPass} name="password" onChange={this.onChange}></input>
                    <span className="error">{this.state.errors.password}</span>
                    <label>Confirm Password<span className="mandatory">*</span></label>
                    <input ref="conf_password" type="password" name="c_password" onChange={this.onChange}></input>
                    <span className="error">{this.state.errors.c_password}</span>
                    <input type="submit" className="btn btn-primary" value="Reset Password"></input>
                    
                    <br></br>
                    <a href="Login.html">Already Registered User ! Login</a>
                    <br></br>
                    <span className={this.state.msg_class}>{this.state.msg}</span>
                      <br></br>
                    <br></br>
                </form>
   
            );
            
    }  
  
    
});

React.render(<Reset  url="API/Register.php"/>, document.getElementById("container"));
