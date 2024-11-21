"use client";

import { Provider } from 'react-redux';
import { store } from '../store/index'; // Import the persistor from your store

import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      
        <html lang="en">
          <body>
           <Header/>
            <main>{children}</main>
          </body>
        </html>
      
    </Provider>
  );
}
