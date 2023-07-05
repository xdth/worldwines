// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { useAppContext } from '../../../hooks/appContext';
import { useMatch, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import Wine from '../index';

jest.mock('../../../hooks/appContext');
jest.mock('react-router-dom', () => ({
  useMatch: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../../../services/api');

interface Wine {
  id?: number;
  country?: string;
  description?: string;
  designation?: string;
  points?: number;
  price?: number;
  province?: string;
  region_1?: string;
  region_2?: string;
  taster_name?: string;
  taster_twitter_handle?: string;
  title?: string;
  variety?: string;
  winery?: string;
}

interface AppContextData {
  isSearchBoxExpanded: boolean;
  wine: Wine;
  wines: Wine[];
  countries: string[];
  varieties: string[];
  wineries: string[];
  handleIsSearchBoxExpanded(value: boolean): void;
  handleWine(wine: Wine): void;
  handleWines(wines: Wine[]): void;
  handleCountries(countries: string[]): void;
  handleVarieties(varieties: string[]): void;
  handleWineries(wineries: string[]): void;
}

describe('Wine component', () => {
  const mockUseAppContext = useAppContext as jest.MockedFunction<typeof useAppContext>;
  const mockUseMatch = useMatch as jest.MockedFunction<typeof useMatch>;
  const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
  const mockApiGet = api.get as jest.MockedFunction<typeof api.get>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display wine data', async () => {
    const mockWineData: Wine = {
      id: 1,
      title: 'Test Wine',
    };

    const mockContextData: AppContextData = {
      isSearchBoxExpanded: false,
      wine: {} as Wine,
      wines: [],
      countries: [],
      varieties: [],
      wineries: [],
      handleIsSearchBoxExpanded: jest.fn(),
      handleWine: jest.fn(),
      handleWines: jest.fn(),
      handleCountries: jest.fn(),
      handleVarieties: jest.fn(),
      handleWineries: jest.fn(),
    };

    mockUseAppContext.mockReturnValue(mockContextData);
    mockUseMatch.mockReturnValue({ params: { id: '1' } } as any);
    mockApiGet.mockResolvedValueOnce({ data: mockWineData });

    const { getByText } = render(<Wine />);

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledWith('wine/1');
      expect(getByText(mockWineData.title!)).toBeInTheDocument();
    });
  });

  it('should display an error if wine ID is not found in URL parameters', async () => {
    const mockContextData: AppContextData = {
      isSearchBoxExpanded: false,
      wine: {} as Wine,
      wines: [],
      countries: [],
      varieties: [],
      wineries: [],
      handleIsSearchBoxExpanded: jest.fn(),
      handleWine: jest.fn(),
      handleWines: jest.fn(),
      handleCountries: jest.fn(),
      handleVarieties: jest.fn(),
      handleWineries: jest.fn(),
    };
    mockUseAppContext.mockReturnValue(mockContextData);
    mockUseMatch.mockReturnValue({ params: {} } as ReturnType<typeof useMatch>);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    render(<Wine />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Wine ID not found in URL parameters.');
    });
  });

  it('should go back when the "Go back" button is clicked', () => {
    const mockContextData: AppContextData = {
      isSearchBoxExpanded: false,
      wine: { id: 1, title: 'Test Wine' },
      wines: [],
      countries: [],
      varieties: [],
      wineries: [],
      handleIsSearchBoxExpanded: jest.fn(),
      handleWine: jest.fn(),
      handleWines: jest.fn(),
      handleCountries: jest.fn(),
      handleVarieties: jest.fn(),
      handleWineries: jest.fn(),
    };
    mockUseAppContext.mockReturnValue(mockContextData);
    mockUseNavigate.mockReturnValue(jest.fn());

    const { getByText } = render(<Wine />);

    fireEvent.click(getByText('Go back'));

    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
});
