function updateView() {
	const smiley = model.smileyIndex === 0 ? "😀" : "😁";

	const upgradeBtnHtml =
		model.points < 10
			? ""
			: /* html */ `
        <button onclick="buyUpgrade()">
            Kjøp oppgradering (10 poeng)
        </button>
		<button onclick="buyMax()">Kjøp maks oppgraderinger ${Math.floor(model.points / 10)}</button>
    `;

	document.getElementById("app").innerHTML = /* html */ `
        <div id="image" onclick="doClick()">${smiley}</div>

        <div id="pointsInfo">
            Poeng: ${model.points}
        </div>
        ${upgradeBtnHtml}
    `;
}
