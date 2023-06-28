import React from 'react';
import { render, screen } from '@testing-library/react';
import NeoList from './NeoList';


  
  describe('NeoList', () => { 
      test('renders NeoList component', () => {
        render(<NeoList />);
        
        // Check that the header is displayed
        const titleElement = screen.getByText('Near-Earth Objects');
        expect(titleElement).toBeInTheDocument();
    
      
        // Check that the NEO list is displayed
        const neoListElement = screen.getByRole('list');
        expect(neoListElement).toBeInTheDocument();
      });


     
  });






  