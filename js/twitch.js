
$(document).ready(function () {
    var users = [
          { name: "ESL_SC2", online: 0 }
        , { name: "OgamingSC2", online: 0 }
        , { name: "cretetion", online: 0 }
        , { name: "freecodecamp", online: 0 }
        , { name: "storbeck", online: 0 }
        , { name: "habathcx", online: 0 }
        , { name: "RobotCaleb", online: 0 }
        , { name: "noobs2ninjas", online: 0 }
        , { name: "MedryBW", online: 0 }
    ];
    var onlineFlag;
    var userStreams = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i].name;
        console.log("users[i].name = " + users[i].name);
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + user,
            headers: {
                'Client-ID': 'tp5gjgy7gtcy5w4u4pjdb8bw4uz3o5b'
            },
            success: function (data) {
                var curUser = data.name;
                //console.log(data);
                getStreams(data);
            }
        });
    }
    function getStreams(userData) {
        console.log("userData.name = " + userData.name);
        var user = userData.name
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams?channel=' + user,
            headers: {
                'Client-ID': 'tp5gjgy7gtcy5w4u4pjdb8bw4uz3o5b'
            },
            success: function (data) {
                //console.log(data);
                if (data.streams.length > 0) {
                    var onlineFlag = 1;
                    updateElement(users, "name", user, onlineFlag);
                    updateHTML(user, userData, "online");
                }
                else {
                    updateHTML(user, userData, "offline");
                }
                updateHTML(user, userData, "allUsers");
                updateHTMLBasedOnStatus(user, onlineFlag, "allUsers");
                updateHTMLBasedOnStatus(user, onlineFlag, "online");
                updateHTMLBasedOnStatus(user, onlineFlag, "offline");
            }
        });
    }
    function updateHTML(user, data, id) {
        var logo = $("<img></img>", {
            src: data.logo,
            width: "120px",
            height: "120px"
        }).addClass("img-circle");
        var row = $("<div></div>").addClass("row").attr("id", user + "row" + id);
        var col = $("<div></div>").addClass("col-lg-12").attr("id", user + "col" + id);
        var well = $("<div></div>")
            .addClass("well")
            .attr("id", user + "well" + id);
        var row2 = $("<div></div>").addClass("row").attr("id", user + "row2" + id);
        var col2 = $("<div></div>").addClass("col-lg-3").attr("id", user + "col2" + id);
        var col3 = $("<div></div>").addClass("col-lg-3").attr("id", user + "col3" + id);
        var col4 = $("<div></div>").addClass("col-lg-6").attr("id", user + "col4" + id);
        var status = $("<div></div>").attr("id", user + "Status" + id).html(data.status);
        //building html from variables above
        $("#" + id).append(row);
        $("#" + user + "row" + id).css({ "margin-bottom": "0" }).append(col);
        $("#" + user + "col" + id).append(well);
        $("#" + user + "well" + id).append(row2);
        $("#" + user + "row2" + id).append(col2);
        $("#" + user + "col2" + id).append(logo);
        $("#" + user + "row2" + id).append(col3);
        $("#" + user + "row2" + id).append(col4);
        $("#" + user + "col3" + id).append("<h3 id =h3" + user + ">" + user + "</h3>");
        $("#" + user + "col4" + id).append(status).css({ "padding-top": "20px" });
        $("#" + user + "col3" + id).css({ "font-family": "'Aldrich', sans-serif", "font-size": "20px" });
        $("#h3" + user + id).css({ "font-weight": "bold" });
    }

    function updateElement(arr, propName, propValue, newValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName].toString().toLowerCase() == propValue.toLowerCase()) {
                arr[i][1] = newValue;
                console.log("name = " + arr[i][propName].toString() + " and " + "users[" + i + "] = " + users[i][1].toString());
                return 0;
            }
        return 1;
    }
    function findElement(arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName].toString().toLowerCase() == propValue.toLowerCase()) {
                return arr[i][1];
            }
        return -1;
    }

    function updateHTMLBasedOnStatus(user, online, id) {
        if (online == 1) {
            //console.log("user " + user + " is online.");
            $("#" + user + "well" + id).css({ "background-color": "#8cff66", "margin-bottom": "0" });
            $("#" + user + "col3" + id).append("<h3>Online    <span class = 'glyphicon glyphicon-ok'</span></h3>");
            //flag the user as online so we can build the three lists
            console.log("updating online flag for user " + user + "...");
            console.log("users.toString = " + users.toString());
            updateElement(users, "name", user, 1);
            return 0;
        }
        $("#" + user + "well" + id).css({ "background-color": "#ff6666", "margin-bottom": "0" });
        $("#" + user + "col3" + id).append("<h3>Offline    <span class = 'glyphicon glyphicon-remove'</span></h3>");
        return 0;
    }


    function filterHTML(searchBox) {
        var filter = $("#" + searchBox).val();
        console.log("search box val = " + $("#" + searchBox).val().toString());
        var row = $('.row');
        row.show();
        if (filter != '') row.not('[class*="' + filter + '"]').hide();
    }

    $('#searchAll').keyup(function () {
        filterHTML("searchAll");
    });
    getUsers();

});
