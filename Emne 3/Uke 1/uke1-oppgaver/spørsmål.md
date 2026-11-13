# Fredag — tre spor

> **Økt 5 · Uke 1 · ~90 min · ingen undervisning**
> **Mål:** Du har gjort ferdig de fire repetisjonsoppgavene i spor A og kan si hva du lærte. Hvis du er ferdig, kan du gå videre til spor B eller C.
> **Format:** Du velger sporet ditt selv. Jeg går rundt, svarer på spørsmål og sjekker innom i teams gjennom dagen.

I dag er det ingen undervisning. Alt du trenger står i dette dokumentet, og i dokumentene fra mandag til torsdag.

---

## Hvorfor fredagen ser sånn ut

Uka har gitt deg mye nytt på kort tid: reaktivitet, direktiver, komponenter, slots og den første testen. Noen sitter med alt, andre har hull. En felles gjennomgang ville tvunget alle til å gjøre det samme — så i stedet velger du.

| Spor                   | Hva                                            | Hvem                                         |
| ---------------------- | ---------------------------------------------- | -------------------------------------------- |
| **A — Repetisjon**     | Fire oppgaver som røde tester                  | Alle starter her                             |
| **B — Under panseret** | Bygg reaktiviteten selv, og les Vue-kildekoden | Du som er ferdig med A og vil vite _hvorfor_ |
| **C — Egen app**       | Din egen idé, din egen kode                    | Du som har en idé og er ferdig med A         |

Fire regler:

1. **Alle starter med spor A.** Det er den eneste oppgaven som er «pensum» i dag.
2. **Er du ferdig med A**, gå videre til B eller C — hvis det er tid igjen.
3. **B og C er frivillige.** De blir ikke vurdert, og de er ikke forutsetning for noe i uke 2.
4. **Push før du går.** Det er det eneste kravet i dag.

> ⚠️ **Ikke spør meg før du har lett i to minutter.** Det høres strengt ut, men det er hele poenget: svarene på spor A står i ukas egne dokumenter, og du blir mye bedre til å finne dem selv av å lete. Spør når du har lett — ikke før.

---

## Sjekk deg selv først

Ett minutt, uten å slå opp. Svarer du nei på flere enn tre av disse, er spor A stedet du skal være.

- Hva er en `ref`, og hvorfor skriver du `.value` i scriptet men ikke i templaten?
    - En "ref" er en slags pointer eller container som inneholder en verdi. Når vi bruker den i script må vi accesse verdien med .value fordi selve konstanten tilhører containeren, ikke verdien, men i templaten håndterer vi verdien direkte
- Hva skjer når du endrer en `ref`? Hvem oppdager det, og hva skjer så?
    - Forvirrende spørsmål syntes jeg men vue oppdager det og re-renderer steder i templaten som bruker den refen. I tillegg vil alle barn som tar refen som et prop re-rendere
- Hva er forskjellen på `v-if` og `v-show`?
    - v-if lager ikke elementet i dom hvis ifen er false, mens v-show setter bare display:none, så elementene fortsatt eksisterer
- Hvorfor må `:key` være stabil, og når merker du at den er feil?
    - Fordi rekkefølgen på ting kan endre seg i en array, for eksempel hvis du fjerner et element i arrayen men du bruker index som key vil den ikke kunne oppdatere seg selv riktig. Du kan se om den er stabil med dev tools
- Hva går ned med props, og hva går opp med emits?
    - Hva enn du sender med, objekter, verdier, etc, men en emit bruker spesifikt et "event" objekt
- Hvorfor kan ikke barnet endre en prop?
    - Prop connectivity går bare nedover
- Hva er en slot, og hvem eier rammen rundt hullet?
    - En slot er et slags pseudoelement i en template som lar det putte inn valgfri html i en template, for eksempel kan du ha et "base" modal element som du vil ha forskjellig content i men ha samme basic funksjonalitet
