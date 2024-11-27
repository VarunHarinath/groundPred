



import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GroundPred = () => {
  const [formData, setFormData] = useState({
    Temperature_C: '',
    Rainfall_mm: '',
    Dissolved_Oxygen_mg_L: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || '', // Convert input to float
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:8000/make_prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'AJUOBVYUI9U1JD8', // Replace with your actual API key
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Ground Water Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Temperature_C" className="block text-sm font-medium text-gray-700">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="Temperature_C"
              name="Temperature_C"
              value={formData.Temperature_C}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="Rainfall_mm" className="block text-sm font-medium text-gray-700">
              Rainfall (mm)
            </label>
            <input
              type="number"
              id="Rainfall_mm"
              name="Rainfall_mm"
              value={formData.Rainfall_mm}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="Dissolved_Oxygen_mg_L" className="block text-sm font-medium text-gray-700">
              Dissolved Oxygen (mg/L)
            </label>
            <input
              type="number"
              id="Dissolved_Oxygen_mg_L"
              name="Dissolved_Oxygen_mg_L"
              value={formData.Dissolved_Oxygen_mg_L}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="pH" className="block text-sm font-medium text-gray-700">
              pH level
            </label>
            <input
              type="number"
              id="pH"
              name="pH"
            //   value={formData.Dissolved_Oxygen_mg_L}
            //   onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>


          <div>
            <label htmlFor="pH" className="block text-sm font-medium text-gray-700">
              Soil Moisture Content (m3/m3)
            </label>
            <input
              type="number"
              id="pH"
              name="pH"
            //   value={formData.Dissolved_Oxygen_mg_L}
            //   onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="pH" className="block text-sm font-medium text-gray-700">
              Nitrate Levels (mg/L)
            </label>
            <input
              type="number"
              id="pH"
              name="pH"
            //   value={formData.Dissolved_Oxygen_mg_L}
            //   onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Make Prediction'}
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {error}
          </motion.div>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-green-100 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">Prediction Results</h2>
            <p className="text-green-700">
              <strong>Ground Water Prediction:</strong> {prediction.rain_fall_predtiction.toFixed(2)} m
            </p>
            <p className="text-green-700">
              <strong>Predicted Date:</strong> {prediction.predicted_date}
            </p>
            <p className="text-green-700">
              <strong>Prediction Status:</strong> {prediction.prdiction ? 'Positive' : 'Negative'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GroundPred;
