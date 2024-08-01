import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const videoRouter = Router();
videoRouter.use(verifyJWT);

videoRouter
  .route("/")
  .post(
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    publishAVideo
  )
  .get(getAllVideos);
videoRouter
  .route("/:videoId")
  .get(getVideoById)
  .patch(
    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    updateVideo
  )
  .delete(deleteVideo);
videoRouter.route("/toggle/:videoId").post(togglePublishStatus);
export default videoRouter;
