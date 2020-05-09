function getStylesheet() {
	today = new Date();
	dd = today.getDate();
	mm = today.getMonth() + 1;
	yy = today.getFullYear();
	// Get's current easter date using the year we get from yy.
	var f = Math.floor,
	// Golden Number - 1
	G = yy % 19,
	C = f(yy / 100),
	// related to Epact
	H = (C- f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
	// number of days from 21 March to the Paschal full moon
	I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
	// weekday for the Paschal full moon
	J = (yy + f(yy / 4) + I + 2 - C + f(C / 4)) % 7,
	// number of days from 21 March to the Sunday on or before the Paschal full moon
	L = I - J,
	month = 3 + f((L + 40)/44),
	day = L + 28 - 31 * f(month / 4);
	if (1 == mm && 15 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_gamerappa.css' type='text/css'>");
	}
	if (2 == mm && 1 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_rover.css' type='text/css'>");
	}
	if (month == mm && day == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_easter.css' type='text/css'>");
	}
	if (2 == mm && 14 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_valentines.css' type='text/css'>");
	}
	if (5 == mm && 5 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_anniversary.css' type='text/css'>");
	}
	if (7 == mm && 25 >= dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_aero.css' type='text/css'>");
	}
	if (8 == mm && 1 >= dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_aero.css' type='text/css'>");
	}
	if (10 == mm && 18 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_geekia.css' type='text/css'>");
	}
	if (10 == mm && 31 == dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_halloween.css' type='text/css'>");
	}
	if (12 == mm && 24 >= dd && 27 < dd) {
		document.write("<link rel='stylesheet' href='special/mainpage_christmas.css' type='text/css'>");
	}
}
getStylesheet();