- Hvorfor skal du se en test feile før du stoler på den?
    - Så du vet at den ikke bare autopasserer alle tester men faktisk sjekker det du vil at den skal sjekke

---

## Spor A — fire røde tester

Her er fire testfiler. Koden din er riktig — testene beskriver det som _mangler_. Oppgaven er å gjøre dem grønne.

**Hvorfor tester og ikke vanlige oppgaver?** Fordi du da vet når du er ferdig uten å spørre meg. En grønn test er et svar, ikke en dom.

### Sett opp

Lag de fire filene i `src/__tests__/` i `vue-ovelser`, lim inn innholdet, og kjør:

```bash
npm run test:unit
```

Du skal se fire røde filer, alle med `fredag-` i navnet:

```
 ❯ src/__tests__/fredag-1-step.spec.ts (1 test | 1 failed)
 ❯ src/__tests__/fredag-2-stats.spec.ts (3 tests | 2 failed)
 ❯ src/__tests__/fredag-3-fjernferdige.spec.ts (1 test | 1 failed)
 ❯ src/__tests__/fredag-4-appcard.spec.ts (0 test)
```

Testene du allerede har fra onsdag, skal fortsatt være grønne. Bare de fire nye skal feile.

> ⚠️ **Én av de nye er grønn allerede** — flertallstilfellet i oppgave 2. Den er ikke bortkastet: den passer på at du ikke brekker noe som virket.

> ⚠️ **`npm run type-check` klager på `AppCard` til du har laget fila i oppgave 4.** Det er samme feil som testen melder, bare med en annen stemme.

### Oppgave 1 — et steg du kan stille

`AppCounter` teller alltid i ett. Den skal kunne telle i et steg du bestemmer.

**Det som mangler:** en `step` som styrer hvor mye `+` og `−` legger til, og et tallfelt som setter den.

**Kontrakten** — denne må du holde, for testen sjekker den:

- `<p>`-en heter fortsatt `Teller: …`
- knappene har samme rekkefølge: `+1`, `-1`, `Nullstill`
- steg-feltet er `<input type="number">` og bindes med `v-model.number`
- `Nullstill` setter **telleren** til `0` — ikke steget til `1`

**Hvor svaret står:** [`1_mandag`](./1_mandag%20-%20kom%20i%20gang%20med%20vue.md) (reaktivitet) og [`2_tirsdag`](./2_tirsdag%20-%20direktiver%20og%20lister.md) (`v-model` og modifikatorer).

```ts
// src/__tests__/fredag-1-step.spec.ts
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppCounter from "../components/AppCounter.vue";

describe("AppCounter med step", () => {
	it("øker med step fra tallfeltet", async () => {
		const wrapper = mount(AppCounter);
		expect(wrapper.find("p").text()).toContain("Teller: 0");

		const felt = wrapper.find('input[type="number"]');
		expect(
			felt.exists(),
			'Fant ikke noe tallfelt: <input type="number">'
		).toBe(true);
		await felt.setValue("5");

		const knapper = wrapper.findAll("button");
		await knapper[0]!.trigger("click");
		expect(wrapper.find("p").text()).toContain("Teller: 5");

		await knapper[0]!.trigger("click");
		expect(wrapper.find("p").text()).toContain("Teller: 10");

		await knapper[1]!.trigger("click");
		expect(wrapper.find("p").text()).toContain("Teller: 5");

		await knapper[2]!.trigger("click");
		expect(wrapper.find("p").text()).toContain("Teller: 0");
	});
});
```

### Oppgave 2 — tre tilstander i `TodoStats`

`TodoStats` sier «1 oppgaver, 0 ferdig». Det er feil på to måter: det står «1 oppgaver», og en tom liste fortjener sin egen melding.

**Det som mangler:** tre tilstander, ikke én.

**Kontrakten:**

- tom liste → teksten `Ingen oppgaver`
- nøyaktig én → teksten `Én oppgave`
- flere → teksten `N oppgaver`, og `{{ done }} ferdig` skal fortsatt stå der

