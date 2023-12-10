import Lottie from 'react-lottie'

import PizzaAnimationJSON from '../../../assets/lottieJSON/cardapio.json'

export const PizzaAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: PizzaAnimationJSON
    }

    let zoomFactor = 6

    return (
        <Lottie
            options={defaultOptions}
            width={200}
            height={200}
        />
    )
}