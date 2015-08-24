<?php
  $db_host = 'localhost';
  $db_name = 'contacts';
  $db_user = 'root';
  $db_pass = 'VKI70xCNdt';
  $db_charset = 'utf8';
  
  class DB extends PDO {
    function __construct($dsn, $username="", $password="", $driver_options=array()) {
      parent::__construct($dsn,$username,$password, $driver_options);
      $this->setAttribute(PDO::ATTR_STATEMENT_CLASS, array('DBStatement', array($this)));
    }
  }
    
  class DBStatement extends PDOStatement {
    public $dbh;
    
    protected function __construct($dbh) {
      $this->dbh = $dbh;
    }
    
    public function db_execute($params){
      try 
      {
        return $this->execute($params);
      }
      catch (PDOException $e) 
      {
        header("HTTP/1.0 500 Internal Server Error");
        die('{"ERROR_CODE": "SERVER_ERROR", "ERROR_DESCRIPTION": "'.$e->getMessage().'"}');
      }
    }
  }
    
  $db_opt = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );

  $dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";
  
  try 
  {
    $DB = new DB($dsn, $db_user, $db_pass, $db_opt);
  }
  catch (PDOException $e) 
  {
    header("HTTP/1.0 500 Internal Server Error");
    die('{"ERROR_CODE": "ERROR_CONNECTION_DB", "ERROR_DESCRIPTION": "'.$e->getMessage().'"}');
  }
?>