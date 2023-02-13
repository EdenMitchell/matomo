<!--
  Matomo - free/libre analytics platform

  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<style scoped>
  .clockWidget {
    background-color:white;
    padding: 10px;
  }
  .timestamp {
    font-size:16px;
    font-weight:bold;
  }
  .browserTime {
    margin-bottom:10px;
  }
</style>

<template>
  <div class="clockWidget">
    <div class="browserTime">
      <div class="clockWidgetSubheading">
        <span v-if="showSiteTime">
          Browser
        </span>
        <span v-else>
          Current
        </span>
        Time ({{browserTimezone}})
      </div>
      <div class="timestamp">
        {{ browserDate }} {{ browserTime }}
      </div>
    </div>
    <div v-if="showSiteTime" class="siteTime">
      <div class="clockWidgetSubheading">
        Site Time ({{siteTimezone}})
      </div>
      <div class="timestamp">
        {{ siteDate }} {{ siteTime }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ClockState {
  timezone: string;
  siteDate: string;
  siteTime: string;
  showSiteTime: boolean;
  browserDate: string;
  browserTime: string;
  browserTimezone: string;
}

export default defineComponent({
  props: {
    siteTimezone: String,
  },
  data(): ClockState {
    return {
      timezone: this.siteTimezone ?? '',
      siteDate: '',
      siteTime: '',
      showSiteTime: false,
      browserDate: '',
      browserTime: '',
      browserTimezone: '',
    };
  },
  mounted() {
    this.setBrowserTimezone();
    this.setTime();
  },
  methods: {
    setBrowserTimezone() {
      this.browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    setTime() {
      const siteTime = new Date().toLocaleTimeString(['en-US'], { timeZone: this.siteTimezone, hour: '2-digit', minute: '2-digit' });
      const browserTime = new Date().toLocaleTimeString(['en-US'], { hour: '2-digit', minute: '2-digit' });
      if (siteTime !== browserTime) {
        this.siteDate = this.getSiteDate();
        this.siteTime = this.getSiteTime();
        this.showSiteTime = true;
      }
      this.browserDate = this.getBrowserDate();
      this.browserTime = this.getBrowserTime();

      // Set the time again after x seconds, depending on the number of seconds left in the minute.
      // This will usually be 60.
      const secondsRemaining = 60 - new Date().getSeconds();
      setTimeout(() => {
        this.setTime();
      }, secondsRemaining);
    },
    getBrowserDate() {
      const currentBrowserDate = new Date().toLocaleString('en-US');
      return this.formatDate(currentBrowserDate);
    },
    getBrowserTime() {
      return new Date().toLocaleTimeString(['en-US'], { hour: '2-digit', minute: '2-digit' });
    },
    getSiteDate() {
      const currentBrowserDate = new Date().toLocaleString('en-US', { timeZone: this.siteTimezone });
      return this.formatDate(currentBrowserDate);
    },
    getSiteTime() {
      return new Date().toLocaleTimeString(['en-US'], { timeZone: this.siteTimezone, hour: '2-digit', minute: '2-digit' });
    },
    formatDate(dateString:string) {
      const newDate = new Date(dateString);
      const year = newDate.getFullYear();
      const month = (`0${newDate.getMonth() + 1}`).slice(-2);
      const date = (`0${newDate.getDate()}`).slice(-2);
      return `${year}/${month}/${date}`;
    },
  },
});
</script>
