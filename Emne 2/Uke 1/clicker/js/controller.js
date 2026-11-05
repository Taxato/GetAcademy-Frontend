function doClick() {
	model.points += model.pointsPerClick;
	model.smileyIndex = 1 - model.smileyIndex;
	updateView();
}

function buyUpgrade() {
	if (model.points < 10) return;

	model.points -= 10;
	model.pointsPerClick += 1;
	updateView();
}

function buyMax() {
	if (model.points < 10) return;

	model.pointsPerClick += Math.floor(model.points / 10);
	model.points %= 10;
	updateView();
}
