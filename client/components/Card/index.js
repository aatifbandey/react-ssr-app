import React from "react";
import { string, array } from "prop-types";
import { singleCard, imgHolder, content } from "./styles";

const Card = (props) => {
  const { image, obj } = props;
	
  const showContent = () => {

    return obj.map((d, index)=>{

      return(
        <div key={index}><b>{d.label}</b>:{d.val}</div>
      )
    })
		
	
		
  }
  return(
    <div className={singleCard}>
      {image ? <div className={imgHolder}> <img src={image}/> </div> : ""}
      <div className={content}>
        {showContent()}
      </div>
    </div>
  )
}

Card.propTypes = {
  image: string.isRequired,
  obj: array.isRequired
}
export default Card;