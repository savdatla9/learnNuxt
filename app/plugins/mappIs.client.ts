export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    let loaded: Promise<void> | null = null

    function loadSDK() {
        if (loaded) return loaded

        loaded = new Promise<void>((resolve, reject) => {
            (window as any).initMap1 = () => resolve();
            const s = document.createElement('script');
            s.src = `https://sdk.mappls.com/map/sdk/web?v=3.0&access_token=${config.public.mapplsToken}&callback=initMap1`;
            s.async = true;
            s.defer = true;
            s.onerror = () => reject(new Error('Failed to load Mappls SDK'));
            document.head.appendChild(s);
        });

        return loaded;
    };

    return { provide: { mapplsLoader: loadSDK } };
});