var channelNames = ["freecodecamp", "noobs2ninjas", "shadowtheoverseer", "joshcrotty", "krzjn", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "brunofin", "comster404"]
var onlineChannels = [];
var offlineChannels = [];
var streamJSON = [];
var channelJSON = [];

$(document).ready(getTwitch());

function getTwitch() {
  getOnlineChannels();
};

function getOnlineChannels() {
  channelNames.forEach(function(channel) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + channel, function(data) {
      if (data.stream !== null) {
        onlineChannels.push(channel);
        streamJSON.push(data);
        $("#active-items").append("<li class='online'><a href='" + data.stream.channel.url + "' target='_blank'><img class='avatar' src='" + data.stream.channel.logo + "'><span class='title'>" + data.stream.channel.display_name + "</span><span class='status'>" + data.stream.channel.status + "</span></a></li>");
      } else {
        //console.log(channel)
        offlineChannels.push(channel);
        $.getJSON("https://api.twitch.tv/kraken/channels/" + channel, function(data) {
          channelJSON.push(data);
          $("#inactive-items").append("<li class='offline'><a href='" + data.url + "' target='_blank'><img class='avatar' src='" + data.logo + "'><span class='title'>" + data.display_name + "</span><span class='offline'>(offline)</span></a></li>")
        })
      }
    })
    .fail(function() {
      console.log("Attempt failed!");
      $("#no-account-list").append("<li><img class='avatar' src='http://www.clker.com/cliparts/F/g/8/N/k/X/black-question-mark-square-icon-md.png'><span class='title'>" + channel + "</span><span class='no-account'>no account</span></li>");
    })
  })
}
