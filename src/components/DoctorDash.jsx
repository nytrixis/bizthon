import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles


const PrescriptionModal = ({ consultation, onClose, onSubmit }) => {
  

  const [prescriptionData, setPrescriptionData] = useState({
    patientId: consultation.patientId,
    medications: [],
    diagnosis: '',
    notes: ''
  });

  const [currentMed, setCurrentMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  const addMedication = () => {
    setPrescriptionData({
      ...prescriptionData,
      medications: [...prescriptionData.medications, currentMed]
    });
    setCurrentMed({ name: '', dosage: '', frequency: '', duration: '' });
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-gray-800 p-6 rounded-lg w-[600px]">
        <h2 className="text-2xl font-bold mb-4 text-white">Write Prescription</h2>
        
        {/* Diagnosis */}
        <div className="mb-4">
          <label className="block text-white mb-2">Diagnosis</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={prescriptionData.diagnosis}
            onChange={(e) => setPrescriptionData({
              ...prescriptionData,
              diagnosis: e.target.value
            })}
          />
        </div>

        {/* Medications */}
        <div className="mb-4">
          <label className="block text-white mb-2">Add Medication</label>
          <div className="grid grid-cols-4 gap-2">
            <input
              placeholder="Medicine Name"
              className="p-2 rounded bg-gray-700 text-white"
              value={currentMed.name}
              onChange={(e) => setCurrentMed({...currentMed, name: e.target.value})}
            />
            <input
              placeholder="Dosage"
              className="p-2 rounded bg-gray-700 text-white"
              value={currentMed.dosage}
              onChange={(e) => setCurrentMed({...currentMed, dosage: e.target.value})}
            />
            <input
              placeholder="Frequency"
              className="p-2 rounded bg-gray-700 text-white"
              value={currentMed.frequency}
              onChange={(e) => setCurrentMed({...currentMed, frequency: e.target.value})}
            />
            <input
              placeholder="Duration"
              className="p-2 rounded bg-gray-700 text-white"
              value={currentMed.duration}
              onChange={(e) => setCurrentMed({...currentMed, duration: e.target.value})}
            />
          </div>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addMedication}
          >
            Add Medicine
          </button>
        </div>

        {/* Medications List */}
        <div className="mb-4">
          {prescriptionData.medications.map((med, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded mb-2 text-white">
              {med.name} - {med.dosage} - {med.frequency} - {med.duration}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-white mb-2">Additional Notes</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={prescriptionData.notes}
            onChange={(e) => setPrescriptionData({
              ...prescriptionData,
              notes: e.target.value
            })}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => onSubmit(prescriptionData)}
          >
            Generate Prescription
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const DoctorDash = () => {
  const [currentDoctorId] = useState('DOC-' + Math.random().toString(36).substr(2, 9));
  const [consultations, setConsultations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [prescription, setPrescription] = useState({ medicines: '', dosage: '', course: '', notes: '' });
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState('');
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', consultationId: '' });

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const handlePrescribe = (consultation) => {
    setSelectedConsultation(consultation);
    setShowPrescriptionModal(true);
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/virtual-consultations');
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchConsultations();
    fetchAppointments();
  }, []);

  const handlePrescriptionSubmit = async (prescriptionData) => {
    try {
        // Create prescription NFT on Alephium blockchain
        const nftResult = await window.alephium.createPrescription(
          'U-CLU2DL7KO',
          JSON.stringify({
              diagnosis: prescriptionData.diagnosis,
              medications: prescriptionData.medications
          })
      );

        // Prepare prescription data with NFT information
        const prescription = {
            doctorName: "Dr. Smith",
            prescriptionData: prescriptionData,
            timestamp: new Date().toISOString(),
            status: 'active',
            nftId: nftResult.tokenId,
            nftMetadata: {
                name: `Medical Prescription ${Date.now()}`,
                description: prescriptionData.diagnosis,
                medications: prescriptionData.medications,
                tokenId: nftResult.tokenId,
                contractAddress: nftResult.contractAddress
            }
        };

        // Save prescription data to backend
        const response = await axios.post('http://localhost:3002/api/prescriptions', prescription);
        
        // Close modal and show success message
        setShowPrescriptionModal(false);
        alert(`Prescription NFT created successfully. Token ID: ${nftResult.tokenId}`);
    } catch (error) {
        console.error('Error generating prescription:', error);
        alert('Failed to create prescription NFT. Please try again.');
    }
};




  const handlePrescriptionChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleJoinNow = (link) => {
    window.open(link, '_blank');
  };

  const handleSavePrescription = () => {
    console.log('Prescription saved:', prescription);
  };

  const handleSchedule = (consultation) => {
    setNewAppointment({ ...newAppointment, consultationId: consultation.id });
  };

  const handleAppointmentChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSaveAppointment = async () => {
    try {
      await axios.post('http://localhost:3000/api/appointments', newAppointment);
      setAppointments([...appointments, newAppointment]);
      setNewAppointment({ date: '', time: '', consultationId: '' });
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  // Prepare dates for marking on the calendar
  const scheduledDates = appointments.map(a => new Date(`${a.date}T${a.time}`));

  return (
    <motion.div 
      className="container mx-auto p-8 mt-[93px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-300">Consultation Requests Dashboard</h1>
      
      {/* Consultations Table */}
      <table className="w-full bg-black text-white rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Problem</th>
            <th className="py-3 px-4 text-left">Duration</th>
            <th className="py-3 px-4 text-left">Medications</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <motion.tr 
              key={index}
              className="border-b border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className="py-4 px-4">{consultation.name}</td>
              <td className="py-4 px-4">{consultation.age}</td>
              <td className="py-4 px-4">{consultation.gender}</td>
              <td className="py-4 px-4">{consultation.problem}</td>
              <td className="py-4 px-4">{consultation.duration}</td>
              <td className="py-4 px-4">{consultation.medications}</td>
              <td className="py-4 px-4">
                <motion.button
                  className="mr-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePrescribe(consultation)}
                >
                  Prescribe
                </motion.button>
                <motion.button
                  className="px-3 py-1 rounded bg-green-500 hover:bg-green-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleJoinNow(consultation.meetingLink)}
                >
                  Join Now
                </motion.button>
                <motion.button
                  className="ml-2 px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSchedule(consultation)}
                >
                  Schedule
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Appointments Table */}
      <table className="w-full bg-black text-white rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-left">Sl. No</th>
            <th className="py-3 px-4 text-left">Consultation ID</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <motion.tr 
              key={index}
              className="border-b border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className="py-4 px-4">{index + 1}</td>
              <td className="py-4 px-4">{appointment.consultationId}</td>
              <td className="py-4 px-4">{appointment.date}</td>
              <td className="py-4 px-4">{appointment.time}</td>
              <td className="py-4 px-4">
                {/* Optionally add more actions here */}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Schedule Appointment Form */}
      {newAppointment.consultationId && (
        <motion.div
          className="mt-6 p-4 bg-gray-800 text-white rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h3 className="text-xl font-bold mb-4">Schedule Appointment</h3>
          <form className="space-y-4">
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleAppointmentChange}
              className="w-full p-2 rounded bg-gray-700"
              required
            />
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleAppointmentChange}
              className="w-full p-2 rounded bg-gray-700"
              required
            />
            <motion.button
              type="button"
              className="bg-blue-500 text-white px-6 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveAppointment}
            >
              Schedule
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Calendar */}
      <div className="mt-8">
        <Calendar
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = date.toISOString().split('T')[0];
              const hasMeeting = scheduledDates.some(scheduledDate => scheduledDate.toISOString().split('T')[0] === formattedDate);
              return hasMeeting ? 'bg-red-500' : null;
            }
          }}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = date.toISOString().split('T')[0];
              const meetingTimes = scheduledDates.filter(scheduledDate => scheduledDate.toISOString().split('T')[0] === formattedDate);
              return meetingTimes.length > 0 ? <p className="text-white text-xs">{meetingTimes.map(t => t.toLocaleTimeString()).join(', ')}</p> : null;
            }
          }}
        />
      </div>
      {showPrescriptionModal && (
        <PrescriptionModal
          consultation={selectedConsultation}
          onClose={() => setShowPrescriptionModal(false)}
          onSubmit={handlePrescriptionSubmit}
        />
      )}
    </motion.div>
  );
};

export default DoctorDash;
