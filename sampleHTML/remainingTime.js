var isRunning = false;
function showRemainingTime(targetDate, componentID, intervalCallback)
{
	// console.log(date);
	// console.log(componentID);
	// console.log((new Date()).getTime());
	var today = new Date();
	var remainingMillisec = targetDate.getTime() - today.getTime();
	console.log(remainingMillisec);
	if(remainingMillisec < 0) 
	{
		clearInterval(intervalCallback);
		isRunning = false;
	}
	var remainingSec = parseInt((remainingMillisec / 1000) % 60, 10);
	var remainingMin = parseInt((remainingMillisec / 1000 / 60) % 60, 10);
	var remainingHour = parseInt((remainingMillisec / 1000 / 60 / 60) % 24, 10);
	var remainingDay = parseInt(remainingMillisec / 1000 / 60 / 60 / 24, 10);
	document.getElementById(componentID).innerHTML = remainingDay+"일 "+remainingHour+"시 "+remainingMin+"분 "+remainingSec+"초 남았습니다.";
}

function showRemainingTimeInterval(y, m, d, h, mi, s, componentID)
{
	if(isRunning) return;
	isRunning = true;
	var targetDate = new Date(y, m ,d, h, mi, s, 0);	
	var interval = setInterval(function(){showRemainingTime(targetDate, componentID, interval)}, 1000);
}