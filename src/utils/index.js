export const toMilisec = ({min=0, sec=0}) => {
	return (min * 60 + sec) * 1000;
}

export const toSecondsAndMinutes = milisec => {
	const seconds = Math.floor(milisec/1000);

	return {min: Math.floor(seconds/60), sec: seconds%60}
}

export const getNotificationPermissions = () => {
	if(!Notification) return;
	if (Notification.permission !== "granted")
	    Notification.requestPermission();
}

export const displayNotification = window.test = ({text, title}) => {
	if(!Notification) return;
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      body: text,
    });

    notification.onclick = function () {
      window.focus();
    };

  }

}
