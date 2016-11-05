function getUsers() {
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
                console.log(data);
                //getStreams(data);
            }
        });
    }
}