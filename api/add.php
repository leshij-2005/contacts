<?php
    require_once "db.php";
    
    if ($_POST['name'] && $_POST['phone'])
    {
        $createDate = date('Y-m-d h:i:s');
        $sql = "INSERT INTO contacts_user (name, surname, family, phone, email, createDate) VALUES (:name, :surname, :family, :phone, :email, :createDate)";
        $query = $DB->prepare($sql);
        $query->bindParam(':name', $_POST['name']);
        $query->bindParam(':surname', $_POST['surname']);
        $query->bindParam(':family', $_POST['family']);
        $query->bindParam(':phone', $_POST['phone']);
        $query->bindParam(':email', $_POST['email']);
        $query->bindParam(':createDate', $createDate);
        
        $query->db_execute();
    }
?>