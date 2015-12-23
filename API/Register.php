<?php



include_once 'connection.php';

class Api_Register
{
    private $db;
    
    public function  __construct()
    {
        $this->db=new mysqli(SERVER, USERNAME,PASSWORD,DB);
        if(!$this->db)  
            echo 'Error';
    }
    
    public function processApi(){
       
        $func=str_replace("/", "",$_REQUEST['action']);
        if(method_exists($this,$func))
				$this->$func();
        
    }
    public function login()
    {
            
            $result=$this->db->query("select * from tbl_user where email='".$_REQUEST['email']."' and password='".md5($_REQUEST['password'])."'");
            if($result->num_rows > 0)
            {
                echo 'true';
                exit();
            }
            
            else 
            {
                echo 'FALSE';  
                exit();
            }
          
    }
    public function register()
    {
        $result=$this->db->query("SELECT * FROM TBL_USER WHERE EMAIL='$_REQUEST[email]'");
            if($result->num_rows > 0)
            {
                echo 'False';
                exit();
            }
 else {
            $this->db->query("INSERT INTO TBL_USER(USER_NAME,EMAIL,PASSWORD) VALUES('".$_REQUEST["username"]."','".$_REQUEST["email"]."','".md5($_POST["password"])."')");
            echo 'true';
            exit();
 }
    }
    public function forgot()
    {
         $result=$this->db->query("select * from tbl_user where email='".$_REQUEST['email']."'");
            if($result->num_rows <= 0)
            {
                echo 'false';
                exit();
            }
            else {
                   
            define('URL_PROTOCOL', 'http://');
            define('URL_DOMAIN', $_SERVER['HTTP_HOST']);
            define('URL_SUB_FOLDER',dirname($_SERVER['SCRIPT_NAME']));
            define('URL', URL_PROTOCOL . URL_DOMAIN . URL_SUB_FOLDER);
            
            $row=  mysqli_fetch_array($result);

            $token=  md5(uniqid($row["EMAIL"]));
            $this->db->query("insert into tbl_forgot_pass(user_id,token,time) values('$row[ID]','$token','$_SERVER[REQUEST_TIME]')");
            $email=$_REQUEST['email'];
            $subject='Login Information';
            $message='Hi Customer\n';
            $message+='You can reset your password by this link\n';
            $message=URL.'/reset.html?token='.$token;
            $from= 'From: pp.yoosuf@example.com';

            mail($email, $subject, $message);
               echo 'true'; 
               exit();
            }
    }
    public function reset()
    {
          $result=$this->db->query("SELECT * FROM tbl_forgot_pass where TOKEN='$_REQUEST[token]'");
            if($result->num_rows >0)
            {
                $row=  mysqli_fetch_array($result);
                $id=$row["USER_ID"];
                $this->db->query("UPDATE tbl_user SET PASSWORD='".md5($_REQUEST[password])."' where ID=$id");
                $this->db->query("DELETE  FROM tbl_forgot_pass where TOKEN='$_REQUEST[token]'");
            }
            else
            {
                echo 'false';
                exit();
            }
    }
}

$register=new Api_Register();
$register->processApi();

?>
