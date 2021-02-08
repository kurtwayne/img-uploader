<template>
  <v-container>
    <div v-if="progressInfos">
      <v-row class="text-center">
      <div class="mb-2"
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
      >
      
      <v-progress-linear
        v-model="progressInfo.percentage"
        color="amber"
        height="25"
      >
        <strong>{{ progressInfo.percentage }}%</strong>
      </v-progress-linear>
      <div v-if="progressInfo.percentage === !100">
        <h4>{{ progressInfo.fileName }} Uploading</h4>
      </div>
      <div v-else>
        <h4>{{ progressInfo.fileName }} Uploaded</h4>
      </div>
      </div>
      </v-row>

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

      <div v-if="message" role="alert">
        <v-alert 
        dismissible
        >
        <ul>
          <li v-for="(ms, i) in message.split('\n')" :key="i">
            {{ ms }}
            <div>{{ log(ms) }}</div>
          </li>
        </ul>
        </v-alert>
      </div>

      <!-- Add semantic card classes here -->
      <span>
        <h4 class="text-center" id="fileTitle">List of Files</h4>
        <v-row>
          <v-card
            class="mx-auto my-12"
            max-width="250"
            v-for="(file, index) in fileInfos"
            :key="index"
          >
            <p><a :href="file.url">{{ file.name }}</a></p>
            <img :src="file.url" :alt="file.name" height="80px">
          </v-card>
        </v-row>
      </span>

    </div>
  </v-container>
</template>

<script>
import FileUpload from "../services/FileUploadsService";

export default {
  name: "image-upload",
  data() {
    return {
      selectedFiles: undefined,
      progressInfos: [],
      message: "",

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
      this.progressInfos[idx] = { percentage: 0, fileName: file.name };

      FileUpload.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;
          console.log(response.data);

          return FileUpload.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos[idx].percentage = 0;
          this.message = "Could not upload the file:" + file.name;
        });
    },
    clear () {
      this.message = "";
    },
  },
  mounted() {
    FileUpload.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>

<style scoped>
  .v-input {
    flex: .5 1 auto;
  }
  .v-btn {
    padding-bottom: 3em;
  }
  #fileTitle {
    padding-top: 3em;
  }
</style>