import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";
import "../about/nicepage.css";

const Banner = styled(Box)`
  background-image: url(http://mrtaba.ir/image/bg2.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
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

const Contact = () => {
  return (
    <div class="about-section">
      <div class="inner-container">
        <h1>Get in touch</h1>
        <p class="text">
          Email :- iamdaksh12@gmail.com
          <br />
          Mobile no:- 9978602550
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

export default Contact;
