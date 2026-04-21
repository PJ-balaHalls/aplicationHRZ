import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export function useLocationEnrichment() {
  const { setValue, clearErrors } = useFormContext();
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  // 1. Coleta de Coordenadas e Timezone (Silenciosa)
  const captureSpatialData = useCallback(() => {
    // Timezone nativo do browser
    setValue('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude);
          setValue('longitude', position.coords.longitude);
        },
        (error) => console.warn('[Horazion Geo] Permissão negada ou falha:', error),
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, [setValue]);

  // 2. Integração ViaCEP com preenchimento automático
  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue('street_address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state_province', data.uf);
        clearErrors(['street_address', 'neighborhood', 'city', 'state_province']);
        
        // Dispara a coleta geoespacial assim que o CEP é confirmado
        captureSpatialData();
      }
    } catch (error) {
      console.error('[Horazion CEP] Falha na integração:', error);
    } finally {
      setIsFetchingCep(false);
    }
  };

  return { fetchAddressByCep, isFetchingCep, captureSpatialData };
}