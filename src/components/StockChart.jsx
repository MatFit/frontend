import React, { useRef, useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles/StockChart.css";

const stockListRandom = [
  { name: "AAPL", color: "#4ade80" },
  { name: "TSLA", color: "#f87171" },
  { name: "AMZN", color: "#60a5fa" },
  { name: "NVDA", color: "#facc15" },
  { name: "GOOG", color: "#c084fc" },
  { name: "MSFT", color: "#38bdf8" },
  { name: "META", color: "#f472b6" },
  { name: "NFLX", color: "#ef4444" },
  { name: "AMD", color: "#fb923c" },
  { name: "INTC", color: "#22d3ee" },
];
const breathingRoomMargin = 8; // in px
const scrollUnpauseDuration = 500; // in ms


function generateStockData() {
  let data = [];
  let price = 100 + Math.random() * 50;
  for (let i = 0; i < 10; i++) {
    price += (Math.random() - 0.5) * 5;
    data.push({ date: `Day ${i + 1}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
}

function generateStockData2() {
  let data = [];
  let price = 10 + Math.random() * 50;
  for (let i = 0; i < 10; i++) {
    price += (Math.random() - 0.5) * 5;
    data.push({ date: `Day ${i + 1}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
}

function MiniStockChart({ data, color }) {
  return (
    <div className="mini-stock-chart">
      <ResponsiveContainer width="100%" height="100%" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
        <LineChart data={data} margin={{ top: breathingRoomMargin, right: breathingRoomMargin, left: breathingRoomMargin, bottom: breathingRoomMargin}}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            activeDot={false}
            isAnimationActive={false}
          />
          <YAxis domain={["auto", "auto"]} hide/>
          <XAxis dataKey="date" hide/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


// Eventually we should be able to pass in actual stock data instead of random data
export function StockCarousel({stockList = stockListRandom, loop_speed = 20}) {


  const carouselRef = useRef(null); // Reference to the scrollable carousel container
  const autoScrollIntervalRef = useRef(null); // Reference to the auto-scroll interval
  const resumeAutoScrollTimeoutRef = useRef(null); // Reference to the timeout for resuming auto-scroll
  const isScrollingRef = useRef(false); // Flag to prevent re-entrant scroll handling
  const [isAutoScrolling, setIsAutoScrolling] = useState(true); // State to track if auto-scrolling is active
  

  
  // Generate random stock data for each stock
  const [stockDataList] = useState(
    stockListRandom.map((s, i) => ({
      ...s,
      data: i % 2 === 0 ? generateStockData() : generateStockData2(),
    }))
  );
  
  // Triple the stock list for infinite scrolling idk how this works but it does
  const duplicatedStockList = [...stockDataList, ...stockDataList, ...stockDataList];
  
  // Setup infinite scroll loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Get the width of one complete set of cards
    const getSetWidth = () => {
      const firstCard = carousel.querySelector('.stock-card');
      if (!firstCard) return 0;
      const cardStyle = window.getComputedStyle(firstCard);
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(cardStyle.marginRight) || 0;
      return stockDataList.length * (cardWidth + gap);
    };

    // Initialize scroll position to middle set
    const initPosition = () => {
      const setWidth = getSetWidth();
      if (setWidth > 0) {
        carousel.scrollLeft = setWidth;
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(initPosition, 100);


    // Func to handle scroll events for infinite looping
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const setWidth = getSetWidth();
      if (setWidth === 0) return;

      const scrollLeft = carousel.scrollLeft;

      // Scrolled past second set - jump back to first set
      if (scrollLeft >= setWidth * 2 - 50) {
        isScrollingRef.current = true;
        carousel.style.scrollBehavior = 'auto';
        carousel.scrollLeft = scrollLeft - setWidth;
        setTimeout(() => {
          carousel.style.scrollBehavior = 'smooth';
          isScrollingRef.current = false;
        }, 50);
      }
      // Scrolled before first set - jump to second set
      else if (scrollLeft <= 50) {
        isScrollingRef.current = true;
        carousel.style.scrollBehavior = 'auto';
        carousel.scrollLeft = scrollLeft + setWidth;
        setTimeout(() => {
          carousel.style.scrollBehavior = 'smooth';
          isScrollingRef.current = false;
        }, 50);
      }
    };
    carousel.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', initPosition);
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initPosition);
    };
  }, [stockDataList.length]);
  


  // Auto-scroll functionality
  useEffect(() => {
    if (!carouselRef.current) return; // Safety check when ref is not set to a DOM element or null
    const carousel = carouselRef.current;
    

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) return; // If already scrolling, do nothing

      // Scroll by 1px every 20ms
      autoScrollIntervalRef.current = setInterval(() => {
        if (carousel && isAutoScrolling) {
          carousel.scrollBy({
            left: 1,
            behavior: 'auto'
          });
        }
      }, 20); // Scroll 1px every 20ms for smooth animation
    };

    const stopAutoScroll = () => {
      // If already scrolling clear interval and stop by setting ref to null
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    // Finally use flag to alter auto-scroll state
    if (isAutoScrolling) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [isAutoScrolling]);

  // Handle user interaction, pause auto-scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleUserInteraction = () => {
      setIsAutoScrolling(false);
      
      // Clear existing resume timer
      if (resumeAutoScrollTimeoutRef.current) {
        clearTimeout(resumeAutoScrollTimeoutRef.current);
      }
      
      // Resume auto-scroll after 2 seconds of no interaction
      resumeAutoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, scrollUnpauseDuration);
    };

    // Listen for various user interaction events
    carousel.addEventListener('wheel', handleUserInteraction);
    carousel.addEventListener('touchstart', handleUserInteraction);
    carousel.addEventListener('mousedown', handleUserInteraction);

    return () => {
      carousel.removeEventListener('wheel', handleUserInteraction);
      carousel.removeEventListener('touchstart', handleUserInteraction);
      carousel.removeEventListener('mousedown', handleUserInteraction);
      if (resumeAutoScrollTimeoutRef.current) {
        clearTimeout(resumeAutoScrollTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle scrolling with arrow buttons
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    
    // Pause auto-scroll when user clicks buttons
    setIsAutoScrolling(false);
    
    // Clear existing resume timer
    if (resumeAutoScrollTimeoutRef.current) {
      clearTimeout(resumeAutoScrollTimeoutRef.current);
    }
    
    const scrollAmount = 180;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    
    // Resume auto-scroll after 2 seconds
    resumeAutoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  };



  return (
    <div className="stock-carousel-container">
      <div className="stock-carousel-header">
        <h2 className="stock-carousel-title">Stock Trends</h2>
        <div className="stock-carousel-buttons">
          <button className="stock-carousel-button" onClick={() => scroll("left")}>
            <ChevronLeft size={16} />
          </button>
          <button className="stock-carousel-button" onClick={() => scroll("right")}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="stock-carousel-list">
        {duplicatedStockList.map((stock, i) => {
          const up = stock.data.at(-1).price > stock.data[0].price; // If it's starting price is less than ending price
          return (
            <div key={i} className="stock-card">
              <div className="stock-card-title">{stock.name}</div>
              <MiniStockChart data={stock.data} color={stock.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Optional type definitions params for StockCarousel
StockCarousel.propTypes = {
  stockList: PropTypes.array, // array of stock data objects
  loop_speed: PropTypes.number,
};

export default StockCarousel;

