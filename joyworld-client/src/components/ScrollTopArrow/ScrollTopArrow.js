import React, {useState, useEffect} from 'react';
import { StyledFaArrowCircleUp } from './ScrollTopArrow.styles';


const ScrollTopArrow = () =>{

  const [showScroll, setShowScroll] = useState(false)

  useEffect(()=>{
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 250){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 250){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
        <StyledFaArrowCircleUp onClick={scrollTop} showScroll={showScroll}/>
    );
}

export default ScrollTopArrow;