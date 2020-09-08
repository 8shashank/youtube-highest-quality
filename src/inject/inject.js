chrome.extension.sendMessage({}, function(response) {
	function setHighestQuality() {
		if (!document.querySelector(".ytp-settings-button")) {
			return;
		}
		// Click settings
		document.querySelector(".ytp-settings-button").click();
		// Click Quality. Not relying on exact text for localization reasons, it is currently last menu item.
		Array.from(document.querySelectorAll(".ytp-menuitem-content")).filter(a=>a.innerText).slice(-1)[0].click();
		// Click highest resolution, which would be at the top of the list
		Array.from(document.querySelectorAll(".ytp-quality-menu .ytp-menuitem-label"))[0].click();
	}

	const readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		let title = document.title;

		const observer = new MutationObserver((mutations)=> {
			const newTitle = document.title;
			if (newTitle != title) {
				title = newTitle;
				setHighestQuality();
			}
		});
		const config = {
			childList: true,
			subtree: true
		};
		observer.observe(document.querySelector('title'), config);

		setHighestQuality();
	}
	}, 10);
});