<?php
    require_once "db.php";
    
    $sql="SELECT * FROM contacts_user ORDER BY family ASC, name ASC, surname ASC";
    $query = $DB->prepare($sql);
    $query->db_execute();
    
    $result = array(
        'Items' => array()
    );
    
    while ($contact = $query->fetch())
        $result['Items'][] = $contact;
    
    echo json_encode($result, JSON_NUMERIC_CHECK);
?>