**Hvor svaret står:** [`2_tirsdag`](./2_tirsdag%20-%20direktiver%20og%20lister.md), `v-if` / `v-else-if` / `v-else`.

```ts
// src/__tests__/fredag-2-stats.spec.ts
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TodoStats from "../components/TodoStats.vue";

describe("TodoStats med tre tilstander", () => {
	it("sier «Ingen oppgaver» når lista er tom", () => {
		const wrapper = mount(TodoStats, { props: { total: 0, done: 0 } });
		expect(wrapper.text()).toContain("Ingen oppgaver");
	});

	it("sier «Én oppgave» når det er nøyaktig én", () => {
		const wrapper = mount(TodoStats, { props: { total: 1, done: 0 } });
		expect(wrapper.text()).toContain("Én oppgave");
	});

	it("sier «5 oppgaver» når det er flere", () => {
		const wrapper = mount(TodoStats, { props: { total: 5, done: 2 } });
		expect(wrapper.text()).toContain("5 oppgaver");
	});
});
```

### Oppgave 3 — «Fjern ferdige»

I dag må du slette én og én oppgave. Legg til en knapp som rydder alt som er ferdig.

**Det som mangler:** en knapp som fjerner alle oppgaver der `done` er `true`.

**Kontrakten:**

- knappen heter nøyaktig `Fjern ferdige`
- den sletter **uten** bekreftelsesmodal — modalen fra torsdag er for enkeltsletting
- `:key` skal fortsatt være `task.id`

**Hvor svaret står:** [`2_tirsdag`](./2_tirsdag%20-%20direktiver%20og%20lister.md) (listeoperasjoner), [`3_onsdag`](./3_onsdag%20-%20komponenter%20og%20testing.md) og [`4_torsdag`](./4_torsdag%20-%20slots%20og%20modaler.md) (hvor tilstanden bor).

**Tenk over mens du gjør det:** lista endres når du klikker. Hvorfor må `:key` fortsatt være `task.id` nå som innholdet forsvinner? Det er samme spørsmål som tirsdagens `unshift`-eksperiment.

```ts
// src/__tests__/fredag-3-fjernferdige.spec.ts
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TodoList from "../components/TodoList.vue";

describe("TodoList med «Fjern ferdige»", () => {
	it("fjerner bare de ferdige oppgavene", async () => {
		const wrapper = mount(TodoList);
		expect(wrapper.text()).toContain("Kjøpe kaffe");
		expect(wrapper.text()).toContain("Skrive tirsdagens kode");

		const knapp = wrapper
			.findAll("button")
			.find(b => b.text() === "Fjern ferdige");
		expect(
			knapp,
			"Fant ingen knapp med teksten «Fjern ferdige»"
		).toBeTruthy();

		await knapp!.trigger("click");
		expect(wrapper.text()).toContain("Kjøpe kaffe");
		expect(wrapper.text()).not.toContain("Skrive tirsdagens kode");
	});
});
```

### Oppgave 4 — en ny komponent med default-slot

På torsdag lærte du slots gjennom `AppModal`. Du trenger ikke ha laget `AppBox`: her bruker du slot-ideen i en enkel innpakningskomponent.

**Det som mangler:** `src/components/AppCard.vue` — en komponent som tar imot innhold og plasserer det der den vil.

**Kontrakten:**

- fila heter `src/components/AppCard.vue`
- innholdet du sender inn, skal vises
- **lag fila først, lim inn testen etterpå** — ellers klager `type-check` på en import som ikke finnes

**Hvor svaret står:** [`4_torsdag`](./4_torsdag%20-%20slots%20og%20modaler.md).

```ts
// src/__tests__/fredag-4-appcard.spec.ts
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppCard from "../components/AppCard.vue";

describe("AppCard", () => {
	it("viser innholdet som sendes inn i slotten", () => {
		const wrapper = mount(AppCard, {
			slots: { default: "<p>Hei fra slotten</p>" },
		});
		expect(wrapper.text()).toContain("Hei fra slotten");
	});
});
```

