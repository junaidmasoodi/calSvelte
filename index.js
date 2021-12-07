/* global gapi */
import load from "load-script";
import App from "./App.html";

load("https://apis.google.com/js/api.js", () => {
  const init = async function () {
    await gapi.client.init({
      apiKey: "AIzaSyDCA_yPCIMxpSykYJ_p1rI_WAwg7j5Kz9o",
      scope: "https://www.googleapis.com/auth/calendar.readonly",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      ]
    });

    console.log(gapi);
    const eventQuery = gapi.client.calendar.events.list({
      calendarId: "qv5imk3d63k9pe6f458dtjmks8@group.calendar.google.com",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    });
    eventQuery.execute(function (resp) {
      console.log(resp);
    });

    new App({
      target: document.getElementById("root"),
      data: {
        eventQuery
      }
    });
  };

  gapi.load("client", init);
});
