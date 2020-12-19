import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from '../services/api';

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
  syncLocations(): Promise<void>;
}

const LocationsContext = createContext<ILocationsContextData>(
  {} as ILocationsContextData,
);

const LocationsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ILocation[]>([]);

  useEffect(() => {
    async function loadStoragedData() {
      const locations = await AsyncStorage.getItem('@CHECKPLANT:locations');

      if (locations) {
        setData(JSON.parse(locations));
      }
    }

    loadStoragedData();
  }, []);

  const registerLocation = useCallback(
    async (newLocation: ILocation) => {
      await AsyncStorage.setItem(
        '@CHECKPLANT:locations',
        JSON.stringify([...data, newLocation]),
      );

      setData((prevState) => [...prevState, newLocation]);
    },
    [data],
  );

  const syncLocations = useCallback(async () => {
    const unsyncedLocations = data.filter((location) => !location.synced);

    setLoading(true);
    await Promise.all([
      unsyncedLocations.forEach((location) =>
        api
          .post('', {
            latitude: location.latitude,
            longitude: location.longitude,
            annotation: location.description,
            datetime: location.date,
          })
          .catch(() =>
            Alert.alert(
              'Ooops...',
              'Ocorreu algum erro ao sincronizar os locais',
            ),
          ),
      ),
    ]);

    const syncedLocations = data.map((location) => ({
      ...location,
      synced: true,
    }));

    await AsyncStorage.setItem(
      '@CHECKPLANT:locations',
      JSON.stringify(syncedLocations),
    );

    setData(syncedLocations);
    setLoading(false);
  }, [data]);

  return (
    <LocationsContext.Provider
      value={{
        locations: data,
        loading,
        registerLocation,
        syncLocations,
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
