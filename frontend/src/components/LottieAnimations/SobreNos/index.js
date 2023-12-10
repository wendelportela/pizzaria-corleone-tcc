import Lottie from 'react-lottie'

import NosJSON from '../../../assets/lottieJSON/sobrenos.json'

export const SobreNos = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: NosJSON 
    }

    const zoomFactor = 3; 

    return (
        <Lottie
            options={defaultOptions}
            width={50 * zoomFactor} 
            height={50 * zoomFactor} 
            style={{ transform: `scale(${zoomFactor})` }}
        />
    )
}