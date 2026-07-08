import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { subscribeWS } from '@/data/ws';

// Llama refresh() al entrar a la pantalla (para ponerse al dia con lo
// que haya cambiado mientras no se miraba) y se suscribe por WebSocket
// a uno o mas canales — el backend empuja cuando alguien escribe algo,
// nada de preguntar cada rato. Se desuscribe al salir de la pantalla.
// refresh puede ser una funcion nueva en cada render, se lee via ref.
export function useLiveRefresh(refresh: () => void, ws: { url: string; channels: string | string[] }) {
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;
  const channels = Array.isArray(ws.channels) ? ws.channels : [ws.channels];
  const channelsKey = channels.join(',');

  useFocusEffect(
    useCallback(() => {
      refreshRef.current();
      const unsubs = channels.map(ch => subscribeWS(ws.url, ch, () => refreshRef.current()));
      return () => unsubs.forEach(u => u());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ws.url, channelsKey])
  );
}
