import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { poems } from '../data/poems'; // Import poems data to map IDs to objects
import { Poem } from '../types';

interface FavoritesContextType {
  favorites: Poem[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('poem-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!user) {
      localStorage.setItem('poem-favorites', JSON.stringify(favoriteIds));
      return;
    }

    const path = `users/${user.uid}/favorites`;
    const unsub = onSnapshot(collection(db, 'users', user.uid, 'favorites'), (snapshot) => {
      const ids = snapshot.docs.map(doc => doc.id);
      setFavoriteIds(ids);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return unsub;
  }, [user]);

  const toggleFavorite = async (id: string) => {
    if (!user) {
      setFavoriteIds(prev => 
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      );
      return;
    }

    const path = `users/${user.uid}/favorites/${id}`;
    try {
      const docRef = doc(db, 'users', user.uid, 'favorites', id);
      if (favoriteIds.includes(id)) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { savedAt: new Date().toISOString() });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const favorites = favoriteIds.map(id => poems.find(p => p.id === id)).filter((p): p is Poem => !!p);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