Til slutt: bruk `AppCard` rundt `AppCounter` og `TodoList` i `App.vue`. To bruk i én fil viser at samme innpakningskomponent kan gjenbrukes med ulikt innhold.

### Sjekk at du er ferdig

```bash
npm run test:unit    # alle fredag-testene grønne — og de gamle fortsatt grønne
npm run lint         # 0 errors
```

**Skriv ned tre linjer** — i commit-meldingen, i et `notater.md`, eller på papir:

1. Hvilket dokument fant du svaret på oppgave 1 i?
2. Hvilket fant du svaret på oppgave 3 i?
3. Var det noe du måtte gjette deg til? _Det_ er der hullet er.

### Fasit

<details>
<summary>Klikk først når du har prøvd</summary>

**1 — `AppCounter.vue`**

```vue
const count = ref(0) const step = ref(1) function increment() { count.value +=
step.value } function decrement() { count.value -= step.value }
```

```vue
<label>Steg <input v-model.number="step" type="number" /></label>
```

**2 — `TodoStats.vue`**

```vue
<template>
	<p v-if="total === 0">Ingen oppgaver</p>
	<p v-else-if="total === 1">Én oppgave, {{ done }} ferdig</p>
	<p v-else>{{ total }} oppgaver, {{ done }} ferdig</p>
</template>
```

**3 — `TodoList.vue`**

```ts
function removeDone() {
	tasks.value = tasks.value.filter(task => !task.done);
}
```

```vue
<button @click="removeDone">Fjern ferdige</button>
```

**4 — `AppCard.vue`**

```vue
<script setup lang="ts"></script>

<template>
	<section class="card"><slot /></section>
</template>

<style scoped>
.card {
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 1rem;
	margin: 1rem 0;
}
</style>
```

</details>

---

## Spor B — under panseret

Mandag skrev du `count.value++`, og linja i nettleseren oppdaterte seg. Ingen fortalte deg hvem som oppdaget det. I dag finner du det ut — først ved å bygge det selv, så ved å lese Vues egen kode.

Dette sporet er **lesing og eksperimentering**, ikke bygging. Du skal ikke lage din egen `reactive()` i Code Collab.

### Steg 1 — bygg reaktiviteten selv

Lag fila `public/under-panseret.html` i `vue-ovelser` og lim inn:

```html
<!doctype html>
<html lang="no">
	<head>
		<meta charset="utf-8" />
		<title>Under panseret: mini-reaktivitet</title>
	</head>
	<body>
		<h1>Mini-reaktivitet — tretti linjer</h1>
		<p>
			Dette er <strong>ikke</strong> Vue. Det er idéen Vue er bygget på.
		</p>

		<button id="opp">Øk tilstand.tall med 1</button>

		<p>Reaktiv (oppdateres av effekten): <strong id="reaktiv">?</strong></p>
		<p>Manuelt (oppdateres av klikket): <strong id="manuell">?</strong></p>
		<p id="status"></p>

		<script>
			let aktivEffekt = null;
			const avhengigheter = new Map();

			function track(nokkel) {
				if (!aktivEffekt) return;
				if (!avhengigheter.has(nokkel))
					avhengigheter.set(nokkel, new Set());
				avhengigheter.get(nokkel).add(aktivEffekt);
			}

			function trigger(nokkel) {
				const effekter = avhengigheter.get(nokkel);
				if (effekter) effekter.forEach(fn => fn());
			}

			function reactive(obj) {
				return new Proxy(obj, {
					get(mal, nokkel) {
						track(nokkel);
						return mal[nokkel];
					},
					set(mal, nokkel, verdi) {
						mal[nokkel] = verdi;
						trigger(nokkel);
						return true;
					},
				});
			}

			function effect(fn) {
				aktivEffekt = fn;
				fn();
				aktivEffekt = null;
			}

			const tilstand = reactive({ tall: 0 });
			const reaktiv = document.getElementById("reaktiv");
			const manuell = document.getElementById("manuell");
			const status = document.getElementById("status");

			effect(() => {
				reaktiv.textContent = tilstand.tall;
			});
			manuell.textContent = tilstand.tall;

			document.getElementById("opp").addEventListener("click", () => {
				tilstand.tall++;
				manuell.textContent = tilstand.tall;
				status.textContent =
					avhengigheter.size +
					" nøkkel(er) sporet, " +
					(avhengigheter.get("tall")?.size ?? 0) +
					" effekt(er) på «tall»";
			});
		</script>
	</body>
</html>
```

