<?php
    require_once "db.php";
    
    if($_GET['id'])
    {
        $sql = "SELECT * FROM contacts_user WHERE id = :id";
        $query = $DB->prepare($sql);
        $query->bindParam(':id', $_GET['id']);
        
        $query->db_execute();
        
        echo json_encode($query->fetch(), JSON_NUMERIC_CHECK);
    }
?>