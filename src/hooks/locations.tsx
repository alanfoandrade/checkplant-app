import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../services/api';

interface IRegisterLocation {
  annotation: string;
  latitude: number;
  longitude: number;
}

interface ILocation {
  annotation: string;
  latitude: number;
  longitude: number;
  synced: boolean;
  datetime: string;
  parsedDate: string;
}

interface ILocationsContextData {
  locations: ILocation[];
  synced: boolean;
  loading: boolean;
  registerLocation(newLocation: IRegisterLocation): Promise<void>;
  syncLocations(): Promise<void>;
}

const LocationsContext = createContext<ILocationsContextData>(
  {} as ILocationsContextData,
);

const LocationsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ILocation[]>([]);
  const [synced, setSynced] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const locations = await AsyncStorage.getItem('@CHECKPLANT:locations');

      if (locations) {
        const parsedLocations: ILocation[] = JSON.parse(locations);

        setData(parsedLocations);

        setSynced(!parsedLocations.find((location) => !location.synced));
      }
    }

    loadStoragedData();
  }, []);

  const registerLocation = useCallback(
    async (newLocation: IRegisterLocation) => {
      const now = new Date();

      const updatedLocations = [
        ...data,
        {
          ...newLocation,
          datetime: format(now, "yyyy'-'MM'-'dd' 'hh:mm:ss"),
          parsedDate: format(now, 'PPPppp', {
            locale: ptBR,
          }).replace(/ GMT-./, 'hrs'),
          synced: false,
        },
      ];

      await AsyncStorage.setItem(
        '@CHECKPLANT:locations',
        JSON.stringify(updatedLocations),
      );

      setData(updatedLocations);

      setSynced(false);
    },
    [data],
  );

  const syncLocations = useCallback(async () => {
    const { isConnected } = await NetInfo.fetch();

    if (!isConnected) {
      Alert.alert(
        'Ooops...',
        'Você não tem uma conexão ativa com a internet para realizar a sincronização',
      );

      return;
    }

    const unsyncedLocations = data.filter((location) => !location.synced);

    setLoading(true);
    try {
      await Promise.all([
        unsyncedLocations.forEach((location) =>
          api.post('', location).catch(() => {
            throw new Error();
          }),
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
      setSynced(true);
    } catch {
      Alert.alert('Ooops...', 'Ocorreu algum erro ao sincronizar os locais');
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <LocationsContext.Provider
      value={{
        locations: data,
        synced,
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
