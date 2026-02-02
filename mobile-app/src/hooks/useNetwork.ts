import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetwork = () => {
  const [networkState, setNetworkState] = useState<NetInfoState | null>(null);
  const [nextConnectionState, setNextConnectionState] =
    useState<NetInfoState | null>(null);

  useEffect(() => {
    // Fetch initial connection state
    const fetchInitialState = async () => {
      const initialState = await NetInfo.fetch();
      setNetworkState(initialState);
    };

    fetchInitialState();

    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (networkState) {
        setNextConnectionState(state);
      }
      setNetworkState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { networkState, nextConnectionState };
};
