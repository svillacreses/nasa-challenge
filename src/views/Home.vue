<template>
  <div style="width: 100%; height: 100%; margin: 0px; padding-top: 0px">
    <Loader v-if="isLoading" />
    <div style="position: absolute; left: 0px; width: 100%; height: 100%">
      <div width="100%" style="height: 100%" id="map"></div>
    </div>
    <div
      v-if="showInfo"
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <v-expand-transition>
        <v-card
          @blur="showInfo = false"
          elevation="2"
          shaped
          style="min-width: 210px; margin-top: 200px; z-index: 100"
        >
          <v-card-text>
            <div>{{ selectedEv.nombre_categ }}</div>
            <p class="text-body-1 text--primary" style="margin-bottom: 5px">
              {{ selectedEv.title }}
            </p>
            <p>
              Last Record: {{ new Date(selectedEv.lastDate).toDateString() }}
            </p>
            <div v-for="(source, i) in selectedEv.sources" :key="i">
              <a target="blank" :href="source.url" style="text-decoration: none"
                ><v-icon size="15" style="margin-right: 5px"
                  >mdi-open-in-new</v-icon
                >More Resources ({{ i + 1 }})
              </a>
            </div>
            <div style="width: 100%; display: flex; justify-content: flex-end">
              <v-btn
                @click="showInfo = false"
                style="margin-top: 10px"
                small
                color="#03aa6f"
                dark
                >CERRAR</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </div>
    <div style="position: absolute; margin-left: 35%; margin-top: 5%">
      <div style="height: 100%" id="map"></div>
    </div>
    <div style="max-width: 200px; position: absolute; left: 0px; display: flex">
      <v-list dense v-model="selected1" @blur="showList = false">
        <v-subheader></v-subheader>
        <v-list-item-group color="#03aa6f" @blur="showList = false">
          <v-list-item
            @click="drawMarkers(item, true)"
            v-for="(item, i) in categorias"
            :key="i"
            style="max-height: 40px"
            @blur="showList = false"
          >
            <v-list-item-content>
              <div>
                <img
                  :src="item.icon"
                  :style="
                    'height: 40px; opacity: ' +
                      (item.eventos.length > 0 ? '1' : '0.3')
                  "
                />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-card
        v-if="showList"
        @blur="showList = false"
        tile
        style="overflow-y: scroll; min-width: 210px; max-height: 575px"
      >
        <v-list dense v-model="selected2">
          <v-subheader>{{ selectedCat.title }} </v-subheader>
          <v-list-item-group
            color="#03aa6f"
            v-if="
              selectedCat.eventos !== undefined &&
                selectedCat.eventos.length > 0
            "
          >
            <v-list-item
              @click="loadCoor(item.coor)"
              v-for="(item, i) in selectedCat.eventos"
              :key="i"
            >
              <v-list-item-content style="height: 40px">
                <v-list-item-title
                  v-text="item.title.split(',')[0]"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-subheader v-else>
            <span> No se han encontrado registros para esta categoría. </span>
          </v-subheader>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapsloader } from "../main";
import Loader from "../components/Loader";
export default {
  name: "Home",
  components: {
    Loader,
  },
  created() {
    axios.get("https://eonet.gsfc.nasa.gov/api/v2.1/events").then((res) => {
      this.eventos = [];
      res.data.events.map((ev) => {
        this.eventos.push({
          id: ev.id,
          title: ev.title,
          id_categ: ev.categories[0].id,
          nombre_categ: ev.categories[0].title,
          coor: {
            lat: ev.geometries[ev.geometries.length - 1].coordinates[1],
            lng: ev.geometries[ev.geometries.length - 1].coordinates[0],
          },
          lastDate: ev.geometries[ev.geometries.length - 1].date,
          sources: ev.sources,
        });
      });

      axios
        .get("https://eonet.gsfc.nasa.gov/api/v2.1/categories")
        .then((res) => {
          this.categorias = [];
          res.data.categories.map(async (cat) => {
            let filtered = await this.filterByCat(cat.id);
            if (filtered.length > 0 || 1 == 1) {
              this.categorias.push({
                id: cat.id,
                title: cat.title,
                descrip: cat.description,
                eventos: filtered,
                icon: require("@/assets/" + cat.id + ".svg"),
              });
            }
          });

          mapsloader.load().then(() => {
            this.map = new window.google.maps.Map(
              document.getElementById("map"),
              {
                center: { lat: 42.768858, lng: 2.165487 },
                zoom: 2,
                mapTypeControl: false,
                streetViewControl: false,
              }
            );
            this.isLoading = false;
          });
        });
    });
  },
  data() {
    return {
      categorias: [],
      selected2: false,
      selected1: false,
      selectedCat: {},
      eventos: [],
      map: undefined,
      markers: [],
      isLoading: true,
      showList: false,
      showInfo: false,
      selectedEv: {},
    };
  },
  methods: {
    async filterByCat(searchKey) {
      var list = [];
      await this.eventos.map((ele) => {
        if (ele.id_categ == searchKey) {
          list.push(ele);
        }
      });
      return list;
    },
    loadCoor(coor) {
      this.showInfo = false;
      mapsloader.load().then(() => {
        this.map.setCenter(coor);
        this.map.setZoom(8);
        this.map.setMapTypeId(
          this.selectedCat.id == 15 ||
            this.selectedCat.id == 12 ||
            this.selectedCat.id == 10
            ? "satellite"
            : "roadmap"
        );
        this.drawMarkers(this.selectedCat, false);
        this.showList = false;
      });
    },
    drawMarkers(cat, loadCor) {
      this.showInfo = false;
      this.showList = true;
      mapsloader.load().then(() => {
        if (loadCor) {
          this.map.setCenter({ lat: 42.768858, lng: 2.165487 });
          this.map.setZoom(2);
        }
        this.selectedCat = cat;
        this.eventos.map((ev) => {
          if (ev.id_categ == cat.id) {
            const mark = new window.google.maps.Marker({
              position: ev.coor,
              map: this.map,
              icon: cat.icon,
            });
            mark.addListener("click", () => {
              if (cat.id == 15 || cat.id == 12 || cat.id == 10) {
                this.map.setMapTypeId("satellite");
              }
              this.map.setZoom(10);
              this.selectedEv = ev;
              this.showInfo = true;
              this.showList = false;
              this.map.setCenter(mark.getPosition());
            });
            console.log(mark);
          }
        });
      });
    },
  },
};
</script>
