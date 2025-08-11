# Cube.js Drill Down Functionality Test

This is a Proof of Concept (PoC) project designed to test and demonstrate drill down functionality for **Views** using the Cube.js client SDK. The main purpose is to verify that drill members work correctly in Cube.js Views, not just in regular Cubes.

## What This PoC Proves

This application demonstrates that **drill down functionality works in Cube.js Views**, which is a critical feature for data analysis workflows. The PoC specifically tests:

1. **Cube Drill Down** - Testing drill members (`ship_mode`, `line_status`) on the `lineitem` cube
2. **View Drill Down** - Testing drill members (`ship_mode`, `line_status`) on the `item_information` view

### Key Proof Point

The **important validation** happens when you click "Test Drill in View (item_information)" - this proves that:
- Views can have drill members configured just like cubes
- The Cube.js client can successfully execute drill down queries on views
- The `item_information` view properly exposes drill members for interactive analysis

## Environment Setup

Create a `.env.local` file in the root directory with your Cube.js credentials:

```env
NEXT_PUBLIC_CUBE_API_URL=https://your-cube-instance.cubecloudapp.dev/cubejs-api/v1
NEXT_PUBLIC_CUBE_API_TOKEN=your_jwt_token_here
```

**To get these values:**
1. **API URL**: From your Cube Cloud dashboard or your self-hosted Cube.js instance
2. **API Token**: Generate a JWT token from your Cube.js security context or use a development token

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables in `.env.local` (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## How to Test

The application provides two test buttons:

1. **"Test Drill in Cube (lineitem)"** - Validates drill functionality on traditional cubes
2. **"Test Drill in View (item_information)"** - **This is the key test** that proves views support drill down

Each test performs:
- An initial query with just the count measure
- A drill down query adding the configured drill members (`ship_mode`, `line_status`)
- Real-time display of query results and API responses

## Technical Implementation

- **Framework**: Next.js 15 with App Router
- **Cube.js Client**: Official `@cubejs-client/core` package
- **Styling**: Tailwind CSS v4
- **Data Source**: Tests against `lineitem` cube and `item_information` view with drill members
