<div align="center">

# Pharmacy Hub Sabot

> A centralized, high-performance web platform engineered for the Pharmacy Department at Sabot Hospital.

[![CI Quality](https://github.com/pharmacist-sabot/pharmacy-hub-sabot/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/pharmacist-sabot/pharmacy-hub-sabot/actions/workflows/ci.yml)
![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwindcss&logoColor=white)
![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)

</div>

## Overview

**Pharmacy Hub Sabot** is a modern Single Page Application (SPA) designed to unify access to clinical tools, calculators, and reporting dashboards. Built with a focus on type safety and developer experience, it leverages the latest web technologies to streamline daily pharmacy operations and improve workflow efficiency.

### Key Architecture Highlights

- **Type-Safe Core:** Built entirely in **TypeScript** with strict null checks and no implicit any.
- **Composition API:** Utilizes Vue 3's Composition API with `<script setup>` for highly reusable and organized logic.
- **Modular State Management:** Implemented via **Pinia** for reactive state across tabs, mobile menus, and search queries.
- **Performance-First Styling:** Uses **Tailwind CSS v4** for utility-first styling with zero runtime overhead in production.
- **Strict Quality Gates:** Enforced via **ESLint**, **Commitlint**, and **Husky** pre-commit hooks to maintain code quality and consistency.

## Features

The application provides categorized access to internal tools, reporting dashboards, and external registries.

### 🛠️ Operational Tools
| Tool | Description | Status |
| :--- | :--- | :--- |
| **MedSafety Net** | Medication error recording and tracking system. | ✅ Active |
| **Med Support Record** | Registry for support medication values (e.g., TB drugs, vaccines). | ✅ Active |
| **Warfarin Calculator** | Clinical decision support tool for Warfarin dosage calculation. | ✅ Active |
| **Pediatric Dose Calculator** | Liquid medication dosing calculator for pediatric patients. | ✅ Active |
| **Document Download** | Centralized repository for departmental documents and forms. | ✅ Active |
| **Hospital Drug List** | Real-time formulary lookup for Sabot Hospital. | ✅ Active |
| **High-Alert Drugs List** | Reference database for High-Alert Medications (HAD). | ✅ Active |
| **DrugTracker** | Inventory system for ordering and tracking drug procurement. | ✅ Active |
| **e-Lactancia** | External integration for breastfeeding drug safety data. | ✅ Active |

### 📊 Reporting & Analytics
| Report | Description | Status |
| :--- | :--- | :--- |
| **MedSafety Net Dashboard** | Analytics and management interface for medication errors. | ✅ Active |
| **Med Support Dashboard** | Visualization of support medication value metrics. | ✅ Active |
| **Monthly Summary Report** | Operational overview and key performance indicators. | 🚧 Maintenance |
| **Stock Value Report** | Drug inventory valuation tracking. | 🚧 Maintenance |
| **OPD Drug Usage Report** | Outpatient department utilization statistics. | 🚧 Maintenance |

### 🔗 External Systems
| System | Description | Status |
| :--- | :--- | :--- |
| **Warfarin Registry Network** | National registry for Warfarin and NOACs patients. | ✅ Active |

## Tech Stack

This project adheres to modern frontend best practices and a robust toolchain.

### Core Framework
- **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)

### UI & Styling
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Vite Plugin)
- **Icons:** [Lucide Vue Next](https://lucide.dev/)
- **Fonts:** [Prompt](https://fonts.google.com/specimen/Prompt) (Google Fonts)

### Development & Quality
- **Linter:** [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- **Formatting:** Prettier (integrated via ESLint config)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged)
- **Commit Linting:** [Commitlint](https://commitlint.js.org/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Utilities:** [@vueuse/core](https://vueuse.org/)

### Deployment
- **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting)
- **CI/CD:** GitHub Actions

## Project Structure

The project follows a modular architecture, separating concerns into layouts, components, data stores, and views.

```
pharmacy-hub-sabot/
├── .github/workflows/     # CI/CD pipelines (Lint, Test, Release)
├── .husky/                # Git hooks
├── public/                # Static assets
├── src/
│   ├── assets/            # Global styles (Tailwind config)
│   ├── components/
│   │   ├── common/        # Shared UI components (e.g., ResourceCard)
│   │   └── layout/        # Layout structures (Header, Sidebar, Footer)
│   ├── data/              # Static data sources (tools, reports, externals)
│   ├── layouts/           # Page layout wrappers (Default, Blank)
│   ├── router/            # Route definitions and guards
│   ├── stores/            # Pinia stores (UI state)
│   ├── types/             # TypeScript type definitions
│   ├── views/             # Page-level components
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── tests/                 # Unit tests
└── firebase.json          # Hosting configuration
```

## Getting Started

### Prerequisites

- **Node.js** >= 18 or **Bun** (recommended for performance).

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/pharmacist-sabot/pharmacy-hub-sabot.git
    cd pharmacy-hub-sabot
    ```

2.  **Install dependencies**

    ```bash
    bun install
    ```

3.  **Start the development server**

    ```bash
    bun run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) to view the application.

## Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts Vite development server with HMR. |
| `bun run build` | Type-checks and builds for production. |
| `bun run preview` | Locally previews the production build. |
| `bun run type-check` | Runs TypeScript compiler to verify types. |
| `bun run lint` | Runs ESLint to check code quality. |
| `bun run lint:fix` | Automatically fixes linting issues. |
| `bun run test:unit` | Runs Vitest unit tests. |
| `bun run test:coverage` | Runs tests and generates coverage report. |

## Development Workflow

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint. Commit messages must follow one of these types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### CI/CD Pipeline

The **CI Quality Workflow** runs on every pull request and push to `main`:
1.  **Linting:** Ensures code style consistency.
2.  **Type Checking:** Validates TypeScript strict mode compliance.
3.  **Testing:** Executes the unit test suite.
4.  **Build Verification:** Ensures the production bundle builds successfully.

The **Release Workflow** automates versioning and publishing via Semantic Release.

## Deployment

The application is configured for continuous deployment to Firebase Hosting.

1.  **Build the application**
    ```bash
    bun run build
    ```

2.  **Deploy to Firebase**
    ```bash
    firebase deploy
    ```
    *Note: Ensure you are authenticated and have the Firebase CLI installed.*

## Contributing

Contributions are welcome. To contribute:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes using conventional commits.
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

Ensure all linting and tests pass before submitting a PR.

## License

This project is **proprietary software**.

Copyright (c) 2025 Sabot Hospital Pharmacy Department. All Rights Reserved.

This software is licensed for internal use by authorized employees of Sabot Hospital only. Redistribution, modification, or commercial use outside of the organization is strictly prohibited. See the [LICENSE](LICENSE) file for full details.
```
