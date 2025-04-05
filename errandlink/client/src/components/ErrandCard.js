import { Link } from 'react-router-dom';

export default function ErrandCard({ errand }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {errand.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(errand.status)}`}>
            {errand.status.replace('-', ' ')}
          </span>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {errand.description}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="mb-2 sm:mb-0">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Location:</span> {errand.location}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Commission:</span> MK{errand.commission}
            </p>
          </div>
          <div>
            <Link
              to={`/errands/${errand.id}`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}