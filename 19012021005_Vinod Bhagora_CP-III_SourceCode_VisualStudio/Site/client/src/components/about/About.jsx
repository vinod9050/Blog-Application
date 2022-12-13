import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";
import "./nicepage.css";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <div class="about-section">
      <div class="inner-container">
        <h1>DOPS BLOGGING PLATFORM</h1>
        <p class="text">
          DOps communities are groups of bloggers formed around a central idea,
          commonality or interest. These communities exist to help writers
          connect around shared characteristics and blog topics, offering them a
          chance to grow together and learn from one another's experiences.These
          communities can also help you generate ideas for your blog content,
          allow for collaboration with bloggers like you and help foster
          backlinks and shared audiences.
        </p>
        <div class="skills">
          <span>Communnity</span>
          <span>Learn</span>
          <span>Groww</span>
        </div>
      </div>
    </div>
  );
};

export default About;
