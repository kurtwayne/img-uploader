<template>
  <v-container>
    <div v-if="progressInfos">
      <v-row class="text-center" justify="center">
        <div class="mb-2"
          v-for="(progressInfo, index) in progressInfos"
          :key="index"
        >
          <!-- Upload Progress Bars -->
          <div id="progress-section">
            <div v-if="!progressInfo.success">
              <v-progress-linear
                indeterminate
                color="blue"
                height="25"
              >
                <strong>Uploading</strong>
              </v-progress-linear>
              <h4>{{ progressInfo.fileName }} Uploading</h4>
            </div>
            <div v-else>
              <v-icon x-large color="blue">mdi-file-check</v-icon>
              <h4>{{ progressInfo.fileName }} Uploaded</h4>
            </div>
          </div>
        </div>
      </v-row>

      <!-- File Upload -->
      <v-row justify="center">
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
          accept="image/*"
          multiple
          counter
          @change="selectFile"
        ></v-file-input>
      </v-row>
        
      <v-row justify="center">
        <div v-if="selectedFiles">
          <v-btn color="blue" @click="uploadFiles">Upload</v-btn>
        </div>
        <div v-else>
          <v-btn disabled color="grey">Upload</v-btn>
        </div>
      </v-row>

      <!-- Alert Messages -->
      <v-row justify="center">
        <div v-if="errorMessage" role="alert" id="alert-message">
          <v-alert
          outlined
          type="warning"
          prominent
          border="left"
          dismissible
          >
          <ul>
            <li v-for="(ms, i) in errorMessage.split('\n')" :key="i">
              {{ ms }}
              <div>{{ log(ms) }}</div>
            </li>
          </ul>
          </v-alert>
        </div>
      </v-row>

      <!-- Image Cards -->
      <span>
        <h4 class="text-center" id="fileTitle">List of Images</h4>
        <v-row>
          <v-card
            class="mx-auto my-12"
            max-width="250"
            v-for="data in resData.slice().reverse()"
            :key="data.id"
          >
            <p><a :href="data.url">{{ data.id }}</a></p>
            <img :src="data.url" :alt="data.url" height="80px">
          </v-card>
        </v-row>
      </span>

    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "image-upload",
  data() {
    return {
      selectedFiles: undefined,
      progressInfos: [],
      errorMessage: "",
      resData: [],
      id: 0,
      fileInfos: [],
    };
  },
  methods: {
    log(x) {
      console.log(x);
    },
    selectFile() {
      this.progressInfos = [];
      this.selectedFiles = event.target.files;
    },
    uploadFiles() {
      this.message = "";

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
    upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, success: false, fileName: file.name };
      let formData = new FormData();
      formData.append("file", file);
      const headers = { 
        "Content-Type": "multipart/form-data"
      };
      axios.post("https://test.rxflodev.com/uploads/", formData, {headers})
        .then(response => {
          this.resData.push({url: response.data.url, id: this.id++})
          this.progressInfos[idx].success = true;
          })
        .catch(error => {
          this.errorMessage += error.message;
          console.error("There was an error!", error);
        });
    },
    clear () {
      this.errorMessage = "";
    },
  }
};
</script>

<style scoped>
  .v-input {
    flex: .5 1 auto;
  }
  .v-btn {
    padding-bottom: 3em;
  }
  .v-alert {
    padding: 1em;
  }
  .v-card {
    padding: 1em;
  }
  #progress-section {
    padding: 1em;
  }
  #alert-message {
    padding: 1em;
  }
  #fileTitle {
    padding-top: 1em;
  }
</style>