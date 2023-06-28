import React from 'react';
import { render } from '@testing-library/react';
import NeoListItem from './NeoListItem ';

describe('NeoListItem component', () => {
  it('renders NeoListItem component correctly', () => {
    const neo = {
      maxDiameter: { kilometers: 10 },
      hazardousCount: 5,
      closest: { kilometers: 100 },
      fastest: { kilometers_per_hour: 500 },
    };
  
    const { getByRole } = render(<NeoListItem neo={neo} index={0} />);
  
    const receivedText = getByRole('listitem').textContent.trim();
    expect(receivedText).toContain('10 km');
  
    expect(getByRole('listitem')).toHaveTextContent('Hazardous Count: 5');
    expect(getByRole('listitem')).toHaveTextContent('Closest: 100 km');
    expect(getByRole('listitem')).toHaveTextContent('Fastest: 500 km/h');
  });
  
  it('sets background color to red for index < 2', () => {
    const neo = {
      maxDiameter: { kilometers: 10 },
      hazardousCount: 5,
      closest: { kilometers: 100 },
      fastest: { kilometers_per_hour: 500 },
    };

    const { container } = render(<NeoListItem neo={neo} index={1} />);

    // Check that the background color is set to 'red' for index < 2
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('sets background color to white for index >= 2', () => {
    const neo = {
      maxDiameter: { kilometers: 10 },
      hazardousCount: 5,
      closest: { kilometers: 100 },
      fastest: { kilometers_per_hour: 500 },
    };

    const { container } = render(<NeoListItem neo={neo} index={2} />);

    // Check that the background color is set to 'white' for index >= 2
    expect(container.firstChild).toHaveStyle('background-color: white');
  });
});
