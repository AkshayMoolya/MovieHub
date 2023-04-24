import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../config/config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../ContentModal/ContentModal.css";
import Gallery from "../Carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: grey[900],
  color: grey[50],
  border: "2px solid black",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Content, setContent] = useState();
  const [Video, setVideo] = useState();

  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
    console.log(data)
  };

  const fetchvideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchdata();
    fetchvideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media" style={{ cursor: "pointer" }}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {Content && (
              <div className="contentModel">
                <img
                  className="ContentModel_portrait"
                  src={
                    Content.poster_path
                      ? `${img_500}/${Content.poster_path}`
                      : unavailable
                  }
                  alt={Content.name || Content.title}
                />
                <img
                  className="ContentModel_landscape"
                  src={
                    Content.backdrop_path
                      ? `${img_500}/${Content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={Content.name || Content.title}
                />
                <div className="contentmodel_about">
                  <span className="contentmodel_title">
                    {Content.name || Content.title}(
                    {(
                      Content.first_air_date ||
                      Content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {Content.tagline && (
                    <i className="tagline">{Content.tagline}</i>
                  )}
                  <span className="contentmodel_description">
                    {Content.overview}
                  </span>
                  <div>
                    <Gallery media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${Video}`}
                  >
                    Watch the trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
