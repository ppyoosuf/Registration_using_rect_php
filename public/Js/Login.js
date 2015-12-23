/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Login_Form=React.createClass({
    getInitialState:function()
    {

        return {msg:"",class_msg:""}
    },
    
   handleSubmit:function(e)
   {
     e.preventDefault();
      
      var email=this.refs.email.getDOMNode().value.trim();
      var password=this.refs.password.getDOMNode().value.trim();
$.ajax({url:this.props.url,
                type:'post',
               
                data: {
                    action:"login",
                    email: email,
                    password: password
                    
                    },
                success:function(data)
                {
                    
                  
                    if(data=='true')
                        {
                        this.setState({msg:"Login Suceess"});
                        this.setState({class_msg:"success"});
                        }
                    else
                        {
                        this.setState({msg:"Invalid Email or Password"}); 
                        this.setState({class_msg:"error"});
                        }
                                                
                }.bind(this)
               
           
            });

   },

 
render:function(){
        
                       
        return(
                <form  id="register_form" onSubmit={this.handleSubmit} >
                    
                    <label>Email<span className="mandatory">*</span></label>
                    <input type="text"  ref="email"  name="email" ></input>
                    <label>Password<span className="mandatory">*</span></label>
                    <input type="password" ref="password"  name="password" ></input>
                    <span className={this.state.class_msg}>{this.state.msg}</span>
                    <input type="submit" value="Login" className="btn btn-primary" ></input>
                    <a href="forgotpassword.html" className="col-mid-3">Forgot Password</a>  
                    <a href="register.html" className="col-md-offset-3 col-mid-3">New User</a>

                </form>
     
            );
            
    },   
  
    
});

React.render(<Login_Form  url="API/Register.php"/>, document.getElementById("container"));
