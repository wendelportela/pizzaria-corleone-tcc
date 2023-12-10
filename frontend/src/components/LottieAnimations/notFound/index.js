import Lottie from 'react-lottie'

import NotFound from '../../../assets/lottieJSON/notfound.json'

export const PedidoAtv = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: NotFound 
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