import {
  GET_REVIEW_SUCCESS,
  POSTREVIEW_SUCCESS,
} from "./types";
import axios from "axios";
import { ipAddress } from "../ipaddress";
import { setAlert } from "./alert";

export const getReviews = (hostId) => async (dispatch) =>{
  try {

    const res = await axios.post(
      `http://${ipAddress}/api/event/get-review/${hostId}`,
    );
    console.log(res.data)

    dispatch({
      type: GET_REVIEW_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(`error from getReview : ${err.message}`);
  }
}

export const postReview = (formData) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // console.log(formData.eventdetails._id);
    const body = JSON.stringify({
      reviewInfo: formData.values,
      hostId: formData.hostId,
    });


    const res = await axios.post(
      `http://${ipAddress}/api/event/post-review/${formData.eventId}`,
      body,
      config
    );

    const reviewMsg = res.data.success.msg;
    dispatch(setAlert(reviewMsg));
    // dispatch({
    //   type: POSTREVIEW_SUCCESS,
    //   payload: {
    //     eventDetails: formData.eventdetails,
    //     postReviewInfo: formData.reviewInfo,
    //   },
    // });
  } catch (err) {
    console.log(`error from PostReview : ${err.message}`);
  }
};