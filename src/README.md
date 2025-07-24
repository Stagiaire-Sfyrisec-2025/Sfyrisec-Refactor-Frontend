# CodeRefactor Frontend (Next.js)

This directory contains the Next.js frontend for the CodeRefactor application.

## Structure

-   **public/**: Static assets like favicon.
-   **src/**:
    -   **components/**: Reusable React components.
    -   **context/**: React Context API for global state management (e.g., Auth).
    -   **hooks/**: Custom React hooks.
    -   **pages/**: Next.js pages, defining the routes of the application.
    -   **styles/**: Global styles and CSS modules.
    -   **services/**: Functions for interacting with backend APIs.
    -   **utils/**: Utility functions.
    -   **types/**: TypeScript type definitions.
-   **.env.example**: Example environment variables.
-   **package.json**: Project dependencies and scripts.
-   **tsconfig.json**: TypeScript configuration.
-   **next.config.js**: Next.js configuration.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
2.  Set up environment variables by copying `.env.example` to `.env.local` and filling in the values.
3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Technologies

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   Chart.js (for dashboards)
-   Font Awesome (for icons)

## Further Development

(Details on components, pages, and logic will be expanded as the project progresses.)
