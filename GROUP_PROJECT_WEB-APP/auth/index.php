
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
    <title>Quick/Save</title>
    
    <link rel="stylesheet" href="style.css">

    
</head>
<body>


    <nav>
        <img class="logo" src="assets/favicon.ico" alt="icon">
        <h1>Quick<span>/</span>Save</h1>
        <h2 id="signin-Btn" onclick="toForm()">Sign-in</h2>
    </nav>


    <div class="fview" >
        <span class="word move-right">Welcome</span>
        
        <span class="word move-down">YOUR SPACE</span>
        <hr style="margin-bottom: 2%; background-color: rgb(0, 0, 0); padding: 1px; border: none;">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium impedit aut repellendus facilis, sint nesciunt. Nostrum, sequi! Quibusdam sit aliquid suscipit, in quia magnam repellat esse vitae ea? Vel, perferendis!
            Fuga quae corrupti neque, officiis laborum sit eligendi accusamus dolor? Qui ipsam, unde iusto hic dolorem, nisi cumque similique omnis magni mollitia, exercitationem necessitatibus quisquam. Beatae sed quis maxime libero.
        </p>
    </div>

    <!-- sign in & up form ...-->
    <div class="form-container" id="form-container">
        <div class="signin" id="signin">
            <div class="close" id="close" onclick="closeForm()"><img src="assets/close.png" draggable="false"></div>

            <form id="Log-in">
                <h2>Log In</h2>

                <div id="checkUsers"></div>

                <label class="lbl1" for="Username">Username</label>
                <input class="input_login" name="lusername" type="text"  id="loginUsername" required>

                <label class="lbl2" for="password">Password</label>
                <input class="input_login" name="lpassword" type="password" id="loginPassword" required>

                <button type="submit">Login</button>

                <p>Don't hava an account?<span class="toSignup" id="toSignup">Sign up</span></p>
            </form>

        </div> 

        <div id="signup" class="signup">
            <div class="close" id="close" onclick="closeForm()"><img src="assets/close.png" draggable="false"></div>

            <form id="Sign-up">
                <h2>Sign Up</h2>

                <div id="checkCreate"></div>

                <label class="lbl1" for="Username">Username</label>
                <input class="input_login" name="username" type="text" id="signupUsername" required>

                <label class="lbl2" for="password">Password</label>
                <input class="input_login" name="password" type="password" id="signupPassword" required>

                <label class="lbl2" for="password">Confirm Password</label>
                <input class="input_login" name="password" type="password" id="confirmPass" required>
                <button type="submit">Sign up</button>

                <p>Already have account?<span class="toSignin" id="toLogin">Log In</span></p>
            </form>
        </div>
    </div>

    <script src="script.js"></script>

</body>
</html>

