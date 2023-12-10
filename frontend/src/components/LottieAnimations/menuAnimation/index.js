import Lottie from 'react-lottie'
import InicialPageJSON from '../../../assets/lottieJSON/pgInicial.json'

export const InicialPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: InicialPageJSON,
    }

    const zoomFactor = 6; 

    return (
        <Lottie
            options={defaultOptions}
            width={50 * zoomFactor} 
            height={50 * zoomFactor} 
            style={{ transform: `scale(${zoomFactor})` }}
        />
    )
}
