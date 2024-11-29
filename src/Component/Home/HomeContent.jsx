import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HomeContent = () => {
  return (
    <section className="content">
      <div className="contents">
        {/* <div className='logo'> */}
        <PlayArrowIcon className="arrow" />
        {/* </div> */}
        <div className="content__lo">
          <h3>unlock</h3>
          <h3>your project</h3>
          <h3 className="h3">performance</h3>
        </div>
        <p>you will never know everything but you will know more...</p>
      </div>
    </section>
  );
};

export default HomeContent;
