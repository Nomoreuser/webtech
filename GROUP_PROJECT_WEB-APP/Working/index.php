<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Allerta&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" href="/img/favicon.png">
</head>
<body>

    <div id="bg">

        <div class="container">

            <nav>
                <div class="user-img-name">
                    <div class="user-img">
                        <img src="" alt="">
                    </div>
                    <h1 class="user-name" id="user-name">Username</h1>
                </div>

                <div id="add">
                    <div id="addBtn">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-filter-plus"><path d="M10 18h4"/><path d="M11 6H3"/><path d="M15 6h6"/><path d="M18 9V3"/><path d="M7 12h8"/></svg> -->
                        ➕ New
                    </div>
                    <div id="addList">
                        <div onclick="addQuotes()">📝  New Quotes</div>
                        <div onclick="addLinks()" id="addLinks">🔗  New Links</div>
                        <div onclick="addTodo()">✅  New To-do</div>
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
                        <p>To-do</p>
                    </div>

                </div>
                <div id="LogOut" style="text-align: center; font-size: 25px; padding: 20px 0; border-top: 1px solid white;">
                    Log out
                </div>
            </nav>


            <main>
                
                <div style="height: 100vh; width: 100%; background-color: #1d1d1d;">
                    <div class="lbl">
                        <label for="" id="labelC"></label>
                    </div>
    
                    <hr style="margin: 0;">
                    
                    <section id="forQuotes">
                        
                    </section>

                    <section id="forLinks">
                        <div id="gridLinks">
                            
                        </div>
                    </section>

                    <section id="forTodo">
                        <div class="gridTodo">
                            <div class="todo" id="ongoing">
                                <h1>Ongoing</h1>
                            </div>
                            <div class="todo" id="completed">
                                <h1>Completed</h1>
                            </div>
                            <div class="todo" id="failed">
                                <h1>Failed</h1>
                            </div>
                        </div>
                        
                    </section>
                </div>
                
            </main>
        </div>

        
        
    </div>

    <div id="popQuote" class="pop">
        <div id="quoteBox">
            <h1 style="text-align: center;">Quote</h1>

            <div class="containQuotes">
                <input class="quotedBy" id="quoteTitle" type="text" maxlength="35" placeholder="Quoted by">
                <div style="height: 255px; font-family: 'Playfair Display', serif">
                    <!-- <hr style="width: 50%;position: relative; float: left;"> -->
                    <textarea class="inputQuotes" name="" id="quoteInp" placeholder="text....."></textarea>
                </div>
            </div>
            
            <div class="input-buttons">
                <button id="cancel">Cancel</button>
                <button id="submitQuote" disabled >Submit</button>
            </div>
        </div>

    </div>

    <div id="popLink" class="pop">
        <div id="saveLinks">
            <h1>Save Links</h1>
            <h2>Name</h2>
            <input type="text" id="linkName">
            <h2>URL</h2>
            <input type="text" id="linkURL">
            <button id="submitLink" disabled>Add</button>
            <button id="cancelLink">Cancel</button>
        </div>
    </div>

    <div id="popTodo" class="pop">
            
            <div class="todoBox">
                <div id="cancelTask"><img src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/2716.png" alt=""></div>
                <h1>Add Task</h1>
                <label>Title <span>*</span></label>
                <input type="text" id="todoTitle">
                <label>Description (Optional)</label>
                <input type="text" id="desc">
                <label>Deadline <span>*</span></label>
                <input type="date">
                <button>Add Task</button>
            </div>
        </div>

    </div>
    
    <script src="script.js"></script>
</body>
</html>