import Lottie from 'react-lottie'

import PerfilJSON from '../../../assets/lottieJSON/perfil.json'

export const PerfilAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: PerfilJSON 
    }

    return <Lottie options={defaultOptions} width={200} height={200}/>
}