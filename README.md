# HackUDC-2025 landing page

## Getting Started

This guide will help you set up the project environment using Node.js version 18.20.2 with NVM, install dependencies, and explain the available NPM scripts.

### Prerequisites

- **NVM (Node Version Manager)**: Make sure you have NVM installed on your machine. If not, you can install it by following the instructions here: [NVM Installation](https://github.com/nvm-sh/nvm#installing-and-updating).

### Installation

1. **Set up Node.js 18.20.2**  
   Use NVM to install and use Node.js version 18.20.2:

   ```bash
   nvm install 18.20.2
   nvm use 18.20.2
   ```

2. **Install Project Dependencies**
   Once Node.js is set up, install the project dependencies using npm:

   ```bash
   npm install
   ```

### NPM Scripts

The project has the following NPM scripts defined in package.json:

- `npm run dev`: Starts the project in development mode. Use this during development to view live updates.
- `npm run start`: An alias for npm run dev.
- `npm run build`: Runs a syntax check with astro check and then builds the project for production.
- `npm run preview`: Serves the built project, allowing you to preview the production build locally.
- `npm run astro`: Direct access to the Astro CLI, useful for running specific Astro commands manually.

> Happy coding!
