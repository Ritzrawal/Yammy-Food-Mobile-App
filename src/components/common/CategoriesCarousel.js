import React,{useEffect,useState} from 'react';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from '../home/ProductBox';

import { getCaterogies } from '../../helpers/api.request';


const  CategoriesCarousel= ()=> {

	const [category,setCategory]= useState('')

	
	useEffect(() => {
		getCateroriesData()
	
	}, [])


	const getCateroriesData=async()=>{
		const {data,error}=await getCaterogies()
		if(error){
			return console.log(error)
		}
		 setCategory(data.categories)
	}

	const options={
	responsive: {
        0:{
            items:3,
        },
        600:{
            items:4,
        },
        1000: {
          items: 6,
        },
        1200: {
          items: 8,
        },
      },
      loop: true,
      lazyLoad: true,
      autoplay: true,
      dots: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
}

console.log("hello data",category)

    	return (
	      <OwlCarousel nav loop {...options} className="owl-carousel-category owl-theme">
			  {category && category.map((items,index)=>{
				  return(
                  <div className="item" key={index}>
	         	  <ProductBox 
	         		boxClass='osahan-category-item'
	         		title={items.title}
	         		counting={items.order}
			   		image={items.photo}
			   		imageClass='img-fluid'
			   		imageAlt='carousel'
			   		linkUrl='#'
			   	/>
	         </div>
				  )
			  })}
                
			
		
	        
	      </OwlCarousel>
	    );
}



export default CategoriesCarousel;