Start dev-serveren og åpne `http://localhost:5173/under-panseret.html`.

### Steg 2 — se at det virker

To linjer, begge på `0`. Klikk på knappen:

- **Reaktiv** oppdaterer seg. Ingenting i klikk-handleren rører den linja.
- **Manuelt** oppdaterer seg fordi klikk-handleren skrev til den.

Samme DOM, to mekanismer. Demoen viser den grunnleggende forskjellen Vue tar hånd om: automatisk sporing i stedet for manuell oppdatering.

### Steg 3 — les de tretti linjene

Forklar høyt for deg selv:

- hva `aktivEffekt` er, og hvorfor den nullstilles
- hvor `track` kalles, og hvorfor det er nettopp der
- hva `avhengigheter` inneholder etter at `effect()` har kjørt én gang
- hvorfor klikk-handleren ikke trenger å nevne den reaktive linja

Klarer du de fire, har du forstått grunnmodellen i denne demoen.

### Steg 4 — ødelegg det

Kommenter ut kallet `track(nokkel)` inne i `get`, og last siden på nytt:

```js
get(mal, nokkel) {
  // track(nokkel)
  return mal[nokkel]
}
```

Klikk. Tallene øker fortsatt — men ingen lytter. `trigger` slår opp i `avhengigheter`, finner ingenting, og effekten kjøres aldri igjen. Statuslinja sier `0 nøkkel(er) sporet`.

**Dette er grunnideen i demoen:** en `Map` som husker hvem som leste hva. Vue har mer maskineri rundt modellen — det ser du i kildekoden i neste steg.

### Steg 5 — nå ekte kildekode

Åpne Vues egen `ref`:

