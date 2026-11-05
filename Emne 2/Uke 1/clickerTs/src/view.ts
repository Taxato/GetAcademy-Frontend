//import type { Model } from "./model";
import { model } from "./model";
import { doClick, buyUpgrade } from "./controller";

//let modelCopy: Model = model;

function updateView(): void {
    const isSmileyA: boolean = model.smileyIndex === 0;
    const smiley = isSmileyA ? '😀' : '😁';

    const upgradeBtnHtml: string = model.points < 10 ? '' : /*HTML*/`
        <button>
            Kjøp oppgradering (10 poeng)
        </button>
    `;

    const app = document.querySelector<HTMLDivElement>('#app')!;

    app.innerHTML = /*HTML*/`
        <div id="image">${smiley}</div>

        <div>
            Poeng: ${model.points}
        </div>
        ${upgradeBtnHtml}
    `;

    const smileyEl = document.querySelector<HTMLDivElement>('#image')!;
    smileyEl.addEventListener('click', doClick);

    const upgradeBtn = document.querySelector('button');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', buyUpgrade);
    }
}

export { updateView };

