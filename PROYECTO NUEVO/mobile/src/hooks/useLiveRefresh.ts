import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Llama refresh() al entrar a la pantalla y cada intervalMs mientras
// esta enfocada, para reflejar cambios del backend/admin panel sin
// que el usuario tenga que reiniciar la app. Se limpia el interval al
// salir de la pantalla. refresh puede ser una funcion nueva en cada
// render — se lee via ref, asi que no reinicia el interval de más.
export function useLiveRefresh(refresh: () => void, intervalMs = 8000) {
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  useFocusEffect(
    useCallback(() => {
      refreshRef.current();
      const id = setInterval(() => refreshRef.current(), intervalMs);
      return () => clearInterval(id);
    }, [intervalMs])
  );
}
