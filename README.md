# Cube.js Drill Down Functionality Test

This is a Proof of Concept (PoC) project designed to test and demonstrate the **resultSet.drillDown()** functionality for **Views** using the Cube.js client SDK. The main purpose is to verify that the `resultSet.drillDown()` method works correctly with Cube.js Views, not just in regular Cubes.

## What This PoC Proves

This application demonstrates that **the `resultSet.drillDown()` method works with Cube.js Views**, which is a critical feature for interactive data analysis workflows. The PoC specifically tests:

1. **Cube DrillDown** - Testing `resultSet.drillDown()` on the `lineitem` cube
2. **View DrillDown** - Testing `resultSet.drillDown()` on the `item_information` view

### Key Proof Point

The **important validation** happens when you click "Test Drill in View (item_information)" - this proves that:
- Views support the `resultSet.drillDown()` method just like cubes
- The method correctly generates drill-down queries for view-based result sets
- Interactive drill-down functionality works seamlessly with views

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

<img width="1174" height="1018" alt="Screenshot 2025-08-11 at 3 26 28 PM" src="https://github.com/user-attachments/assets/61f3c75d-a4cc-4512-81bc-4194fb8dad56" />

<img width="1146" height="1075" alt="Screenshot 2025-08-11 at 3 26 45 PM" src="https://github.com/user-attachments/assets/80d123a8-3649-49a7-953a-64bda89cecf4" />


Each test performs:
- An initial query with count measure and ship_mode dimension
- Selects the first data point from the results
- Uses `resultSet.drillDown()` to drill into that specific data point
- Real-time display of the drill-down process and API responses

## Technical Implementation

- **Framework**: Next.js 15 with App Router
- **Cube.js Client**: Official `@cubejs-client/core` package
- **Styling**: Tailwind CSS v4
- **Data Source**: Tests against `lineitem` cube and `item_information` view with drill members
