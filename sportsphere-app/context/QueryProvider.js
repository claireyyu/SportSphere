import React, { createContext, useState, useContext } from 'react';

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <QueryContext.Provider value={{searchQuery, setSearchQuery }}>
      {children}
    </QueryContext.Provider>
  );
}