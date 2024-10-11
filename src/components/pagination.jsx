import React, { useContext } from 'react'
import AppContext from '../context/appContext'

const Pagination = () => {
  const {page, handlePageChange, totalPages} = useContext(AppContext)

  if(!totalPages) return null;
  return (
    <div>
      <div>
        {
          page > 1 && (
            <button onChange={handlePageChange(page-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md">Previous</button>
          )
        }
        {
          page < totalPages && (
            <button 
            onClick={handlePageChange(page+1)}
            className="border-2 border-gray-300 py-1 px-4 rounded-md"
            >
              Next
            </button>
          )
        }
        <p className="text-sm font-semibold ml-auto">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  )
}

export default Pagination
