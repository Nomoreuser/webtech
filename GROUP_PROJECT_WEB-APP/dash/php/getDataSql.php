<?php 

require 'db.php';

if(!isset($_SESSION['uId'])){
    echo "Hallllalaalal";
    exit;
}

$uId = $_SESSION['uId'];



if($_SERVER["REQUEST_METHOD"] == "POST"){

    if($_POST['action'] == 'logOut'){
        echo json_encode(['status' => 'success', 'msg'=>'u logout ..!..']);
        $_SESSION['uId'] = null;
        exit;
    }

    if($_POST['action'] == 'addQuote'){
        $sql = "SELECT * FROM quotes WHERE userId =?";
        $ress = $conn->prepare($sql);
        $ress->bind_param('i', $uId);
        $ress->execute();

        $result = $ress->get_result();

        $quotesData  = [];

        while($row = $result->fetch_assoc()){
            $quotesData[] = $row;
        }
        echo json_encode(["status" => "success", "dquotes" => $quotesData]);
        exit;
    }

    if($_POST['action'] == "addLink"){
        $sql = $conn->prepare("SELECT * FROM links WHERE userId = ?");
        $sql->bind_param("i", $uId);
        $sql->execute();

        $result=$sql->get_result();

        $linksData = [];
        while($row=$result->fetch_assoc()){
            $linksData[] = $row;
        }
        echo json_encode(["status" => "success", "dlinks" => $linksData]);
        exit;
    }
    echo json_encode(["status" => "success", "dlinks" => "ahahhaha"]);
    exit;
}
exit;
?>