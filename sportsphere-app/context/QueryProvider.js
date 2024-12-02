import React, { createContext, useState, useContext } from 'react';

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortPreference, setSortPreference] = useState('date');
  const [imagePermission, setImagePermission] = useState(false);

  return (
    <QueryContext.Provider value={{searchQuery, setSearchQuery, sortPreference, setSortPreference, imagePermission, setImagePermission }}>
      {children}
    </QueryContext.Provider>
  );
}