/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function validateEmail(email) {

   var re = /\S+@\S+\.\S+/;
    return re.test(email);
    }
    
    
var Forgot_pass=React.createClass({
    getInitialState:function()
    {

return {msg:"",class_msg:"error"}
    },
    
   handleSubmit:function(e)
   {
     e.preventDefault();
      
      var email=this.refs.email.getDOMNode().value.trim();
      if(email=="")
          {
          this.setState({msg:"Please Enter Email Id"});
          this.setState({class_msg:"error"});
          return false;
          }
      if(!validateEmail(email))
          {
                this.setState({msg:"Invalid Email Id"});
                this.setState({class_msg:"error"});
                return false;
          }
      
        $.ajax({url:this.props.url,
                type:'post',
               
                data: {
                    action:"forgot",
                    email: email,
                    
                    },
                success:function(data)
                {

                    if(data=='true')
                        {
                        this.setState({msg:"Email Successfully sended"});
                        this.setState({class_msg:"success"});
                        
                        }
                    else
                        {
                        this.setState({msg:"Not found this email in our record"}); 
                        this.setState({class_msg:"error"});
                        }
                                                
                }.bind(this)
               
           
            });

   },

 
render:function(){
        
                       
        return(
                <form  id="forgot_form" onSubmit={this.handleSubmit} >
                    
                    <label>Email<span className="mandatory">*</span></label>
                    <input type="text"  ref="email"  name="email" ></input>
                    <span className={this.state.class_msg}>{this.state.msg}</span>
                    
                    <input type="submit" value="Submit" className="btn btn-primary"></input>
                    <br></br>
                    <br></br>
                    

                </form>
     
            );
            
    }  
  
    
});

React.render(<Forgot_pass  url="API/Register.php"/>, document.getElementById("container"));
