import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const allSymptoms = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_ofurine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
    "prognosis"
  ];
  

function PredictionComponent() {
    const [selectedSymptoms, setSelectedSymptoms] = useState(['', '', '', '', '']);
    const [prediction, setPrediction] = useState(null);

    const handleSymptomChange = (index, value) => {
        const newSelectedSymptoms = [...selectedSymptoms];
        newSelectedSymptoms[index] = value;
        setSelectedSymptoms(newSelectedSymptoms);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                symptoms: selectedSymptoms.filter(symptom => symptom !== '')
            });
            setPrediction(response.data.result);
        } catch (error) {
            console.error("Error fetching prediction", error);
        }
    };

    const getAvailableSymptoms = (index) => {
        const selectedBefore = selectedSymptoms.slice(0, index);
        return allSymptoms.filter(symptom => !selectedBefore.includes(symptom));
    };

    return (
        <motion.div
            className="w-[800px] mx-auto mt-[150px] mb-20 p-6 rounded-lg shadow-xl"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-accent">Disease Prediction</h2>
            {selectedSymptoms.map((symptom, index) => (
                <select
                    key={index}
                    value={symptom}
                    onChange={(e) => handleSymptomChange(index, e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Symptom {index + 1}</option>
                    {getAvailableSymptoms(index).map((availableSymptom) => (
                        <option key={availableSymptom} value={availableSymptom}>
                            {availableSymptom.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            ))}
            <motion.button
                onClick={handleSubmit}
                className="w-full bg-accent text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Predict
            </motion.button>
            {prediction && (
                <motion.div
                    className="mt-6 p-4 bg-green-100 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-lg font-semibold text-green-800">Prediction Results:</h3>
                    <p className="text-green-700">Disease: {prediction.disease}</p>
                    <p className="text-green-700">Description: {prediction.description}</p>
                    <p className="text-green-700">Precautions: {prediction.precautions.join(', ')}</p>
                    <p className="text-green-700">Medications: {prediction.medications.join(', ')}</p>
                    <p className="text-green-700">Diet: {prediction.diet.join(', ')}</p>
                    <p className="text-green-700">Workout: {prediction.workout.join(', ')}</p>
                </motion.div>
            )}
        </motion.div>
    );

}

export default PredictionComponent;
