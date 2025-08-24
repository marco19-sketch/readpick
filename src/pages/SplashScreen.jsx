import "./Splash.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import splash from '../assets/images/laurentiu-1920-rot.jpg';

export default function SplashScreen() {
 const navigate = useNavigate();

    useEffect(() => {
       const timer = setTimeout(() => {
            navigate('/home');
        }, 4000);

        return () => clearTimeout(timer)
    }, [navigate])

  return (
    <div className="layout-container">
      <img
        src={splash}
        // src="/src/assets/images/laurentiu-1920-rot.jpg"
        sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1600px) 1600px,
         1920px"
        height="2560"
        width="1920"
        alt=""
        aria-label="splash-page"
        className="splash-img"
        decoding="async"
        fetchPriority="high"
      />
      <h1 className="splash-title">WELCOME</h1>
      <h2 className="splash-subtitle">
        to Read Pick<span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </h2>
    </div>
  );
}
