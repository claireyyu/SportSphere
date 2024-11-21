import React, { createContext, useState, useContext } from 'react';

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortPreference, setSortPreference] = useState('date');

  return (
    <QueryContext.Provider value={{searchQuery, setSearchQuery, sortPreference, setSortPreference }}>
      {children}
    </QueryContext.Provider>
  );
}