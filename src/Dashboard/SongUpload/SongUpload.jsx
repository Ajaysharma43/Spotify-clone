import React from 'react';

const SongUpload = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <form className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Song Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Artist</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Artist Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Song Image URL</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SongUpload;
