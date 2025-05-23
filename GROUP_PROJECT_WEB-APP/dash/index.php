
<?php session_start();
    echo '
    <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
    <style>
        body{
            background-color: #222222;
        }
        .alertBox{
            background-color: #EBE8DB;
            padding: 10px;
            border-radius: 0 0 15px 15px;

            /* position of my box */
            position: absolute;
            left: 50%;
            top:0%;
            transform: translateX(-50%);
            display:flex;
            animation: down .5s ease-out;
        }
        .alertBox h3{margin: 0;color: #88304E;}
        @keyframes down {
            0% {
                top: -20%;
            }
            100% {
                top: 0;
            }
        }
    </style>';

    if (!isset($_SESSION['uId'])) {
        echo '
            <div class="alertBox">
                <!-- https://app.lottiefiles.com/ animation icon -->
                <dotlottie-player src="https://lottie.host/f136a902-dc81-405c-8123-f9be7400ef71/028hTUYSGZ.lottie" background="transparent" speed="1" style="width: 150px; height: 150px" loop autoplay></dotlottie-player>
                <div style="height:fit-content;position:relative;top:50%;transform:translateY(40%);margin-right:25px;">
                    <h3>Log in or Create first! </h3>
                    <dotlottie-player onclick="window.location.href=\'../auth/index.html\'" src="https://lottie.host/172cd63d-5478-44ef-8240-b76222c60ca2/yuiAJxCd66.lottie" background="transparent" speed="2.5" style="width: 70px; height: 70px; float:right;" loop autoplay></dotlottie-player>
                </div>
            </div>';
        exit;
    }
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Allerta&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" href="assets/favicon.ico">
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

</head>
<body>

    <div id="bg">

        <div class="container">

        <!-- nav left side where buttons for quotes link todo setting to render it to main && show username and profil pic -->
            <nav>
                <div class="user-img-name">
                    <div class="user-img">
                        <img id="upfP" src="" alt="" style="height: 100%;width: 100%">
                    </div>
                    <h1 class="user-name"><?php echo htmlspecialchars($_SESSION['username']) ?></h1>
                </div>

                <div id="add">
                    <div id="addBtn">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-filter-plus"><path d="M10 18h4"/><path d="M11 6H3"/><path d="M15 6h6"/><path d="M18 9V3"/><path d="M7 12h8"/></svg> -->
                        ➕ New
                    </div>
                    <div id="addList">
                        <div onclick="addQuotes()">📝  New Quotes</div>
                        <div onclick="addLinks()" id="addLinks">🔗  New Links</div>
                        <div onclick="addTodo()">✅  New To Do</div>
                    </div>
                    <div style="display: none;">hahahahahahha</div>
                    
                </div>
                
                <div class="navButton">
                    <!-- Container Btn  to show in my main section-->
                    <div class="button quote" onclick="Quotes()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 18h1"/></svg>
                        <p>Quotes</p>
                    </div>
                    <div class="button links" onclick="Links()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cable"><path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v-2h-4"/><path d="M3 5h4V3"/><path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"/></svg>
                        <p>Links</p>
                    </div>
                    <div class="button links" onclick="Todo()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
                        <p>To Do</p>
                    </div>
                    <div class="button setting" onclick="Setting()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        <p>Setting</p>
                    </div>
                </div>
                <div id="LogOut" style="text-align: center; font-size: 25px; padding: 20px 0; border-top: 1px solid white;font-weight:bolder; color:rgba(168, 168, 168, 0.88);">
                    Log out
                </div>
            </nav>


            <!-- this the right side wheere it show if user  click on nav buttons quote links todo -->
            <main>
                
                    <div class="lbl">
                        <h1 id="labelC"></h1>
                    </div>
    
                    <!-- <hr style="margin: 0;"> -->
                     <section id="greet" style="display:block;text-align:center;height: 100%;">
                        <dotlottie-player
                            src="https://lottie.host/cc2459e3-789c-4569-9ebd-2e187e36a306/794vlU8cel.lottie"
                            background="transparent"
                            speed="1"
                            style="width: 300px; height: 300px; margin:auto;"
                            loop
                            autoplay
                        ></dotlottie-player>
                        <h1 style="font-size: 80px;color:rgba(201, 201, 201, 0.87);margin-bottom: 40px">
                            Hi <?php echo htmlspecialchars($_SESSION['username']) ?>, Welcome to Quick/Save!</h1>
                        <h2 style="color:rgba(195, 195, 195, 0.87)">Get Started</h2>
                        <div style="display: flex; gap: 60px; justify-content:center;margin-top: 20px">
                            <div class="gb" onclick="Quotes()">
                                <dotlottie-player
                                    src="https://lottie.host/acac20cf-0bf1-452f-9af4-c7418d2db750/hWBdWG8v6j.lottie"
                                    background="transparent"
                                    speed="1"
                                    style="width: 200px; height: 200px; margin:auto"
                                    loop
                                    autoplay
                                ></dotlottie-player>
                                <h3>Quotes</h3>
                                <h4>Save your favorite quotes to revisit anytime. Keep inspiration just a click away!</h4>
                            </div>
                            <div class="gb" onclick="Links()">
                                <dotlottie-player
                                    src="https://lottie.host/efd1ee03-a31c-4a77-9d6c-eb052adffff4/tOnFAGFg5W.lottie"
                                    background="transparent"
                                    speed="1"
                                    style="width: 200px; height: 200px; margin: auto"
                                    loop
                                    autoplay
                                ></dotlottie-player>
                                <h3>Links</h3>
                                <h4>Store useful links in one place for quick access. Never lose an important page again!</h4>
                            </div>
                            <div class="gb" onclick="Todo()">
                                <dotlottie-player
                                    src="https://lottie.host/731743be-9ec0-4bee-bb7b-d2e31a875613/bonWalBN3T.lottie"
                                    background="transparent"
                                    speed="1"
                                    style="width: 200px; height: 200px; margin: auto"
                                    loop
                                    autoplay
                                ></dotlottie-player>
                                <h3>To-Do</h3>
                                <h4>Stay organized with your personal task list. Check off items as you go!</h4>
                            </div>
                        </div>
                     </section>
                    
                    <section id="forQuotes">
                        
                    </section>

                    <section id="forLinks">
                        <div id="gridLinks">
                            
                        </div>
                    </section>

                    <section id="forTodo">
                        <div class="gridTodo">
                            <div class="todo" id="inprogress">
                                <h1 style="font-size: 35px;margin-bottom: 20px;color:rgb(255, 136, 0);">In Progress</h1>
                                <div class="scroll">
                                    <div id="todayDue" style="background-color:rgba(149, 255, 168, 0.86);padding: 0 10px;border-radius: 15px">
                                        <h1 id="lblToday" style="color:rgb(47, 47, 47); padding: 10px 0">No due today!</h1>
                                        <div id="storedTodayDue" style="">

                                        </div>
                                    </div>
                                    <div id="storedInprogress">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="todo" id="completed">
                                <h1 style="font-size: 35px;margin-bottom: 20px;color:rgb(78, 241, 116);">Completed</h1>
                                <div class="scroll">
                                    <div id="storedCompleted">

                                    </div>
                                </div>
                            </div>
                            <div class="todo" id="failed">
                                <h1 style="font-size: 35px;margin-bottom: 20px;color:rgba(255, 73, 67, 0.93);">Past Due</h1>
                                <div class="scroll">
                                    <div id="storedFailed">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="setting">
                        <!-- for user setting where he can change and delete -->
                            <div class="settingBox">
                                <!-- <h2 style="position:absolute; right:10px;top:10px;" onclick="setting.style.display='none',document.getElementById('changeUP').remove()">
                                ❌</h2> -->
                                <div style="margin: 0 0 40px 0;color:rgb(62, 62, 62)"><h1>Account Settings</h1></div>
                                <div class="image"><img id="spfp" src=""></div>
                                <h4 id="chooseP" onclick="choosePf()">Change</h4>
                                <h3>Username</h3>
                                <input id="setUsername" type="text" value="<?php echo htmlspecialchars($_SESSION['username']) ?>" hidden>
                                <p class="setInfo" id="setU" ><?php echo htmlspecialchars($_SESSION['username']) ?></p>
                                <h3>Password</h3>
                                <input id="setPass" type="text" value="<?php echo htmlspecialchars($_SESSION['pass']) ?>" hidden>
                                <p class="setInfo" id="setP"><?php echo htmlspecialchars($_SESSION['pass']) ?></p>

                                <br>
                                <div class="btn" style="color:rgba(156, 26, 26, 0.94)" id="delaccount">Delete Account</div>
                            </div>
                    </section>
                
            </main>
        </div>

    </div>




    <!-- this below is hide using display none only show when user click the button for it -->


    <!-- this is the add quote where user input the content and also i reuse this for in edit where user is edit the data -->
    <div id="popQuote" class="pop">
        <form id="quoteBox">
            <h1>Quote</h1>
            <input id="quoteTitle" type="text" maxlength="35" placeholder="Author or topic">
            <div class="quoteText">
                <textarea name="" id="quoteInp" placeholder="text....."></textarea>
            </div>
            <div class="input-buttons">
                <button id="cancel" type="button">Cancel</button>
                <button id="submitQuote" disabled >Submit</button>
            </div>
        </form>
    </div>

    <!-- add links content  -->
    <div id="popLink" class="pop">
        <form id="saveLinks">
            <h1>Save Links</h1>

            <div id="linkErr" style="background-color: #d2665a7e; width: fit-content;margin:auto;color: #A62C2C;font-weight:bolder;padding-right: 7px"></div>

            <h2>Name</h2>
            <input type="text" id="linkName">
            <h2>URL</h2>
            <input type="text" id="linkURL" placeholder="paste here..">
            <button id="submitLink" disabled>Add</button>
            <button id="cancelLink" type="button">Cancel</button>
        </form>
    </div>

    <!-- add Todo content same in quote i reuse this when user is editing the data -->
    <div id="popTodo" class="pop">
            
        <form class="todoBox">
            <div><img src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/2716.png" alt=""  id="cancelTask"></div>
            <h1>Add Task</h1>
            <label>Title <span>*</span></label>
            <input type="text" id="todoTitle" required>
            <label>Description (Optional)</label>
            <input type="text" id="desc">
            <label>Deadline <span>*</span></label>
            <input type="text" id="todoDate">
            <button id="submitTodo" disabled>Add Task</button>
        </form>

    </div>
    
    <!-- this is for quote to show when user click on the file it see it full content  -->
    <div id="qbg">
        <div id="qbox"></div>
    </div>

    <!-- for user setting where he can change and delete
    <div id="setting">
        <div class="settingBox">
            <h2 style="position:absolute; right:10px;top:10px;" onclick="setting.style.display='none',document.getElementById('changeUP').remove()">
                ❌</h2>
            <div style="margin: 0 0 40px 0;color:rgb(62, 62, 62)"><h1>Account Settings</h1></div>
            <div class="image"><img id="spfp" src=""></div>
            <h4 id="chooseP" onclick="choosePf()">Change</h4>
            <h3>Username</h3>
            <input id="setUsername" type="text" value="<?php echo htmlspecialchars($_SESSION['username']) ?>" hidden>
            <p class="setInfo" id="setU" ><?php echo htmlspecialchars($_SESSION['username']) ?></p>
            <h3>Password</h3>
            <input id="setPass" type="text" value="<?php echo htmlspecialchars($_SESSION['pass']) ?>" hidden>
            <p class="setInfo" id="setP"><?php echo htmlspecialchars($_SESSION['pass']) ?></p>

            <br>
            <div class="btn" style="color:rgba(156, 26, 26, 0.94)" id="delaccount">Delete Account</div>
        </div>
    </div> -->

    <script src="script.js"></script>
    
</body>
</html>