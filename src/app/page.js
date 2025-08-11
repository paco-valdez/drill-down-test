'use client';

import { useState } from 'react';
import cube from '@cubejs-client/core';

const CUBE_API_URL = process.env.NEXT_PUBLIC_CUBE_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_CUBE_API_TOKEN;

export default function Home() {
  const [results, setResults] = useState([]);
  const [testingCube, setTestingCube] = useState(false);
  const [testingView, setTestingView] = useState(false);
  
  const cubeApi = cube(API_TOKEN, { 
    apiUrl: CUBE_API_URL 
  });

  const addResult = (title, content, type = 'info') => {
    const newResult = {
      id: Date.now(),
      title,
      content,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setResults(prev => [...prev, newResult]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const testDrillInCube = async () => {
    setTestingCube(true);
    
    try {
      addResult('🔍 Testing Drill Members in Cube: lineitem', 'Starting test...');

      const initialQuery = {
        measures: ['lineitem.count'],
        dimensions: []
      };

      addResult('📊 Initial Query (Cube)', JSON.stringify(initialQuery, null, 2));
      
      const initialResult = await cubeApi.load(initialQuery);
      addResult('📈 Initial Result (Cube)', JSON.stringify(initialResult.rawData(), null, 2), 'success');

      const drillQuery = {
        measures: ['lineitem.count'],
        dimensions: ['lineitem.ship_mode', 'lineitem.line_status']
      };

      addResult('🔧 Drill Down Query (Cube)', JSON.stringify(drillQuery, null, 2));
      
      const drillResult = await cubeApi.load(drillQuery);
      addResult('✅ Drill Down Result (Cube)', JSON.stringify(drillResult.rawData(), null, 2), 'success');

    } catch (error) {
      addResult('❌ Error in Cube Test', error.message, 'error');
    } finally {
      setTestingCube(false);
    }
  };

  const testDrillInView = async () => {
    setTestingView(true);
    
    try {
      addResult('🔍 Testing Drill Members in View: item_information', 'Starting test...');

      const initialQuery = {
        measures: ['item_information.count'],
        dimensions: []
      };

      addResult('📊 Initial Query (View)', JSON.stringify(initialQuery, null, 2));
      
      const initialResult = await cubeApi.load(initialQuery);
      addResult('📈 Initial Result (View)', JSON.stringify(initialResult.rawData(), null, 2), 'success');

      const drillQuery = {
        measures: ['item_information.count'],
        dimensions: ['item_information.ship_mode', 'item_information.line_status']
      };

      addResult('🔧 Drill Down Query (View)', JSON.stringify(drillQuery, null, 2));
      
      const drillResult = await cubeApi.load(drillQuery);
      addResult('✅ Drill Down Result (View)', JSON.stringify(drillResult.rawData(), null, 2), 'success');

    } catch (error) {
      addResult('❌ Error in View Test', error.message, 'error');
    } finally {
      setTestingView(false);
    }
  };

  const getResultTypeColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-700';
      case 'success': return 'text-green-700';
      default: return 'text-blue-700';
    }
  };

  return (
    <div className="font-sans max-w-6xl mx-auto p-5 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black text-center mb-8">
        Cube.js Drill Members Functionality Test
      </h1>
      
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-5 border">
        <h2 className="text-xl font-semibold text-black border-b-2 border-gray-300 pb-2 mb-4">
          Test Configuration
        </h2>
        <div className="bg-white p-3 rounded mb-4 border text-black">
          <div><strong>Cube:</strong> lineitem</div>
          <div><strong>View:</strong> item_information</div>
          <div><strong>Drill Members:</strong> ship_mode, line_status</div>
          <div><strong>Measure:</strong> count (with drill members configured)</div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={testDrillInCube}
            disabled={testingCube}
            className={`px-5 py-2 rounded text-white font-medium transition-colors ${
              testingCube 
                ? 'bg-yellow-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {testingCube ? 'Testing...' : 'Test Drill in Cube (lineitem)'}
          </button>
          
          <button
            onClick={testDrillInView}
            disabled={testingView}
            className={`px-5 py-2 rounded text-white font-medium transition-colors ${
              testingView 
                ? 'bg-yellow-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {testingView ? 'Testing...' : 'Test Drill in View (item_information)'}
          </button>
          
          <button
            onClick={clearResults}
            className="px-5 py-2 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-black border-b-2 border-gray-300 pb-2 mb-4">
          Results
        </h2>
        
        {results.length === 0 ? (
          <div className="bg-blue-50 p-4 rounded border">
            <h3 className="text-black font-semibold mb-2">ℹ️ Instructions</h3>
            <pre className="text-sm text-black whitespace-pre-wrap">
              {`Click the buttons above to test drill members functionality.

1. "Test Drill in Cube" - Tests drill members on the lineitem cube
2. "Test Drill in View" - Tests drill members on the item_information view

Both tests will:
- First run a basic query with just the count measure
- Then run a drill-down query including ship_mode and line_status dimensions

This will help verify that drill members work in both cubes and views.`}
            </pre>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className={`font-semibold ${getResultTypeColor(result.type)} mb-1`}>
                  {result.title}
                  <span className="text-xs text-gray-500 ml-2">({result.timestamp})</span>
                </h3>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap border text-black">
                  {result.content}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
