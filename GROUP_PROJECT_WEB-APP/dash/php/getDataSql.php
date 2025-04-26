<?php 

require 'db.php';

if(!isset($_SESSION['uId'])){
    echo "Hallllalaalal";
    exit;
}

$uId = $_SESSION['uId'];
$username = $_SESSION['username'];


if($_SERVER["REQUEST_METHOD"] == "POST"){


    //user loggout
    if($_POST['action'] == 'logOut'){
        echo json_encode(['status' => 'success', 'msg'=>'u logout ..!..']);
        $_SESSION['uId'] = null;
        exit;
    }
    //pfp
    if($_POST['action'] == 'pfp'){
        $i = $_POST['i'];

        $sql = $conn->prepare("UPDATE users SET pfp=? WHERE id=?");
        $sql->bind_param("ii", $i,$uId);

        if($sql->execute()){
            echo json_encode(['status'=>'success','msg'=>$i]);
        }
        exit;
    }
    if($_POST['action'] == 'getpfp'){
        $sql = $conn->query("SELECT pfp FROM users WHERE id=$uId");
        $i = [];
        if($sql->num_rows > 0){
            while($res = $sql->fetch_assoc()){
                $i[] = $res;
            }
        }
        echo json_encode(['msg'=>$i]);
        exit;
    }
    //chanbge usernamer
    if($_POST['action'] == 'changeUsername'){
        $newUsername = $_POST['username'];
        $sql = $conn->prepare("SELECT * FROM users WHERE username=?");
        $sql->bind_param("s",$newUsername);
        $sql->execute();
        $ress = $sql->get_result();

        if($ress->num_rows > 0){
            echo json_encode(["status" => "exist", "msg" => "Username already exists *"]);
            exit;
        }else{
            $sql = $conn->prepare("UPDATE users SET username=? WHERE id=?");
            $sql->bind_param("si",$newUsername,$uId);
            
            if($sql->execute()){
                echo json_encode(['status'=>'success','msg' => 'successfully change username!!']);
                $_SESSION['username'] = $newUsername;
                exit;
            }else{
                echo json_encode(['status'=>'fail', 'msg'=>'failed change username!!']);
            }
            exit;
        }
        echo json_encode(["status" => "error", "msg" => "NAN *"]);
        exit;
    }

    if($_POST['action'] == 'changePass'){
        $newPass = $_POST['password'];

        $sql=$conn->prepare("UPDATE users SET password=? WHERE id=?");
        $sql->bind_param("si", $newPass,$uId);
        if($sql->execute()){
            $_SESSION['pass'] = str_repeat("• ", strlen($newPass));
            echo json_encode(['status' => 'success','msg' => 'change pass!!']);
        }
        exit;
    }

    //delete accountt
    if($_POST['action'] == 'deleteAccount'){
        $pass = $_POST['pass'];

        $sql = $conn->prepare("SELECT * FROM users WHERE password = ? AND username = ?");
        $sql->bind_param("ss", $pass, $username);
        $sql->execute();

        $res = $sql->get_result();
    
        if($res->num_rows > 0){
            $sql = "DELETE FROM users WHERE username = '$username' AND password = '$pass'";
            if($conn->query($sql) === TRUE){
                $_SESSION['uId'] = NULL;
                echo json_encode(['status' => 'deleted']);
            }else{
                echo json_encode(['status' => 'failed deleted']);
            }
            exit;
        }else{
            echo json_encode(['status' => 'wrong']);
        }
        // echo json_encode(['status' => 'dd']);
        exit;
    }


    //Quote
    if($_POST['action'] == 'getQuote'){
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

    if($_POST['action'] == "getLink"){
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

    if($_POST['action'] == 'getTodo'){
        $today = $_POST['dToday'];
        $sql = $conn->prepare("SELECT * FROM todos WHERE userId=?");
        $sql->bind_param("i",$uId);
        $sql->execute();

        $result = $sql->get_result();
        $inprogress = [];
        $completed = [];
        $failed = [];
        $todayTodo =[];
        $pastDue = [];

        while($row=$result->fetch_assoc()){
            if($row['status'] == 'inprogress' && $row['dueDate'] > $today){
                $inprogress[] = $row;
            };
            
            if($row['dueDate'] == $today && $row['status'] == 'inprogress'){
                $todayTodo[] = $row;
            };

            if($row['status'] == 'completed'){
                $completed[] = $row;
            }

            if($row['dueDate'] < $today && $row['status'] == 'inprogress'){
                $pastDue[] = $row;
            }
        };

        echo json_encode(['inprogress' => $inprogress, 'today' => $todayTodo, 'completed' => $completed, 'pastDue' =>$pastDue]);
        exit;
    }

    echo json_encode(["status" => "success", "msg" => "ahahhaha"]);
    exit;
}
exit;
?>