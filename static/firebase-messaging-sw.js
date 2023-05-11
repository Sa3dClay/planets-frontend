    importScripts(
      'https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyC_13GGIE5ywHDi-yvTZ_izTK8aYZQPdbo","authDomain":"planets-bd6fe.firebaseapp.com","projectId":"planets-bd6fe","storageBucket":"planets-bd6fe.appspot.com","messagingSenderId":"1068309836468","appId":"1:1068309836468:web:9fd543df6260619550dde1"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    self.addEventListener("push", function (e) {
  const data = e.data.json();

  const options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
  };
});

self.addEventListener(
  "notificationclick",
  function (event) {
    const url = "home";

    event.notification.close();
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          // If so, just focus it.
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
      })
    );
  },
  false
);

    