[`packages/reactivity/src/ref.ts`, linje 114–165 (v3.5.44)](https://github.com/vuejs/core/blob/v3.5.44/packages/reactivity/src/ref.ts#L114-L165)

Det er `class RefImpl` — rundt femti linjer. Alt du har gjort i dag, står i dem.

Svar på disse:

1. **Hvor spores en avhengighet?** Hvilken linje? Sammenlikn med din egen `get`.
2. **`set value` kaller `trigger` bare inne i `if (hasChanged(...))`.** Hva betyr det for `count.value = count.value`? Gjør minisystemet ditt det samme?
3. **Hvorfor har en `ref` bare én `dep`**, mens din `reactive` trenger en `Map` over nøkler?
4. **Hva gjør `toReactive(value)` i konstruktøren?** Og hva forklarer det om `ref({ ... })`?
5. **Linje 130: `if (__DEV__)`.** Hva er det, og hvorfor ser en produksjonsbygg annerledes ut?

### Steg 6 — der artikkelen og koden skiller lag

Har du lest en bloggpost om Vue-reaktivitet, har du sannsynligvis sett dette:

```js
const effects = new Map(); // ← slik så det ut før
```

med `activeEffect` og et `Set` av effekter per nøkkel. Det er den klassiske forklaringen, og den er _riktig på modellnivå_.

Men Vue **3.5** byttet ut implementasjonen. I [`dep.ts`](https://github.com/vuejs/core/blob/v3.5.44/packages/reactivity/src/dep.ts#L67-L130) finner du i stedet:

- `class Dep` (linje 67) med `track()`-metode (linje 108)
- `Link`-objekter med `prevDep` og `nextDep` — en lenket liste, ikke et `Set`
- `activeSub` i stedet for `activeEffect`

**Modellen er den samme. Koden ser ikke lik ut.**

**Oppgave:** hvorfor tror du de byttet? Hva gir en lenket liste dem som et `Set` ikke gir? Se etter hva Vue 3.5-utgivelsen sier om minnebruk.

> ⚠️ **Ikke bli forvirret hvis du ikke kjenner igjen bloggposten din.** Du er ikke dum — den beskriver en eldre versjon. Det er nettopp det som er dagens poeng: modeller og kode lever hver for seg, og den som leser kildekode må sjekke hvilken versjon de leser.

---

## Spor C — egen app

Har du en idé du har lurt på? [`../idébank/`](../id%C3%A9bank/README.md) har åtte skisser og tre KI-maler.

Dette er frivillig lek i uke 1. Fra uke 3 kan du bruke idébanken til et eget prosjekt ved siden av Code Collab — men appen vi bygger sammen er og blir Code Collab.

**Før du skriver kode:** tegn komponenttreet på papir. Hvor bor tilstanden? Hva går ned som props, og hva går opp som emits? Det er samme øvelse som onsdag, men med din egen idé.

> **Tips:** det viktigste du kan gjøre i dag er å tegne komponenttreet ditt på papir før du skriver kode.

---

## Vis & fortell — de siste ti minuttene

Ingen oppmelding. Det mest nyttige å dele er ikke «jeg fikk det til», men **en ting som ikke virket, og hvordan du fant ut hvorfor.**

Noen spørsmål å svare på i plenum:

- Hva var vanskeligst denne uka?
- Hvilken del føltes naturlig, og hvilken føltes kunstig?
- (Spor B) Hvorfor er Vues kode vanskeligere enn den trengte å være — og hva kjøper de seg med det?

---

## Etter uka

```bash
git status -sb                       # ligger alt pushet?
git add -A && git commit -m "..." && git push
```

**Neste uke:** vi starter **Code Collab** — appen vi bygger sammen resten av modulen. Mandag: komponenttreet, scaffold, `AppHeader` og `AppFooter`, og `computed`/`watch` på samme app. Tirsdag composables, onsdag provide/inject, torsdag routing.

Ta med deg `vue-ovelser` — mønstrene fra uka er de samme, og du kommer til å kjenne dem igjen.

---

## Oppsummering

✅ **Fredag er repetisjon, ikke nytt stoff.** Du velger sporet ditt selv.
✅ **Spor A gir deg svaret selv** — en grønn test forteller at du er ferdig.
✅ **Svarene står i ukas dokumenter.** Å lete er ferdigheten, ikke å huske.
✅ **Spor B er valgfritt.** `track` og `trigger` viser grunnmodellen; kildekoden viser hvordan Vue gjør den robust og effektiv.
✅ **Push før du går.** Fredag teller like mye som de andre dagene.

---

## Ressurser

- [Vue Quick Reference](https://getacademy.github.io/QuickReferences/vue)
- [`referanse_komponenttest.md`](./referanse_komponenttest.md) — hele testoppsettet fra onsdag
- [`../idébank/`](../id%C3%A9bank/README.md) — skisser og KI-maler til spor C
- [`../Uke 2/README.md`](../Uke%202/README.md) — stoffet neste uke
- [Vue 3.5-utgivelsen](https://blog.vuejs.org/posts/vue-3-5) — der den nye reaktivitetsmotoren ble introdusert
- [Vue: Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html) — den offisielle gjennomgangen
- [How Vue Reactivity Actually Works Under the Hood](https://dev.to/devflex-pro/how-vue-reactivity-actually-works-under-the-hood-a-simple-explanation-with-internals-3ope) — god introduksjon, men beskriver formen **før** 3.5. Les den som modell, ikke som kildekode.
