<?php

include("db.php");
$suId = $_SESSION['uId'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(!isset($_POST['action'])){
        exit;
    }
    // -================-=======================-0-=-===============-=-=
    if($_POST['action'] == 'addQuote'){
        $qtitle = $_POST['title'];
        $qtext = $_POST['text'];
        $dateC = $_POST['date'];

        $sql = $conn->prepare("INSERT INTO quotes(userId, title, content, dcreate) VALUES (?, ?, ?, ?)");
        $sql->bind_param("isss", $suId, $qtitle, $qtext, $dateC);
        $sql->execute();
        echo json_encode(["status" => "success", "msg" => "Quote added"]);
        exit;
    }
    
    if($_POST['action'] == 'dltQuote'){
        $id = $_POST['id'];
        // $id = (int)$id;
        // $suId = (int)$suId;


        $sql = "DELETE FROM quotes WHERE id = ? AND userId =?";
        $ress = $conn->prepare($sql);
        $ress->bind_param("ii", $id,  $suId); //i for int
        $ress->execute();

        if ($ress->affected_rows > 0) {
            echo json_encode(["status" => "success", "msg" => "Deleted successfully"]);
        } else {
            echo json_encode(["status" => "fail", "msg" => "Delete failed"]);
        }
        exit;
    }
    //=============-=-=0-=-========-=====================0-0=-===========

    if($_POST["action"] == "addLink"){
        $name =$_POST['name'];
        $link =$_POST['url'];

        $sql = $conn->prepare("INSERT INTO links(userId, name, link) VALUES(?,?,?)");
        $sql->bind_param("iss",$suId,$name,$link);
        $sql->execute();
        echo json_encode(["status" =>"success", "msg" => "link added"]);
        exit;
    }

    if($_POST['action'] == 'delLink'){
        $id = $_POST['id'];

        $sql = $conn->prepare("DELETE FROM links WHERE id =? AND userId =?");
        $sql->bind_param("ii",$id,$suId);
        $sql->execute();

        if($sql->affected_rows > 0){
            echo json_encode(["status"=>"success","msg"=>"Yay"]);
        }else{
            echo json_encode(["status"=>"failed", "msg"=>"delete failed check table!!"]);
        }
        exit;
    }

    if($_POST['action'] == 'updateLink'){
        $visit = $_POST['visit'];
        $date = $_POST['date'];
        $id = $_POST['id'];
        $sql = $conn->prepare("UPDATE links SET visit = ?,lastvisit=? WHERE id=? AND userId=?");
        $sql->bind_param("isii",$visit,$date,$id,$suId);
        $sql->execute();

        if($sql->execute()){
            echo json_encode(["status" => "success", "msg" => "Nagana"]);
        }else{
            echo json_encode(["status" => "success", "msg" => "bob nd"]);
        }
        exit;
    }

    echo json_encode(["status" => "fail", "msg" => "Invalid request"]);
    exit;
}

?>
