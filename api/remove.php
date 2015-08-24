<?php
    require_once "db.php";
    
    if ($_POST['id'])
    {
        $sql="DELETE FROM contacts_user WHERE id = :id";
        $query = $DB->prepare($sql);
        $query->bindParam(':id', $_POST['id']);
        
        $query->db_execute();
    }
?>