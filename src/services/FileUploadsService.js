import { HTTP } from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    console.log(file);

    // return HTTP.post("/index.php", formData, {
    return HTTP.post("/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return HTTP.get("/photos");
    // return HTTP.get("/images");
  }
}

export default new UploadFilesService();
