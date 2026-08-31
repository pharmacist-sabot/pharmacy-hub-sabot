# Rx Room

```
██████╗ ██╗  ██╗██████╗  ██████╗  ██████╗ ███╗   ███╗
██╔══██╗╚██╗██╔╝██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║
██████╔╝ ╚███╔╝ ██████╔╝██║   ██║██║   ██║██╔████╔██║
██╔══██╗ ███╔╝  ██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║
██║  ██║██╔██╗  ██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝ ╚═╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═╝     ╚═╝
```

---

## ◆ PULSE

A pharmacy department's daily work lives in a dozen tools and two dozen
bookmarks. Rx Room is the one door into all of it - operational tools
like MedSafety Net, the Warfarin calculator, and the hospital drug
list; reporting dashboards for medication errors and support values;
and the external registries the department answers to. One room, one
entry, every tool in reach - built type-safe for the people who carry
the department on their screens.

| 9 tools ▣ | 5 reports ▣ | 1 registry ▣ | Type-safe ▣ |
|---|---|---|---|

*The room - tools, reports, registries - is sealed.*

> Built with Vue 3 + TypeScript 5.9, styled by Tailwind 4, hosted on
> Firebase - strict from type-check to commit message.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One runtime, three commands.

```
⟫ git clone https://github.com/suradet-ps/rx-room.git
⟫ cd rx-room
⟫ bun install
⟫ bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

```
⟫ bun run build       # type-check, then production build
⟫ bun run lint
⟫ bun run test:unit
```

<details>
<summary>Prerequisites</summary>

- Node.js >= 18 or [Bun](https://bun.sh/) (recommended)

Deployment: `⟫ firebase deploy` - the SPA ships to Firebase Hosting;
CI runs lint, type-check, tests, and the build on every push.

</details>

---

## ◆ ANATOMY

One hub, three shelves, a strict corridor of quality.

- **Opens** - operational tools at the front of the room: medication
  error tracking, support medication records, the Warfarin and
  pediatric dose calculators, document downloads, the live hospital
  drug list, the high-alert drug reference, DrugTracker, and the
  e-Lactancia gateway.
- **Reports** - the analytics shelf: MedSafety Net and Med Support
  dashboards, the monthly summary, stock value, and OPD drug usage -
  each marked honestly as Active or Maintenance, never overstated.
- **Connects** - the external shelf holds the Warfarin Registry
  Network - the national record the department answers to, one click
  away.
- **Guards** - the corridor is strict: ESLint, Commitlint, and Husky
  pre-commit hooks, type-checked builds, and Vitest - a change that
  does not clear the corridor does not enter the room.
- **Serves** - Pinia holds the shared state across tabs and menus;
  Tailwind v4 ships zero runtime CSS overhead; every view is a typed
  route, not a gamble.

---

## ◆ RITUALS

**The core ceremony** - the daily circuit:

1. Open Rx Room. The room is already arranged: tools, reports,
   registries.
2. Run the morning's work - a calculator, a lookup, a record - each
   tool behind its own door, no bookmark hunt.
3. Pull the report when the meeting asks; the dashboards answer from
   the same data the tools record.
4. Close the room. The corridor guarded the whole way: every commit
   was conventional, every change was tested.

**The ceremony of the honest status** - a tool in maintenance is
labeled maintenance. The room does not pretend a report is alive when
it is not.

**The ceremony of the corridor** - lint and tests run before the code
runs. The room trusts its own door because the door never opens
without checking.

---

## ◆ ECHOES

**Where this artifact is heading**

```
tools    ▸ MedSafety Net, calculators, drug lists, tracker ─────────── ▸ sealed
reports  ▸ error + support dashboards, monthly and usage reports ────── ▸ sealed
externals ▸ Warfarin Registry Network gateway ───────────────────────── ▸ sealed
guards   ▸ ESLint, Commitlint, Husky, Vitest, CI ────────────────────── ▸ sealed
```

**Raising the artifact** - the tool and report catalog lives in
`src/data/`; routes and guards in `src/router/`. Every PR follows
conventional commits and clears the CI quality workflow. Open an issue
first to discuss a change.

**Status** - CI runs lint, type-check, tests, and build verification
on every push and PR. [Watch the gates](.github/workflows).

> Rx Room is proprietary software, licensed for internal use by
> authorized employees of Sabot Hospital only.

---

```
  ─────────────────────────────────────────
   A pharmacy with one door
   is a pharmacy that loses no time.
  ─────────────────────────────────────────
```

See the [LICENSE](LICENSE) for the full terms.