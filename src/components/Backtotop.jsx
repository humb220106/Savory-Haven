 import React from "react";
 import {ChevronUp} from "lucide-react";
 import { useEffect, useState } from "react";
 import "../components/Backtotop.css"

 const BackToTop = () => {
     const [isVisible, setIsVisible] = useState(false);

     useEffect(() => {
         const handleScroll = () => {
             if (window.scrollY > 300) {
                 setIsVisible(true);
             } else {
                 setIsVisible(false);
             }  
         }
         window.addEventListener("scroll", handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
     }, []);
    

     return (
         <div className={`back-to-top ${isVisible ? "visible" : ""}`} onClick={()=> window.scrollTo(0, 0)}>
             <ChevronUp />
         </div>
     );
 }
 export default BackToTop;