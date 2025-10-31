<script setup>
import { ref, watch } from 'vue'

  const logo = "https://raw.githubusercontent.com/MapmyIndia/mapmyindia-interactive-map-js-api/refs/heads/master/09-mapmyindia-maps-api-animated-markers-polyline-example/images/car.png"
  const count = ref(7.5)  // watch(count)
  const { $mapplsLoader } = useNuxtApp()

  var map, polyLine;

  onMounted(async () => {
    await $mapplsLoader()   
    // waits for the SDK callback (initMap1) -> 17.42101603388271,78.36170884138535;17.42051797709545,78.36174534839664
    // main - 78.36160348694341, 17.4200953047214
    
    map = new mappls.Map('map', {
      center: [28.61, 77.23],
      zoomControl: true,
      location: true,
    });

    map.addListener('load', (e) => {
      const pts = [
        { lat: 28.55108, lng: 77.26913 }, 
        { lat: 28.55106, lng: 77.26906 }, 
        { lat: 28.55105, lng: 77.26897 }, 
        { lat: 28.55101, lng: 77.26872 }, 
        { lat: 28.55099, lng: 77.26849 }, 
        { lat: 28.55097, lng: 77.26831 }, 
        { lat: 28.55093, lng: 77.26794 }, 
        { lat: 28.55089, lng: 77.2676  },
        { lat: 28.55123, lng: 77.26756 }, 
        { lat: 28.55145, lng: 77.26758 }, 
        { lat: 28.55168, lng: 77.26758 }, 
        { lat: 28.55175, lng: 77.26759 }, 
        { lat: 28.55177, lng: 77.26755 }, 
        { lat: 28.55179, lng: 77.26753 },
      ];

      polyLine = new mappls.Polyline({
        map: map,
        paths: pts,
        strokeColor: '#333',
        strokeOpacity: 1.0,
        strokeWeight: 10,
        fitbounds: true,
        gradient: [0, 'black', 0.15, 'grey', 0.3, 'cyan', 0.5, 'lime', 0.7, 'yellow', 1, 'red'],
        animate: {
          speed: count.value,
          icon_width: 25,
          icon_height: 55,
          icon_url: logo,
          // path: true,
          repeat: true,
        },
      });
    });
  });
</script>

<template>
  <!-- <div class="flex flex-row justify-evenly -mt-5 p-2">
    <Button @click="count++">Speed ++</Button>

    <Button @click="count--">Speed --</Button>
  </div> -->

  <div id="map" style="height:80vh;width:100%"></div>
</template>