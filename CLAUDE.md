# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Proof of Concept (PoC) project to test drill down functionality for Views using the Cube.js client SDK. The main application has been fully converted from the HTML prototype into a React/Next.js application that demonstrates drill down capabilities in both Cube.js cubes and views.

## Common Development Commands

- **Development**: `npm run dev` - Starts the development server with Turbopack
- **Build**: `npm run build` - Creates production build
- **Start**: `npm start` - Starts production server
- **Lint**: `npm run lint` - Runs Next.js ESLint

## Architecture

### Framework Stack
- **Next.js 15.4.6** with App Router (src/app directory structure)
- **React 19.1.0** with client-side components
- **@cubejs-client/core ^1.3.48** - Official Cube.js client SDK
- **Tailwind CSS v4** for styling (PostCSS configuration)
- **Geist fonts** (Sans and Mono) from Google Fonts

### Environment Configuration
The application uses environment variables for Cube.js API configuration:
- `NEXT_PUBLIC_CUBE_API_URL` - Cube.js API endpoint
- `NEXT_PUBLIC_CUBE_API_TOKEN` - JWT authentication token

Create a `.env.local` file with these variables before running the application.

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/layout.js` - Root layout with font configuration and metadata
- `src/app/page.js` - **Main drill down testing interface** (converted from poc.html)
- `poc.html` - Original HTML prototype (kept for reference)
- `.env.local` - Environment variables (not committed to git)

### Import Paths
- Use `@/*` for imports from the `src/` directory (configured in jsconfig.json)

### Main Application Features
The main page (`src/app/page.js`) is a fully functional React application that:

#### Testing Interface
- Two test buttons: "Test Drill in Cube (lineitem)" and "Test Drill in View (item_information)"
- Real-time results display with timestamped entries
- Clear results functionality
- Loading states and error handling

#### Cube.js Integration
- Uses official `@cubejs-client/core` package
- Tests drill members (`ship_mode`, `line_status`) on both cubes and views
- Displays raw API responses using `result.rawData()`
- Demonstrates that Views support drill down functionality (key proof point)

#### UI/UX
- Tailwind CSS styling with high contrast (black text on white/gray backgrounds)
- Responsive design
- Color-coded results (success: green, error: red, info: blue)
- Pre-formatted JSON display of queries and results

### Key Features Being Tested
- **Primary Goal**: Proving that drill down functionality works in Cube.js Views
- Drill members configuration: `ship_mode` and `line_status` dimensions
- Count measure with drill capabilities
- Comparison between cube and view drill down behavior
- Official Cube.js client SDK integration

### Development Notes
- The application requires valid Cube.js credentials in `.env.local`
- Restart dev server after environment variable changes
- Main validation occurs when testing drill down on the `item_information` view
- Results show both the query structure and API response data