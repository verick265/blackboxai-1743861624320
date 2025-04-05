import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ErrandCard from '../components/ErrandCard';

export default function Errands() {
  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchErrands = async () => {
      try {
        setLoading(true);
        let q;
        
        if (filter === 'open') {
          q = query(collection(db, 'errands'), where('status', '==', 'open'));
        } else if (filter === 'in-progress') {
          q = query(collection(db, 'errands'), where('status', '==', 'in-progress'));
        } else if (filter === 'completed') {
          q = query(collection(db, 'errands'), where('status', '==', 'completed'));
        } else {
          q = query(collection(db, 'errands'));
        }

        const querySnapshot = await getDocs(q);
        const errandsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setErrands(errandsData);
      } catch (error) {
        console.error('Error fetching errands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchErrands();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Errands</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'open' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Open
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'in-progress' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'completed' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Completed
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : errands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No errands found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {errands.map(errand => (
              <ErrandCard key={errand.id} errand={errand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}