import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface Item {
  id: string;
  name: string;
  quantity: number;
  description?: string;
  code?: string;
  dateAdded?: any;
  employeeInfo?: string;
}

interface InventoryContextProps {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
  updateItem: (id: string, data: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const newItems: Item[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Item, 'id'>)
      }));
      setItems(newItems);
    });
    return () => unsubscribe();
  }, []);

  const addItem = async (item: Omit<Item, 'id'>) => {
    await addDoc(collection(db, 'inventory'), item);
  };

  const updateItem = async (id: string, data: Partial<Item>) => {
    await updateDoc(doc(db, 'inventory', id), data);
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'inventory', id));
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};