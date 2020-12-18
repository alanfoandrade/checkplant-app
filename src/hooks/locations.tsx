import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILocation {
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  parsedDates: string[];
  synced: boolean;
}

interface ILocationsContextData {
  locations: ILocation[];
  loading: boolean;
  registerLocation(newLocation: ILocation): Promise<void>;
}

const LocationsContext = createContext<ILocationsContextData>(
  {} as ILocationsContextData,
);

const LocationsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ILocation[]>([]);

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true);

      const locations = await AsyncStorage.getItem('@CHECKPLANT:locations');

      if (locations) {
        setData(JSON.parse(locations));
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const registerLocation = useCallback(
    async (newLocation: ILocation) => {
      try {
        setLoading(true);

        await AsyncStorage.setItem(
          '@CHECKPLANT:locations',
          JSON.stringify([...data, newLocation]),
        );

        setData((prevState) => [...prevState, newLocation]);
      } catch (err) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    },
    [data],
  );

  return (
    <LocationsContext.Provider
      value={{
        locations: data,
        loading,
        registerLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

function useLocations(): ILocationsContextData {
  const context = useContext(LocationsContext);

  return context;
}

export { LocationsProvider, useLocations };
